// import emailTransporter from "../email/email";

// const amqplib = require('amqplib/callback_api');
// const queue = 'tasks';

// const sendEmails = () => {

//     amqplib.connect('amqp://localhost', (err: any, conn: any) => {
//         if (err) throw err;

//         conn.createChannel((err: any, ch2: any) => {
//             if (err) throw err;

//             ch2.assertQueue(queue)

//             ch2.consume(queue, (msg: any) => {
//                 console.log("🚀 ~ file: index.ts:17 ~ ch2.consume ~ msg:", msg)
//                 console.log("🚀 ~ file: index.ts:17 ~ ch2.consume ~ msg:", JSON.parse(msg.content))
//                 // console.log(queue);

//                 for (const email of JSON.parse(msg.content)) {
//                     console.log("🚀 ~ file: index.ts:21 ~ ch2.consume ~ email:", email)
//                     emailTransporter(email)
//                 }
//                 ch2.ack(msg)

//             })
//         });



//     })
// }

// export default sendEmails