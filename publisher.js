import ampq from 'amqplib';

const message = { number: process.argv[2] };

async function connect() {
    try {
        const connection = await ampq.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)));
        console.log("Job sent successfully");
        await channel.close();
        await connection.close();
    }
    catch (err) {
        console.error(`Something went wrong ${err}`);
    }
}

connect();