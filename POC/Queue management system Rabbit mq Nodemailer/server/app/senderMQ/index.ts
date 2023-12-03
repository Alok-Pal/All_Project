// import sendEmails from "../consumerMQ";

const amqplib = require('amqplib/callback_api');
const queue = 'tasks';

const getEmails = (emails: any) => {

    amqplib.connect('amqp://localhost', (err: any, conn: any) => {
        if (err) throw err;

        conn.createChannel((err: any, ch1: any) => {
            if (err) throw err;

            ch1.assertQueue(queue)
            ch1.sendToQueue(queue, Buffer.from(JSON.stringify(emails)));

            setInterval(() => {
                
            }, 1000);
        });


        // sendEmails()
    })
}

export default getEmails