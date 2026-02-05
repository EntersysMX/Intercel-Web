/**
 * Config Routes
 * Site configuration management (admin only)
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

// All routes require auth
router.use(authMiddleware);
router.use(adminOnly);

/**
 * GET /api/config
 * Get all config values
 */
router.get('/', async (req, res) => {
  try {
    const configs = await req.prisma.config.findMany();
    res.json(configs);
  } catch (error) {
    console.error('Get config error:', error);
    res.status(500).json({ error: 'Failed to get config' });
  }
});

/**
 * PUT /api/config/:key
 * Update or create config value
 */
router.put('/:key', [
  body('value').exists(),
  body('type').optional().isIn(['string', 'number', 'boolean', 'json']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { key } = req.params;
    const { value, type } = req.body;

    const config = await req.prisma.config.upsert({
      where: { key },
      update: {
        value: String(value),
        ...(type && { type }),
      },
      create: {
        key,
        value: String(value),
        type: type || 'string',
      },
    });

    res.json(config);
  } catch (error) {
    console.error('Update config error:', error);
    res.status(500).json({ error: 'Failed to update config' });
  }
});

/**
 * DELETE /api/config/:key
 * Delete config value
 */
router.delete('/:key', async (req, res) => {
  try {
    await req.prisma.config.delete({
      where: { key: req.params.key },
    });

    res.json({ message: 'Config deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Config not found' });
    }
    console.error('Delete config error:', error);
    res.status(500).json({ error: 'Failed to delete config' });
  }
});

module.exports = router;
