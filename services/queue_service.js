import { countQueue, findQueue, createQueue, updateQueue } from '../repositories/queue_repository.js';
const Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Alphabet for queue numbering
// Get all queues from the database
async function getQueue() {
    try {
        const queueCount = await countQueue();
        if (queueCount === 0) {
            await createQueue("00");
        }
        const queue = await findQueue();
        return queue;
    } catch (error) {
        console.error(error);
        throw "Error in getQueue queue_repository:" + error;
    }

}

// Function to generate a new queue number
async function getNewQueue() {
    try {
        const queueCount = await countQueue();
        if (queueCount === 0) {
            await createQueue("A0");
        }
        let queue = await findQueue();
        console.log("Current Queue Number: " + queue.QueueNumber);
        queue.QueueNumber = generateQueueNumber(queue.QueueNumber);
        console.log("from generateQueueNumber: " + queue.QueueNumber);

        const affectCount = await updateQueue(queue.QueueNumber);

        if (affectCount === 0) {
            throw "Failed to update Queue Number";
        }

        return queue;
    } catch (error) {
        console.error(error);
        throw "Error in GetQueue queue_repository:" + error;
    }
}
// Function to clear the queue
async function clearQueue() {
    try {
        const affectCount = await updateQueue("00");

        if (affectCount === 0) {
            throw "Failed to update Queue Number";
        } else {
            console.log("Cleared Queue Successfully: ");
            return "ล้างคิวสำเร็จแล้ว";
        }
    } catch (error) {
        console.error(error);
        throw "Error in ClearQueueNumber queue_repository:" + error;
    }
}

// Function to generate a new queue number
function generateQueueNumber(QueueNumber) {
    let letterIndex = Alphabet.indexOf(QueueNumber[0]);
    let queueNumber = Number(QueueNumber[1]);

    console.log("Init Index: " + letterIndex);
    console.log("Init Number: " + queueNumber);
    if (letterIndex === -1) {
        letterIndex = 0;
        queueNumber = 0;
    } else if (queueNumber === 9) { // If the last number in the current letter is reached
        letterIndex = letterIndex + 1;
        if (letterIndex >= Alphabet.length) {
            letterIndex = 0;
        }
        queueNumber = 0;
    } else {
        queueNumber = queueNumber + 1;
    }
    console.log("Index changed:" + letterIndex);
    console.log("Number changed: " + queueNumber);

    QueueNumber = Alphabet[letterIndex] + queueNumber;
    return QueueNumber;
}

export { getQueue, getNewQueue, clearQueue };
