/**
 * Plans Routes
 * CRUD operations for plans (admin only)
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

// All routes require auth
router.use(authMiddleware);
router.use(adminOnly);

/**
 * GET /api/plans
 * Get all plans with optional filtering
 */
router.get('/', async (req, res) => {
  try {
    const { categoryId, isActive } = req.query;

    const where = {};
    if (categoryId) where.categoryId = categoryId;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const plans = await req.prisma.plan.findMany({
      where,
      orderBy: [
        { category: { order: 'asc' } },
        { order: 'asc' },
      ],
      include: {
        category: {
          select: {
            id: true,
            name: true,
            label: true,
          },
        },
      },
    });

    res.json(plans);
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ error: 'Failed to get plans' });
  }
});

/**
 * GET /api/plans/:id
 * Get single plan
 */
router.get('/:id', async (req, res) => {
  try {
    const plan = await req.prisma.plan.findUnique({
      where: { id: req.params.id },
      include: {
        category: true,
      },
    });

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    res.json(plan);
  } catch (error) {
    console.error('Get plan error:', error);
    res.status(500).json({ error: 'Failed to get plan' });
  }
});

/**
 * POST /api/plans
 * Create new plan
 */
router.post('/', [
  body('categoryId').isString(),
  body('price').isInt({ min: 0 }),
  body('data').trim().isLength({ min: 1, max: 50 }),
  body('originalData').optional({ nullable: true }).trim(),
  body('multiplier').optional({ nullable: true }).trim(),
  body('features').trim().isLength({ min: 1, max: 255 }),
  body('sms').optional({ nullable: true }).trim(),
  body('duration').trim().isLength({ min: 1, max: 50 }),
  body('hasCalls').optional().isBoolean(),
  body('unlimitedSocial').optional().isBoolean(),
  body('isFeatured').optional().isBoolean(),
  body('isMifi').optional().isBoolean(),
  body('isActive').optional().isBoolean(),
  body('tag').optional({ nullable: true }).trim(),
  body('order').optional().isInt({ min: 0 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      categoryId,
      price,
      data,
      originalData,
      multiplier,
      features,
      sms,
      duration,
      hasCalls,
      unlimitedSocial,
      isFeatured,
      isMifi,
      isActive,
      tag,
      order,
    } = req.body;

    // Verify category exists
    const category = await req.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(400).json({ error: 'Category not found' });
    }

    const plan = await req.prisma.plan.create({
      data: {
        categoryId,
        price,
        data,
        originalData: originalData || null,
        multiplier: multiplier || null,
        features,
        sms: sms || null,
        duration,
        hasCalls: hasCalls || false,
        unlimitedSocial: unlimitedSocial || false,
        isFeatured: isFeatured || false,
        isMifi: isMifi || false,
        isActive: isActive !== false,
        tag: tag || null,
        order: order || 0,
      },
      include: {
        category: true,
      },
    });

    res.status(201).json(plan);
  } catch (error) {
    console.error('Create plan error:', error);
    res.status(500).json({ error: 'Failed to create plan' });
  }
});

/**
 * PUT /api/plans/:id
 * Update plan
 */
router.put('/:id', [
  body('categoryId').optional().isString(),
  body('price').optional().isInt({ min: 0 }),
  body('data').optional().trim().isLength({ min: 1, max: 50 }),
  body('originalData').optional({ nullable: true }),
  body('multiplier').optional({ nullable: true }),
  body('features').optional().trim().isLength({ min: 1, max: 255 }),
  body('sms').optional({ nullable: true }),
  body('duration').optional().trim().isLength({ min: 1, max: 50 }),
  body('hasCalls').optional().isBoolean(),
  body('unlimitedSocial').optional().isBoolean(),
  body('isFeatured').optional().isBoolean(),
  body('isMifi').optional().isBoolean(),
  body('isActive').optional().isBoolean(),
  body('tag').optional({ nullable: true }),
  body('order').optional().isInt({ min: 0 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updateData = {};
    const fields = [
      'categoryId', 'price', 'data', 'originalData', 'multiplier',
      'features', 'sms', 'duration', 'hasCalls', 'unlimitedSocial',
      'isFeatured', 'isMifi', 'isActive', 'tag', 'order'
    ];

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const plan = await req.prisma.plan.update({
      where: { id: req.params.id },
      data: updateData,
      include: {
        category: true,
      },
    });

    res.json(plan);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Plan not found' });
    }
    console.error('Update plan error:', error);
    res.status(500).json({ error: 'Failed to update plan' });
  }
});

/**
 * DELETE /api/plans/:id
 * Delete plan
 */
router.delete('/:id', async (req, res) => {
  try {
    await req.prisma.plan.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Plan not found' });
    }
    console.error('Delete plan error:', error);
    res.status(500).json({ error: 'Failed to delete plan' });
  }
});

/**
 * POST /api/plans/duplicate/:id
 * Duplicate a plan
 */
router.post('/duplicate/:id', async (req, res) => {
  try {
    const original = await req.prisma.plan.findUnique({
      where: { id: req.params.id },
    });

    if (!original) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    const { id, createdAt, updatedAt, ...planData } = original;

    const duplicate = await req.prisma.plan.create({
      data: {
        ...planData,
        data: `${planData.data} (copia)`,
        order: planData.order + 1,
      },
      include: {
        category: true,
      },
    });

    res.status(201).json(duplicate);
  } catch (error) {
    console.error('Duplicate plan error:', error);
    res.status(500).json({ error: 'Failed to duplicate plan' });
  }
});

/**
 * PUT /api/plans/reorder
 * Reorder plans within a category
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
        req.prisma.plan.update({
          where: { id },
          data: { order },
        })
      )
    );

    res.json({ message: 'Plans reordered successfully' });
  } catch (error) {
    console.error('Reorder plans error:', error);
    res.status(500).json({ error: 'Failed to reorder plans' });
  }
});

module.exports = router;
