import express from 'express';
const router = express.Router();
import PQueue from 'p-queue';
import { getQueue, getNewQueue, clearQueue } from "../services/queue_service.js";

// Create a new queue with concurrency of 1 (process one job at a time)
const pQueue = new PQueue({ concurrency: 1 })

router.get('/', async (req, res) => {
    const queue = await getQueue();
    console.log('GET Queue Successful');
    res.json(queue);
})

router.get('/new', async (req, res) => {
    const queue = await pQueue.add(() => getNewQueue());
    console.log('Generate a New Queue Successful');
    res.json(queue);
})

router.get('/clear', async (req, res) => {
    const message = await pQueue.add(() => clearQueue());
    console.log('Clear Queue Successful');
    res.json(message);
})

export default router;