const path = require('path');
const dotenv = require('dotenv');

// Explicitly load .env from the server directory
dotenv.config({ path: path.join(__dirname, '.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Models import
const User = require('./models/user');
const MenuItem = require('./models/MenuItem');
const Table = require('./models/Table');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://angelee1312_db_user:JaYUJKPnxHGa5Xp2@ac-sloxyz6-shard-00-00.3i9vefo.mongodb.net:27017,ac-sloxyz6-shard-00-01.3i9vefo.mongodb.net:27017,ac-sloxyz6-shard-00-02.3i9vefo.mongodb.net:27017/restaurant_app?ssl=true&replicaSet=atlas-d87zzv-shard-0&authSource=admin&appName=Cluster0';

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected for Seeding!');

    // Purana data clear karein
    await User.deleteMany({});
    await MenuItem.deleteMany({});
    await Table.deleteMany({});

    // Passwords hash karein
    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. Seed Users
    await User.insertMany([
      { name: 'Test Customer', email: 'customer@app.com', password: hashedPassword, role: 'customer' },
      { name: 'Restaurant Manager', email: 'manager@app.com', password: hashedPassword, role: 'manager' }
    ]);
    console.log('Users Seeded Successfully!');

    // 2. Seed Tables
    await Table.insertMany([
      { tableNumber: 1, capacity: 2 },
      { tableNumber: 2, capacity: 4 },
      { tableNumber: 3, capacity: 4 },
      { tableNumber: 4, capacity: 6 },
      { tableNumber: 5, capacity: 8 },
      { tableNumber: 6, capacity: 10 }
    ]);
    console.log('Tables Seeded Successfully!');

    // 3. Seed Menu Items
    const menuItems = [
      { name: 'Garlic Bread', description: 'Crispy toasted bread topped with garlic and fresh herbs', price: 450, category: 'Starters', isSpecial: false, isAvailable: true },
      { name: 'Chicken Wings', description: 'Spicy buffalo glazed chicken wings served with ranch', price: 750, category: 'Starters', isSpecial: true, isAvailable: true },
      { name: 'Soup of the Day', description: 'Freshly made seasonal vegetable soup', price: 380, category: 'Starters', isSpecial: false, isAvailable: true },
      { name: 'Beef Burger', description: 'Juicy beef patty with cheese, lettuce, and homemade sauce', price: 950, category: 'Mains', isSpecial: true, isAvailable: true },
      { name: 'Grilled Chicken Steak', description: 'Tender chicken breast served with mushroom sauce and fries', price: 1250, category: 'Mains', isSpecial: false, isAvailable: true },
      { name: 'Alfredo Pasta', description: 'Creamy fettuccine with parmesan cheese and herbs', price: 1100, category: 'Mains', isSpecial: false, isAvailable: true },
      { name: 'Margherita Pizza', description: 'Classic cheese pizza with fresh tomato sauce and basil', price: 1300, category: 'Mains', isSpecial: false, isAvailable: true },
      { name: 'Club Sandwich', description: 'Triple decker toasted sandwich with egg, chicken, and cheese', price: 650, category: 'Mains', isSpecial: false, isAvailable: true },
      { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten chocolate center', price: 550, category: 'Desserts', isSpecial: true, isAvailable: true },
      { name: 'New York Cheesecake', description: 'Rich and creamy classic cheesecake topped with strawberry glaze', price: 600, category: 'Desserts', isSpecial: false, isAvailable: true },
      { name: 'Vanilla Ice Cream', description: 'Two scoops of premium vanilla bean ice cream', price: 300, category: 'Desserts', isSpecial: false, isAvailable: true },
      { name: 'Fresh Mint Lemonade', description: 'Chilled refreshing drink made with fresh mint and lemon', price: 250, category: 'Drinks', isSpecial: false, isAvailable: true },
      { name: 'Iced Latte', description: 'Cold brewed espresso with fresh milk and ice', price: 400, category: 'Drinks', isSpecial: false, isAvailable: true },
      { name: 'Fresh Orange Juice', description: '100% pure freshly squeezed orange juice', price: 350, category: 'Drinks', isSpecial: false, isAvailable: true },
      { name: 'Mineral Water', description: '500ml pure mineral water bottle', price: 100, category: 'Drinks', isSpecial: false, isAvailable: true }
    ];

    await MenuItem.insertMany(menuItems);
    console.log('Menu Items Seeded Successfully!');

    console.log('All Data Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error.message);
    process.exit(1);
  }
};

seedData();