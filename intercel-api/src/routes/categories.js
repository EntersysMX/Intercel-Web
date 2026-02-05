/**
 * Categories Routes
 * CRUD operations for plan categories (admin only)
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

// All routes require auth
router.use(authMiddleware);
router.use(adminOnly);

/**
 * GET /api/categories
 * Get all categories (including inactive)
 */
router.get('/', async (req, res) => {
  try {
    const categories = await req.prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { plans: true },
        },
      },
    });

    res.json(categories.map(cat => ({
      ...cat,
      planCount: cat._count.plans,
    })));
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to get categories' });
  }
});

/**
 * GET /api/categories/:id
 * Get single category with plans
 */
router.get('/:id', async (req, res) => {
  try {
    const category = await req.prisma.category.findUnique({
      where: { id: req.params.id },
      include: {
        plans: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ error: 'Failed to get category' });
  }
});

/**
 * POST /api/categories
 * Create new category
 */
router.post('/', [
  body('name').trim().isLength({ min: 2, max: 50 }),
  body('label').trim().isLength({ min: 2, max: 100 }),
  body('icon').trim().isLength({ min: 2, max: 50 }),
  body('order').optional().isInt({ min: 0 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, label, icon, order } = req.body;

    // Check if name already exists
    const existing = await req.prisma.category.findUnique({
      where: { name },
    });

    if (existing) {
      return res.status(400).json({ error: 'Category name already exists' });
    }

    const category = await req.prisma.category.create({
      data: {
        name,
        label,
        icon,
        order: order || 0,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

/**
 * PUT /api/categories/:id
 * Update category
 */
router.put('/:id', [
  body('label').optional().trim().isLength({ min: 2, max: 100 }),
  body('icon').optional().trim().isLength({ min: 2, max: 50 }),
  body('order').optional().isInt({ min: 0 }),
  body('isActive').optional().isBoolean(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { label, icon, order, isActive } = req.body;

    const category = await req.prisma.category.update({
      where: { id: req.params.id },
      data: {
        ...(label !== undefined && { label }),
        ...(icon !== undefined && { icon }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    res.json(category);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Category not found' });
    }
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

/**
 * DELETE /api/categories/:id
 * Delete category (and all its plans)
 */
router.delete('/:id', async (req, res) => {
  try {
    await req.prisma.category.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Category not found' });
    }
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

/**
 * PUT /api/categories/reorder
 * Reorder categories
 */
router.put('/reorder', [
  body('orders').isArray(),
  body('orders.*.id').isString(),
  body('orders.*.order').isInt({ min: 0 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { orders } = req.body;

    await req.prisma.$transaction(
      orders.map(({ id, order }) =>
        req.prisma.category.update({
          where: { id },
          data: { order },
        })
      )
    );

    res.json({ message: 'Categories reordered successfully' });
  } catch (error) {
    console.error('Reorder categories error:', error);
    res.status(500).json({ error: 'Failed to reorder categories' });
  }
});

module.exports = router;
