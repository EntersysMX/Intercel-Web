/**
 * Prisma Seed Script
 * Populates the database with initial data from original Intercel plans
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Categories Data
const categories = [
  { name: 'monthly', label: 'Mensuales', icon: 'DateRange', order: 1 },
  { name: 'quarterly', label: 'Trimestrales', icon: 'Event', order: 2 },
  { name: 'semester', label: 'Semestrales', icon: 'EventNote', order: 3 },
  { name: 'annual', label: 'Anuales', icon: 'CalendarMonth', order: 4 },
  { name: 'mifi', label: 'MIFI', icon: 'Router', order: 5 },
];

// Plans Data (from original intercel.com.mx)
const plansData = {
  monthly: [
    {
      price: 109,
      data: '1 GB',
      originalData: null,
      multiplier: null,
      features: 'Redes Sociales',
      sms: '50 SMS',
      duration: '30 días',
      hasCalls: false,
      unlimitedSocial: false,
      isFeatured: false,
      tag: null,
      order: 1,
    },
    {
      price: 154,
      data: '6GB',
      originalData: '2GB',
      multiplier: 'Triple',
      features: 'Redes Sociales Ilimitadas',
      sms: '1,750 SMS',
      duration: '30 días',
      hasCalls: false,
      unlimitedSocial: true,
      isFeatured: true,
      tag: 'Cámbiate y recibe el Triple de GB',
      order: 2,
    },
    {
      price: 204,
      data: '12GB',
      originalData: '4GB',
      multiplier: 'Triple',
      features: 'Llamadas y Redes Sociales Ilimitadas',
      sms: '1,750 SMS',
      duration: '30 días',
      hasCalls: true,
      unlimitedSocial: true,
      isFeatured: false,
      tag: 'Cámbiate y recibe el Triple de GB',
      order: 3,
    },
    {
      price: 259,
      data: '36GB',
      originalData: '12GB',
      multiplier: 'Triple',
      features: 'Llamadas y Redes Sociales Ilimitadas',
      sms: '3,500 SMS',
      duration: '30 días',
      hasCalls: true,
      unlimitedSocial: true,
      isFeatured: true,
      tag: 'Cámbiate y recibe el Triple de GB',
      order: 4,
    },
    {
      price: 334,
      data: '72GB',
      originalData: '24GB',
      multiplier: 'Triple',
      features: 'Llamadas y Redes Sociales Ilimitadas',
      sms: '3,500 SMS',
      duration: '30 días',
      hasCalls: true,
      unlimitedSocial: true,
      isFeatured: false,
      tag: 'Cámbiate y recibe el Triple de GB',
      order: 5,
    },
    {
      price: 409,
      data: '105GB',
      originalData: '35GB',
      multiplier: 'Triple',
      features: 'Llamadas y Redes Sociales Ilimitadas',
      sms: '3,500 SMS',
      duration: '30 días',
      hasCalls: true,
      unlimitedSocial: true,
      isFeatured: true,
      tag: 'Cámbiate y recibe el Triple de GB',
      order: 6,
    },
    {
      price: 644,
      data: '150GB',
      originalData: '50GB',
      multiplier: 'Triple',
      features: 'Llamadas y Redes Sociales Ilimitadas',
      sms: '6,000 SMS',
      duration: '30 días',
      hasCalls: true,
      unlimitedSocial: true,
      isFeatured: false,
      tag: 'Cámbiate y recibe el Triple de GB',
      order: 7,
    },
  ],
  quarterly: [
    {
      price: 954,
      data: '72GB',
      originalData: '24GB',
      multiplier: 'Triple',
      features: 'Redes Sociales Ilimitadas',
      sms: '3,500 SMS',
      duration: '3 meses',
      hasCalls: false,
      unlimitedSocial: true,
      isFeatured: false,
      tag: 'Cámbiate y recibe el Triple de GB',
      order: 1,
    },
  ],
  semester: [
    {
      price: 1829,
      data: '72GB',
      originalData: '24GB',
      multiplier: 'Triple',
      features: 'Llamadas y Redes Sociales Ilimitadas',
      sms: '3,500 SMS',
      duration: '6 meses',
      hasCalls: true,
      unlimitedSocial: true,
      isFeatured: true,
      tag: 'Cámbiate y recibe el Triple de GB',
      order: 1,
    },
  ],
  annual: [
    {
      price: 3419,
      data: '24 GB',
      originalData: null,
      multiplier: null,
      features: 'Llamadas y Redes Sociales Ilimitadas',
      sms: '3,500 SMS',
      duration: '12 meses',
      hasCalls: true,
      unlimitedSocial: true,
      isFeatured: false,
      tag: null,
      order: 1,
    },
  ],
  mifi: [
    {
      price: 232,
      data: 'MIFI 5',
      originalData: null,
      multiplier: null,
      features: '5 GB de datos',
      sms: null,
      duration: '30 días',
      hasCalls: false,
      unlimitedSocial: false,
      isFeatured: false,
      isMifi: true,
      tag: null,
      order: 1,
    },
    {
      price: 348,
      data: 'MIFI 10',
      originalData: null,
      multiplier: null,
      features: '10 GB de datos',
      sms: null,
      duration: '30 días',
      hasCalls: false,
      unlimitedSocial: false,
      isFeatured: false,
      isMifi: true,
      tag: null,
      order: 2,
    },
    {
      price: 464,
      data: 'MIFI 20',
      originalData: null,
      multiplier: null,
      features: '20 GB de datos',
      sms: null,
      duration: '30 días',
      hasCalls: false,
      unlimitedSocial: false,
      isFeatured: false,
      isMifi: true,
      tag: null,
      order: 3,
    },
    {
      price: 580,
      data: 'MIFI 30',
      originalData: null,
      multiplier: null,
      features: '30 GB de datos',
      sms: null,
      duration: '30 días',
      hasCalls: false,
      unlimitedSocial: false,
      isFeatured: false,
      isMifi: true,
      tag: null,
      order: 4,
    },
    {
      price: 696,
      data: 'MIFI 50',
      originalData: null,
      multiplier: null,
      features: '50 GB de datos',
      sms: null,
      duration: '30 días',
      hasCalls: false,
      unlimitedSocial: false,
      isFeatured: false,
      isMifi: true,
      tag: null,
      order: 5,
    },
  ],
};

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@intercel.com.mx';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Administrador',
      role: 'admin',
    },
  });
  console.log(`✅ Admin user created: ${adminUser.email}`);

  // Create categories
  const createdCategories = {};
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { name: cat.name },
      update: { label: cat.label, icon: cat.icon, order: cat.order },
      create: cat,
    });
    createdCategories[cat.name] = category;
    console.log(`✅ Category created: ${category.label}`);
  }

  // Delete all existing plans before re-creating
  const deletedPlans = await prisma.plan.deleteMany({});
  console.log(`🗑️  Deleted ${deletedPlans.count} existing plans`);

  // Delete obsolete categories (e.g., 'daily' removed)
  const validNames = categories.map(c => c.name);
  const deletedCats = await prisma.category.deleteMany({
    where: { name: { notIn: validNames } },
  });
  if (deletedCats.count > 0) {
    console.log(`🗑️  Deleted ${deletedCats.count} obsolete categories`);
  }

  // Create plans for each category
  for (const [categoryName, plans] of Object.entries(plansData)) {
    const category = createdCategories[categoryName];
    if (!category) continue;

    for (const planData of plans) {
      await prisma.plan.create({
        data: {
          ...planData,
          categoryId: category.id,
          isMifi: planData.isMifi || false,
        },
      });
    }
    console.log(`✅ ${plans.length} plans created for ${category.label}`);
  }

  // Create default config
  const configs = [
    { key: 'site_name', value: 'Intercel', type: 'string' },
    { key: 'contact_email', value: 'contacto@intercel.com.mx', type: 'string' },
    { key: 'contact_phone', value: '55 8993 1510', type: 'string' },
    { key: 'contact_shortcode', value: '*233', type: 'string' },
  ];

  for (const config of configs) {
    await prisma.config.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    });
  }
  console.log('✅ Site config created');

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
