import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  await prisma.inventoryTransaction.deleteMany();
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.businessSettings.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  // Create default user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'admin@smartbilling.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'OWNER',
    },
  });
  console.log('✅ Created user:', user.email);

  // Create business settings
  const businessSettings = await prisma.businessSettings.create({
    data: {
      name: 'Smart Retail Store',
      address: '123 Market Street, Bangalore, Karnataka - 560001',
      phone: '+91 98765 43210',
      email: 'contact@smartretail.com',
      gstNumber: '29AAAAA0000A1Z5',
      currency: '₹',
      currencyCode: 'INR',
      invoicePrefix: 'INV-',
      defaultTaxRate: 5.0,
      enableTax: true,
      allowNegativeStock: false,
      receiptFooter: 'Thank you for your business! Please visit again.',
      printFormat: 'A4',
      defaultPaymentMethod: 'Cash',
    },
  });
  console.log('✅ Created business settings');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Electronics', description: 'Electronic devices and accessories' } }),
    prisma.category.create({ data: { name: 'Groceries', description: 'Food and grocery items' } }),
    prisma.category.create({ data: { name: 'Clothing', description: 'Apparel and fashion items' } }),
    prisma.category.create({ data: { name: 'Home & Kitchen', description: 'Home appliances and kitchenware' } }),
    prisma.category.create({ data: { name: 'Stationery', description: 'Office and school supplies' } }),
    prisma.category.create({ data: { name: 'Personal Care', description: 'Health and beauty products' } }),
    prisma.category.create({ data: { name: 'Beverages', description: 'Drinks and beverages' } }),
  ]);
  console.log(`✅ Created ${categories.length} categories`);

  // Create suppliers
  const suppliers = await Promise.all([
    prisma.supplier.create({
      data: {
        name: 'TechWorld Distributors',
        contact: 'Rajesh Kumar',
        phone: '+91 98765 11111',
        email: 'sales@techworld.com',
        address: 'Industrial Area, Delhi',
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Fresh Foods Ltd',
        contact: 'Priya Sharma',
        phone: '+91 98765 22222',
        email: 'orders@freshfoods.com',
        address: 'Agriculture Complex, Mumbai',
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Fashion Hub Suppliers',
        contact: 'Amit Patel',
        phone: '+91 98765 33333',
        email: 'wholesale@fashionhub.com',
        address: 'Textile Market, Surat',
      },
    }),
    prisma.supplier.create({
      data: {
        name: 'Office Essentials Co',
        contact: 'Sneha Reddy',
        phone: '+91 98765 44444',
        email: 'info@officeessentials.com',
        address: 'Business Park, Hyderabad',
      },
    }),
  ]);
  console.log(`✅ Created ${suppliers.length} suppliers`);

  // Create products
  const products = await Promise.all([
    // Electronics
    prisma.product.create({
      data: {
        sku: 'ELEC-001',
        name: 'Wireless Mouse',
        categoryId: categories[0].id,
        brand: 'Logitech',
        unit: 'piece',
        buyingPrice: 450,
        sellingPrice: 699,
        currentStock: 25,
        minStockLevel: 10,
        supplierId: suppliers[0].id,
        description: 'Ergonomic wireless mouse with USB receiver',
        barcode: '1234567890001',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'ELEC-002',
        name: 'USB Cable Type-C',
        categoryId: categories[0].id,
        brand: 'Belkin',
        unit: 'piece',
        buyingPrice: 180,
        sellingPrice: 299,
        currentStock: 50,
        minStockLevel: 20,
        supplierId: suppliers[0].id,
        description: '1 meter Type-C charging cable',
        barcode: '1234567890002',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'ELEC-003',
        name: 'Bluetooth Earphones',
        categoryId: categories[0].id,
        brand: 'boAt',
        unit: 'piece',
        buyingPrice: 800,
        sellingPrice: 1299,
        currentStock: 15,
        minStockLevel: 10,
        supplierId: suppliers[0].id,
        description: 'True wireless earbuds with charging case',
        barcode: '1234567890003',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'ELEC-004',
        name: 'Power Bank 10000mAh',
        categoryId: categories[0].id,
        brand: 'Mi',
        unit: 'piece',
        buyingPrice: 650,
        sellingPrice: 999,
        currentStock: 8,
        minStockLevel: 10,
        supplierId: suppliers[0].id,
        description: 'Portable charger with fast charging',
        barcode: '1234567890004',
      },
    }),
    // Groceries
    prisma.product.create({
      data: {
        sku: 'GROC-001',
        name: 'Basmati Rice',
        categoryId: categories[1].id,
        brand: 'India Gate',
        unit: 'kg',
        buyingPrice: 85,
        sellingPrice: 120,
        currentStock: 100,
        minStockLevel: 20,
        supplierId: suppliers[1].id,
        description: 'Premium quality basmati rice',
        barcode: '1234567890005',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'GROC-002',
        name: 'Cooking Oil',
        categoryId: categories[1].id,
        brand: 'Fortune',
        unit: 'litre',
        buyingPrice: 140,
        sellingPrice: 185,
        currentStock: 45,
        minStockLevel: 15,
        supplierId: suppliers[1].id,
        description: 'Sunflower cooking oil',
        barcode: '1234567890006',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'GROC-003',
        name: 'Whole Wheat Flour',
        categoryId: categories[1].id,
        brand: 'Aashirvaad',
        unit: 'kg',
        buyingPrice: 38,
        sellingPrice: 55,
        currentStock: 80,
        minStockLevel: 25,
        supplierId: suppliers[1].id,
        description: '100% whole wheat atta',
        barcode: '1234567890007',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'GROC-004',
        name: 'Sugar',
        categoryId: categories[1].id,
        brand: 'Madhur',
        unit: 'kg',
        buyingPrice: 42,
        sellingPrice: 60,
        currentStock: 60,
        minStockLevel: 20,
        supplierId: suppliers[1].id,
        description: 'White refined sugar',
        barcode: '1234567890008',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'GROC-005',
        name: 'Tea Powder',
        categoryId: categories[1].id,
        brand: 'Tata Tea',
        unit: 'g',
        buyingPrice: 120,
        sellingPrice: 165,
        currentStock: 40,
        minStockLevel: 15,
        supplierId: suppliers[1].id,
        description: '500g premium tea powder',
        barcode: '1234567890009',
      },
    }),
    // Clothing
    prisma.product.create({
      data: {
        sku: 'CLTH-001',
        name: 'Cotton T-Shirt',
        categoryId: categories[2].id,
        brand: 'Nike',
        unit: 'piece',
        buyingPrice: 350,
        sellingPrice: 599,
        currentStock: 30,
        minStockLevel: 15,
        supplierId: suppliers[2].id,
        description: 'Round neck cotton t-shirt',
        barcode: '1234567890010',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'CLTH-002',
        name: 'Denim Jeans',
        categoryId: categories[2].id,
        brand: 'Levis',
        unit: 'piece',
        buyingPrice: 1200,
        sellingPrice: 1899,
        currentStock: 20,
        minStockLevel: 10,
        supplierId: suppliers[2].id,
        description: 'Classic fit denim jeans',
        barcode: '1234567890011',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'CLTH-003',
        name: 'Sports Shoes',
        categoryId: categories[2].id,
        brand: 'Puma',
        unit: 'pair',
        buyingPrice: 1500,
        sellingPrice: 2499,
        currentStock: 12,
        minStockLevel: 8,
        supplierId: suppliers[2].id,
        description: 'Running shoes with cushioning',
        barcode: '1234567890012',
      },
    }),
    // Home & Kitchen
    prisma.product.create({
      data: {
        sku: 'HOME-001',
        name: 'Pressure Cooker 5L',
        categoryId: categories[3].id,
        brand: 'Prestige',
        unit: 'piece',
        buyingPrice: 1100,
        sellingPrice: 1699,
        currentStock: 10,
        minStockLevel: 5,
        supplierId: suppliers[0].id,
        description: 'Aluminum pressure cooker 5 litre',
        barcode: '1234567890013',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'HOME-002',
        name: 'Non-Stick Frying Pan',
        categoryId: categories[3].id,
        brand: 'Hawkins',
        unit: 'piece',
        buyingPrice: 450,
        sellingPrice: 749,
        currentStock: 18,
        minStockLevel: 10,
        supplierId: suppliers[0].id,
        description: '26cm non-stick frying pan',
        barcode: '1234567890014',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'HOME-003',
        name: 'Electric Kettle',
        categoryId: categories[3].id,
        brand: 'Philips',
        unit: 'piece',
        buyingPrice: 750,
        sellingPrice: 1199,
        currentStock: 7,
        minStockLevel: 5,
        supplierId: suppliers[0].id,
        description: '1.5L electric kettle with auto shutoff',
        barcode: '1234567890015',
      },
    }),
    // Stationery
    prisma.product.create({
      data: {
        sku: 'STAT-001',
        name: 'A4 Paper Ream',
        categoryId: categories[4].id,
        brand: 'JK Copier',
        unit: 'pack',
        buyingPrice: 220,
        sellingPrice: 299,
        currentStock: 25,
        minStockLevel: 10,
        supplierId: suppliers[3].id,
        description: '500 sheets A4 copier paper',
        barcode: '1234567890016',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'STAT-002',
        name: 'Blue Pen Box',
        categoryId: categories[4].id,
        brand: 'Reynolds',
        unit: 'box',
        buyingPrice: 80,
        sellingPrice: 120,
        currentStock: 40,
        minStockLevel: 15,
        supplierId: suppliers[3].id,
        description: 'Box of 10 blue ballpoint pens',
        barcode: '1234567890017',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'STAT-003',
        name: 'Notebook 200 Pages',
        categoryId: categories[4].id,
        brand: 'Classmate',
        unit: 'piece',
        buyingPrice: 45,
        sellingPrice: 75,
        currentStock: 60,
        minStockLevel: 20,
        supplierId: suppliers[3].id,
        description: 'Single ruled notebook 200 pages',
        barcode: '1234567890018',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'STAT-004',
        name: 'Marker Set',
        categoryId: categories[4].id,
        brand: 'Camlin',
        unit: 'set',
        buyingPrice: 120,
        sellingPrice: 189,
        currentStock: 22,
        minStockLevel: 10,
        supplierId: suppliers[3].id,
        description: 'Set of 12 colored markers',
        barcode: '1234567890019',
      },
    }),
    // Personal Care
    prisma.product.create({
      data: {
        sku: 'PERS-001',
        name: 'Shampoo 400ml',
        categoryId: categories[5].id,
        brand: 'Dove',
        unit: 'bottle',
        buyingPrice: 185,
        sellingPrice: 275,
        currentStock: 30,
        minStockLevel: 15,
        supplierId: suppliers[1].id,
        description: 'Nourishing shampoo for all hair types',
        barcode: '1234567890020',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'PERS-002',
        name: 'Toothpaste 200g',
        categoryId: categories[5].id,
        brand: 'Colgate',
        unit: 'tube',
        buyingPrice: 85,
        sellingPrice: 130,
        currentStock: 45,
        minStockLevel: 20,
        supplierId: suppliers[1].id,
        description: 'Total advanced health toothpaste',
        barcode: '1234567890021',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'PERS-003',
        name: 'Body Soap',
        categoryId: categories[5].id,
        brand: 'Lux',
        unit: 'piece',
        buyingPrice: 35,
        sellingPrice: 55,
        currentStock: 70,
        minStockLevel: 30,
        supplierId: suppliers[1].id,
        description: 'Moisturizing beauty soap bar',
        barcode: '1234567890022',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'PERS-004',
        name: 'Face Cream 50ml',
        categoryId: categories[5].id,
        brand: 'Nivea',
        unit: 'jar',
        buyingPrice: 160,
        sellingPrice: 249,
        currentStock: 20,
        minStockLevel: 10,
        supplierId: suppliers[1].id,
        description: 'Moisturizing face cream for daily use',
        barcode: '1234567890023',
      },
    }),
    // Beverages
    prisma.product.create({
      data: {
        sku: 'BEV-001',
        name: 'Soft Drink 2L',
        categoryId: categories[6].id,
        brand: 'Coca Cola',
        unit: 'bottle',
        buyingPrice: 70,
        sellingPrice: 100,
        currentStock: 35,
        minStockLevel: 20,
        supplierId: suppliers[1].id,
        description: 'Carbonated soft drink 2 litre',
        barcode: '1234567890024',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'BEV-002',
        name: 'Mineral Water 1L',
        categoryId: categories[6].id,
        brand: 'Bisleri',
        unit: 'bottle',
        buyingPrice: 15,
        sellingPrice: 20,
        currentStock: 100,
        minStockLevel: 40,
        supplierId: suppliers[1].id,
        description: 'Packaged drinking water',
        barcode: '1234567890025',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'BEV-003',
        name: 'Juice 1L',
        categoryId: categories[6].id,
        brand: 'Real',
        unit: 'pack',
        buyingPrice: 95,
        sellingPrice: 140,
        currentStock: 28,
        minStockLevel: 15,
        supplierId: suppliers[1].id,
        description: 'Mixed fruit juice 1 litre',
        barcode: '1234567890026',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'BEV-004',
        name: 'Coffee Powder 200g',
        categoryId: categories[6].id,
        brand: 'Nescafe',
        unit: 'jar',
        buyingPrice: 220,
        sellingPrice: 325,
        currentStock: 18,
        minStockLevel: 10,
        supplierId: suppliers[1].id,
        description: 'Instant coffee powder',
        barcode: '1234567890027',
      },
    }),
    // --- Additional Electronics ---
    prisma.product.create({
      data: {
        sku: 'ELEC-005',
        name: 'Laptop Stand',
        categoryId: categories[0].id,
        brand: 'Amazon Basics',
        unit: 'piece',
        buyingPrice: 850,
        sellingPrice: 1299,
        currentStock: 20,
        minStockLevel: 10,
        supplierId: suppliers[0].id,
        description: 'Adjustable aluminum laptop stand',
        barcode: '1234567890028',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'ELEC-006',
        name: 'Wireless Keyboard',
        categoryId: categories[0].id,
        brand: 'Dell',
        unit: 'piece',
        buyingPrice: 950,
        sellingPrice: 1499,
        currentStock: 15,
        minStockLevel: 8,
        supplierId: suppliers[0].id,
        description: 'Slim wireless keyboard with numeric pad',
        barcode: '1234567890029',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'ELEC-007',
        name: 'Phone Charger 33W',
        categoryId: categories[0].id,
        brand: 'Samsung',
        unit: 'piece',
        buyingPrice: 350,
        sellingPrice: 599,
        currentStock: 40,
        minStockLevel: 15,
        supplierId: suppliers[0].id,
        description: 'Fast charging adapter 33W',
        barcode: '1234567890030',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'ELEC-008',
        name: 'Webcam HD 1080p',
        categoryId: categories[0].id,
        brand: 'HP',
        unit: 'piece',
        buyingPrice: 1200,
        sellingPrice: 1899,
        currentStock: 10,
        minStockLevel: 5,
        supplierId: suppliers[0].id,
        description: 'Full HD webcam with mic',
        barcode: '1234567890031',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'ELEC-009',
        name: 'HDMI Cable 2m',
        categoryId: categories[0].id,
        brand: 'Cosmos',
        unit: 'piece',
        buyingPrice: 120,
        sellingPrice: 249,
        currentStock: 55,
        minStockLevel: 20,
        supplierId: suppliers[0].id,
        description: 'High speed HDMI cable 2 meters',
        barcode: '1234567890032',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'ELEC-010',
        name: 'Bluetooth Speaker',
        categoryId: categories[0].id,
        brand: 'JBL',
        unit: 'piece',
        buyingPrice: 1800,
        sellingPrice: 2999,
        currentStock: 12,
        minStockLevel: 6,
        supplierId: suppliers[0].id,
        description: 'Portable waterproof Bluetooth speaker',
        barcode: '1234567890033',
      },
    }),
    // --- Additional Groceries ---
    prisma.product.create({
      data: {
        sku: 'GROC-006',
        name: 'Black Tea Leaves',
        categoryId: categories[1].id,
        brand: 'Tata Tea',
        unit: 'kg',
        buyingPrice: 400,
        sellingPrice: 550,
        currentStock: 30,
        minStockLevel: 10,
        supplierId: suppliers[1].id,
        description: 'Premium Assam tea leaves 1kg',
        barcode: '1234567890034',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'GROC-007',
        name: 'Coconut Oil 1L',
        categoryId: categories[1].id,
        brand: 'Parachute',
        unit: 'litre',
        buyingPrice: 200,
        sellingPrice: 285,
        currentStock: 35,
        minStockLevel: 15,
        supplierId: suppliers[1].id,
        description: 'Pure coconut oil',
        barcode: '1234567890035',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'GROC-008',
        name: 'Masala Mix',
        categoryId: categories[1].id,
        brand: 'MDH',
        unit: 'pack',
        buyingPrice: 65,
        sellingPrice: 99,
        currentStock: 50,
        minStockLevel: 20,
        supplierId: suppliers[1].id,
        description: 'Curry masala powder 200g',
        barcode: '1234567890036',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'GROC-009',
        name: 'Biscuit Pack',
        categoryId: categories[1].id,
        brand: 'Britannia',
        unit: 'pack',
        buyingPrice: 30,
        sellingPrice: 50,
        currentStock: 100,
        minStockLevel: 30,
        supplierId: suppliers[1].id,
        description: 'Marie biscuit pack 200g',
        barcode: '1234567890037',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'GROC-010',
        name: 'Milk Packet 1L',
        categoryId: categories[1].id,
        brand: 'Amul',
        unit: 'pack',
        buyingPrice: 55,
        sellingPrice: 65,
        currentStock: 40,
        minStockLevel: 20,
        supplierId: suppliers[1].id,
        description: 'Fresh toned milk 1 litre',
        barcode: '1234567890038',
      },
    }),
    // --- Additional Clothing ---
    prisma.product.create({
      data: {
        sku: 'CLTH-004',
        name: 'Formal Shirt',
        categoryId: categories[2].id,
        brand: 'Peter England',
        unit: 'piece',
        buyingPrice: 800,
        sellingPrice: 1499,
        currentStock: 25,
        minStockLevel: 10,
        supplierId: suppliers[2].id,
        description: 'Slim fit formal shirt',
        barcode: '1234567890039',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'CLTH-005',
        name: 'Sunglasses',
        categoryId: categories[2].id,
        brand: 'Ray-Ban',
        unit: 'piece',
        buyingPrice: 600,
        sellingPrice: 1299,
        currentStock: 18,
        minStockLevel: 8,
        supplierId: suppliers[2].id,
        description: 'UV protected sunglasses',
        barcode: '1234567890040',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'CLTH-006',
        name: 'Woolen Scarf',
        categoryId: categories[2].id,
        brand: 'US Polo Assn.',
        unit: 'piece',
        buyingPrice: 200,
        sellingPrice: 499,
        currentStock: 30,
        minStockLevel: 10,
        supplierId: suppliers[2].id,
        description: 'Warm woolen scarf',
        barcode: '1234567890041',
      },
    }),
    // --- Additional Home & Kitchen ---
    prisma.product.create({
      data: {
        sku: 'HOME-004',
        name: 'Cookware Set',
        categoryId: categories[3].id,
        brand: 'Pigeon',
        unit: 'set',
        buyingPrice: 1800,
        sellingPrice: 2999,
        currentStock: 6,
        minStockLevel: 4,
        supplierId: suppliers[0].id,
        description: '5-piece non-stick cookware set',
        barcode: '1234567890042',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'HOME-005',
        name: 'Vacuum Flask 1L',
        categoryId: categories[3].id,
        brand: 'Cello',
        unit: 'piece',
        buyingPrice: 350,
        sellingPrice: 599,
        currentStock: 22,
        minStockLevel: 10,
        supplierId: suppliers[0].id,
        description: 'Stainless steel vacuum flask',
        barcode: '1234567890043',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'HOME-006',
        name: 'Storage Container Set',
        categoryId: categories[3].id,
        brand: 'Borosil',
        unit: 'set',
        buyingPrice: 400,
        sellingPrice: 699,
        currentStock: 15,
        minStockLevel: 8,
        supplierId: suppliers[0].id,
        description: 'Set of 5 airtight containers',
        barcode: '1234567890044',
      },
    }),
    // --- Additional Stationery ---
    prisma.product.create({
      data: {
        sku: 'STAT-005',
        name: 'Ballpen Refill Pack',
        categoryId: categories[4].id,
        brand: 'Parker',
        unit: 'pack',
        buyingPrice: 150,
        sellingPrice: 249,
        currentStock: 45,
        minStockLevel: 15,
        supplierId: suppliers[3].id,
        description: 'Pack of 12 ballpoint refills',
        barcode: '1234567890045',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'STAT-006',
        name: 'Stapler',
        categoryId: categories[4].id,
        brand: 'Fellowes',
        unit: 'piece',
        buyingPrice: 250,
        sellingPrice: 399,
        currentStock: 30,
        minStockLevel: 10,
        supplierId: suppliers[3].id,
        description: 'Heavy duty stapler',
        barcode: '1234567890046',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'STAT-007',
        name: 'Drawing Sketch Pen Set',
        categoryId: categories[4].id,
        brand: 'Faber-Castell',
        unit: 'set',
        buyingPrice: 350,
        sellingPrice: 549,
        currentStock: 20,
        minStockLevel: 8,
        supplierId: suppliers[3].id,
        description: 'Set of 24 sketch pens',
        barcode: '1234567890047',
      },
    }),
    // --- Additional Personal Care ---
    prisma.product.create({
      data: {
        sku: 'PERS-005',
        name: 'Deodorant 150ml',
        categoryId: categories[5].id,
        brand: 'Axe',
        unit: 'can',
        buyingPrice: 165,
        sellingPrice: 249,
        currentStock: 35,
        minStockLevel: 15,
        supplierId: suppliers[1].id,
        description: 'Body spray deodorant',
        barcode: '1234567890048',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'PERS-006',
        name: 'Face Wash 100ml',
        categoryId: categories[5].id,
        brand: 'Garnier',
        unit: 'tube',
        buyingPrice: 95,
        sellingPrice: 149,
        currentStock: 50,
        minStockLevel: 20,
        supplierId: suppliers[1].id,
        description: 'Fresh face wash',
        barcode: '1234567890049',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'PERS-007',
        name: 'Hand Sanitizer 500ml',
        categoryId: categories[5].id,
        brand: 'Lifebuoy',
        unit: 'bottle',
        buyingPrice: 75,
        sellingPrice: 125,
        currentStock: 60,
        minStockLevel: 25,
        supplierId: suppliers[1].id,
        description: 'Antibacterial hand sanitizer',
        barcode: '1234567890050',
      },
    }),
    // --- Additional Beverages ---
    prisma.product.create({
      data: {
        sku: 'BEV-005',
        name: 'Energy Drink 500ml',
        categoryId: categories[6].id,
        brand: 'Red Bull',
        unit: 'can',
        buyingPrice: 60,
        sellingPrice: 100,
        currentStock: 40,
        minStockLevel: 20,
        supplierId: suppliers[1].id,
        description: 'Energy drink can',
        barcode: '1234567890051',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'BEV-006',
        name: 'Green Tea 25 Bags',
        categoryId: categories[6].id,
        brand: 'Tetley',
        unit: 'box',
        buyingPrice: 180,
        sellingPrice: 275,
        currentStock: 25,
        minStockLevel: 10,
        supplierId: suppliers[1].id,
        description: 'Green tea bags box',
        barcode: '1234567890052',
      },
    }),
    prisma.product.create({
      data: {
        sku: 'BEV-007',
        name: 'Orange Juice 1L',
        categoryId: categories[6].id,
        brand: 'Tropicana',
        unit: 'pack',
        buyingPrice: 120,
        sellingPrice: 180,
        currentStock: 30,
        minStockLevel: 15,
        supplierId: suppliers[1].id,
        description: '100% orange juice',
        barcode: '1234567890053',
      },
    }),
  ]);
  console.log(`✅ Created ${products.length} products`);

  // Create customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: 'Ramesh Kumar',
        phone: '+91 98765 55555',
        email: 'ramesh.k@email.com',
        address: '45 MG Road, Bangalore',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Sunita Sharma',
        phone: '+91 98765 66666',
        email: 'sunita.s@email.com',
        address: '12 Park Street, Bangalore',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Vikram Patel',
        phone: '+91 98765 77777',
        email: 'vikram.p@email.com',
        address: '88 Brigade Road, Bangalore',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Anita Desai',
        phone: '+91 98765 88888',
        email: 'anita.d@email.com',
        address: '23 Residency Road, Bangalore',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Rajesh Gupta',
        phone: '+91 98765 99999',
        email: 'rajesh.g@email.com',
        address: '67 Church Street, Bangalore',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Priya Menon',
        phone: '+91 98765 00001',
        email: 'priya.m@email.com',
        address: '34 Commercial Street, Bangalore',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Amit Singh',
        phone: '+91 98765 00002',
        email: 'amit.s@email.com',
        address: '56 Indiranagar, Bangalore',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Deepa Reddy',
        phone: '+91 98765 00003',
        email: 'deepa.r@email.com',
        address: '78 Koramangala, Bangalore',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Suresh Iyer',
        phone: '+91 98765 00004',
        address: '90 Jayanagar, Bangalore',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Kavita Joshi',
        phone: '+91 98765 00005',
        email: 'kavita.j@email.com',
        address: '11 Malleshwaram, Bangalore',
      },
    }),
  ]);
  console.log(`✅ Created ${customers.length} customers`);

  // Create historical invoices (past 90 days)
  const today = new Date('2026-09-08');
  const invoices = [];

  for (let i = 0; i < 25; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const invoiceDate = new Date(today);
    invoiceDate.setDate(invoiceDate.getDate() - daysAgo);

    const customer = customers[Math.floor(Math.random() * customers.length)];
    const numItems = Math.floor(Math.random() * 5) + 1; // 1-5 items per invoice
    const selectedProducts: any[] = [];

    for (let j = 0; j < numItems; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      if (!selectedProducts.find(p => p.id === product.id)) {
        selectedProducts.push(product);
      }
    }

    let subtotal = 0;
    let totalCost = 0;
    const items = [];

    for (const product of selectedProducts) {
      const quantity = Math.floor(Math.random() * 5) + 1; // 1-5 quantity
      const itemTotal = product.sellingPrice * quantity;
      const itemCost = product.buyingPrice * quantity;
      const itemProfit = itemTotal - itemCost;

      subtotal += itemTotal;
      totalCost += itemCost;

      items.push({
        productId: product.id,
        productName: product.name,
        productSku: product.sku,
        unit: product.unit,
        quantity,
        buyingPrice: product.buyingPrice,
        sellingPrice: product.sellingPrice,
        itemDiscount: 0,
        itemTotal,
        itemCost,
        itemProfit,
      });
    }

    const discountPercent = Math.random() > 0.7 ? Math.floor(Math.random() * 10) + 2 : 0; // 30% chance of discount
    const discountAmount = (subtotal * discountPercent) / 100;
    const taxRate = businessSettings.defaultTaxRate;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * taxRate) / 100;
    const grandTotal = taxableAmount + taxAmount;
    const totalProfit = grandTotal - totalCost - taxAmount;

    const paymentMethods = ['Cash', 'UPI', 'Card', 'Bank Transfer'];
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

    const invoiceNumber = `INV-${String(i + 1).padStart(6, '0')}`;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        customerId: customer.id,
        subtotal,
        discountAmount,
        discountPercent,
        taxRate,
        taxAmount,
        grandTotal,
        totalCost,
        totalProfit,
        paymentMethod,
        paymentStatus: 'PAID',
        status: 'COMPLETED',
        createdAt: invoiceDate,
        updatedAt: invoiceDate,
        items: {
          create: items,
        },
      },
    });

    // Create inventory transactions for each item
    for (const item of items) {
      const product = products.find(p => p.id === item.productId)!;
      await prisma.inventoryTransaction.create({
        data: {
          productId: item.productId,
          type: 'SALE',
          quantity: -item.quantity,
          previousStock: product.currentStock,
          newStock: product.currentStock - item.quantity,
          reason: `Invoice ${invoiceNumber}`,
          reference: invoice.id,
          createdAt: invoiceDate,
        },
      });

      // Update product stock
      await prisma.product.update({
        where: { id: item.productId },
        data: { currentStock: { decrement: item.quantity } },
      });
    }

    invoices.push(invoice);
  }
  console.log(`✅ Created ${invoices.length} historical invoices with items and transactions`);

  // Create some expenses
  const expenses = await Promise.all([
    prisma.expense.create({
      data: {
        title: 'Monthly Rent',
        category: 'Rent',
        amount: 25000,
        date: new Date('2026-08-01'),
        notes: 'Shop rent for August 2026',
      },
    }),
    prisma.expense.create({
      data: {
        title: 'Electricity Bill',
        category: 'Utilities',
        amount: 3500,
        date: new Date('2026-08-15'),
        notes: 'Electricity charges',
      },
    }),
    prisma.expense.create({
      data: {
        title: 'Staff Salary',
        category: 'Salary',
        amount: 35000,
        date: new Date('2026-08-30'),
        notes: 'August salary for 2 employees',
      },
    }),
    prisma.expense.create({
      data: {
        title: 'Store Maintenance',
        category: 'Maintenance',
        amount: 8000,
        date: new Date('2026-08-20'),
        notes: 'AC repair and electrical work',
      },
    }),
  ]);
  console.log(`✅ Created ${expenses.length} expenses`);

  console.log('');
  console.log('🎉 Seed completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`  • Users: 1 (admin@smartbilling.com / admin123)`);
  console.log(`  • Categories: ${categories.length}`);
  console.log(`  • Suppliers: ${suppliers.length}`);
  console.log(`  • Products: ${products.length}`);
  console.log(`  • Customers: ${customers.length}`);
  console.log(`  • Invoices: ${invoices.length}`);
  console.log(`  • Expenses: ${expenses.length}`);
  console.log('');
  console.log('✨ You can now run: npm run dev');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
