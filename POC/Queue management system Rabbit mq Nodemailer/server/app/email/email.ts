import nodemailer from 'nodemailer'
import CustomerRepository from '../repository';

const emailTransporter = async (emails: any) => {

  console.log("emailsqqqqqqqqqqqq", emails);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alokpal28071997@gmail.com',
      pass: 'plsgrpfyfkrcobef'
    }
  });

  const message = {
    from: '"Fred Foo 👻" <foo@example.com>',
    // to: "210511214053@paruluniversity.ac.in", 
    to: emails,
    subject: "Hello ✔",
    text: "Hello world?",
    html: `<html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
            }
            
            h1 {
              color: #333;
            }
            
            p {
              color: #666;
            }
            
            .button {
              display: inline-block;
              background-color: #FF0000;
              color: #fff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to Our World of chaos!</h1>
            <p>Dear subscriber,</p>
            <p>Thank you for signing up for this World. Stay updated with the latest news, offers, and more related things.</p>
            <p>Click the button below to confirm your subscription:</p>
            <p><a href="#" class="button">Confirm Subscription</a></p>
            <p>If you did not sign up for this , please ignore this email.</p>
            <p>Best regards,<br>Company Name The world where everything End's</p>
          </div>
        </body>
        </html>`,
  }

  const info = await transporter.sendMail(message, (error: any, info: any) => {
    if (error) {
      console.log('Error occurred:', error);

    } else {

      console.log('Email sent:', info.response);
    }
  });


  //  sending the email to database to check the email how many of them are sent 

  const response = await CustomerRepository.CustomerRepository.postEmail(emails)
  console.log("🚀 ~ file: email.ts:89 ~ emailTransporter ~ response:", response)



}

export default emailTransporter