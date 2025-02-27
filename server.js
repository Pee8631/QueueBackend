import queueRoute from './controllers/queue_controller.js';
import express from 'express';
import sequelize from './config.js';
import cors from 'cors';
const app = express()
const port = 3000

app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true, // Allow cookies and credentials
}));

// Sync database
async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true }); // Creates table if not exists
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

(async () => {
    await syncDatabase();
})();

app.get('/', (req, res) => res.send('Hello World!'))
// Middleware for handling CORS
app.use('/queue', queueRoute)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))