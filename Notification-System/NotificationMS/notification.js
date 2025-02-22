//connect to rabbitmq server
//create a channel
//create the exchange
//create the queue
//Bind the queue to exchange
//Consume messages

async function consumeMessages(){
    const connection= await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertExchange('produceExchange', 'direct');

    const q= await channel.assertQueue('notificationQueue')

    await channel.bindQueue(q.queue, 'produceExchange', 'info');

    channel.consume(q.queue, (msg)=>{
        const content=JSON.parse(msg.content);
        console.log(content);

        channel.ack(msg);
    });
}

consumeMessages();