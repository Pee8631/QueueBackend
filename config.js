import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

// Debugging dotenv
console.log("Loaded Environment Variables:",
    process.env.DB_HOST,
    process.env.DB_PORT, 
    process.env.DB_USER, 
    process.env.DB_PASS,
    process.env.DB_DIALECT
);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mssql', // Default to 'mssql'
    dialectOptions: {
        options: {
            encrypt: true, // Enable encryption if needed
            trustServerCertificate: true
        }
    },
    retry: {
        max: 5 // Retry up to 5 times
    },
    logging: false // Disable logging
});

// async function createDatabase() {
//     try {
//         await sequelize.query(`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '${process.env.DB_NAME}') 
//                                CREATE DATABASE ${process.env.DB_NAME};`);
//         console.log(`Database ${process.env.DB_NAME} checked/created.`);
//     } catch (error) {
//         console.error('Error creating database:', error);
//     }
// }

// // Immediately Invoke the Function Properly
// (async () => {
//     await createDatabase();
// })();

export default sequelize;
