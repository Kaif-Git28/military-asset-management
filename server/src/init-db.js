const { Sequelize } = require('sequelize');
const { Client } = require('pg');

async function initializeDatabase() {
  try {
    // First connect to default postgres database to create our database
    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'postgres'
    });

    await client.connect();
    console.log('Connected to postgres database');

    // Check if our database exists
    const checkDbResult = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'military_asset_management'"
    );

    // Create our database if it doesn't exist
    if (checkDbResult.rowCount === 0) {
      console.log('Creating military_asset_management database...');
      await client.query('CREATE DATABASE military_asset_management');
      console.log('Database created successfully');
    } else {
      console.log('Database already exists');
    }
    
    await client.end();

    // Now connect to our new database to set up tables
    const sequelize = new Sequelize(
      'military_asset_management',
      'postgres',
      'postgres',
      {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        logging: false
      }
    );

    await sequelize.authenticate();
    console.log('Connected to military_asset_management database');

    // Import models after sequelize is initialized
    const User = require('./models/user.model');

    // Sync all models
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully');

    // Create test users with different roles
    const testUsers = [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        department: 'IT',
        role: 'admin',
        base: null // Admin has access to all bases
      },
      {
        username: 'commander',
        email: 'commander@example.com',
        password: 'commander123',
        firstName: 'Base',
        lastName: 'Commander',
        department: 'Command',
        role: 'base_commander',
        base: 'Alpha Base'
      },
      {
        username: 'logistics',
        email: 'logistics@example.com',
        password: 'logistics123',
        firstName: 'Logistics',
        lastName: 'Officer',
        department: 'Supply Chain',
        role: 'logistics_officer',
        base: 'Alpha Base'
      },
      {
        username: 'staff',
        email: 'staff@example.com',
        password: 'staff123',
        firstName: 'Staff',
        lastName: 'Member',
        department: 'Operations',
        role: 'staff',
        base: 'Alpha Base'
      }
    ];

    // Create all test users
    for (const userData of testUsers) {
      try {
        await User.create(userData);
        console.log(`${userData.role} user (${userData.username}) created successfully`);
      } catch (error) {
        console.error(`Error creating ${userData.role} user:`, error.message);
      }
    }

    console.log('Test users created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Unable to initialize database:', error);
    process.exit(1);
  }
}

initializeDatabase(); 