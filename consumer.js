import ampq from 'amqplib';

async function connect() {
    try {
        const connection = await ampq.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");

        await channel.consume("jobs", (msg) => {
            console.log(msg.content.toString());
            channel.ackAll();
        });

    }
    catch (err) {
        console.error(`Something went wrong ${err}`);
    }
}
connect();