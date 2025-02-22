//create to the rabbitMQ server4
//create a new channel4
//Create the exchange
//Publish the message

const amqp=require("amqplib");
const config =require ("./config");

class Producer {
    channel;

    async createChannel (){
        const connection  = await amqp.connect(config.rabbitMQ.url);
        this.channel = await connection.createChannel();
    }

    async publishMessage(routingKey, message){
        if (!this.channel){
           await this.createChannel();
        }

        const exchangeName=config.rabbitMQ.exchangeName;
        await this.channel.assertExchange(exchangeName, 'direct');

        const logObject={
            logType: routingKey,
            message: message,
            dateTime: new Date()
        };

    await this.channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(logObject))
    );
    console.log('Publishing message to exchange:', exchangeName);
    console.log('Message:', message);


}
}

module.exports = Producer;