/**
 * Public API Routes
 * No authentication required - used by frontend
 */

const express = require('express');
const router = express.Router();

/**
 * GET /api/public/plans
 * Get all active plans grouped by category
 */
router.get('/plans', async (req, res) => {
  try {
    const categories = await req.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        plans: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    // Transform to frontend format
    const planCategories = categories.map(cat => ({
      id: cat.name,
      label: cat.label,
      icon: cat.icon,
      plans: cat.plans.map(plan => ({
        id: plan.id,
        price: plan.price,
        data: plan.data,
        originalData: plan.originalData,
        multiplier: plan.multiplier,
        features: plan.features,
        sms: plan.sms,
        duration: plan.duration,
        calls: plan.hasCalls,
        unlimitedSocial: plan.unlimitedSocial,
        featured: plan.isFeatured,
        tag: plan.tag,
        isMifi: plan.isMifi,
      })),
    }));

    res.json(planCategories);
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ error: 'Failed to get plans' });
  }
});

/**
 * GET /api/public/categories
 * Get all active categories
 */
router.get('/categories', async (req, res) => {
  try {
    const categories = await req.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        label: true,
        icon: true,
        _count: {
          select: { plans: { where: { isActive: true } } },
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
 * GET /api/public/config
 * Get public site configuration
 */
router.get('/config', async (req, res) => {
  try {
    const configs = await req.prisma.config.findMany();

    const configObj = {};
    configs.forEach(c => {
      configObj[c.key] = c.value;
    });

    res.json(configObj);
  } catch (error) {
    console.error('Get config error:', error);
    res.status(500).json({ error: 'Failed to get config' });
  }
});

module.exports = router;
