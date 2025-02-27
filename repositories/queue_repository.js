import Queue from "../models/queue.js";

async function countQueue() {
    try {
        return await Queue.count();
    } catch (error) {
        console.error(error);
        throw new Error("Failed to count queue");
    }
}

async function findQueue() {
    try {
        return await Queue.findOne();
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get queue");
    }
}

async function createQueue(QueueNumber) {
    try {
        const queue = await Queue.create({ QueueNumber: QueueNumber });
        return queue;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create queue");
    }
}

async function updateQueue(queueNumber) {
    try {
        let queues = await Queue.findOne();
        console.log(`Id: ${queues.id} Number: ${queueNumber} `);

        const affectCount = await Queue.update(
            {
                QueueNumber: queueNumber,
                updatedAt: Date.now(),
            },
            {
                where: { id: queues.id }
            }
        );
        console.log(`Updated ${affectCount} queue(s) Id: ${queues.id} Number: ${queueNumber} `);

        return affectCount;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update queue");
    }
}


export { countQueue, findQueue, createQueue, updateQueue };