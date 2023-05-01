// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler =  async (event) => {
  let data = JSON.parse(event.body);
  let messageBody = `
  <h2>Someone is needing Armfield Builders's assistance</h2>
    <h4>Here is the information we have:</h4>
    <ul>
        <li>Name: ${data.name}</li>
        <li>Email: ${data.email}</li>
        <li>Phone: ${data.phone}</li>
        <li>Services: ${data.services}</li>
        <li>Message: ${data.message}</li>
    </ul>
  `;
  const mail_to_send = {
    to: process.env.EMAIL_ADDRESS,
    from: process.env.FROM_EMAIL_ADDRESS,
    subject: "New contact form submission from ArmfieldBuilders.com!",
    html: messageBody,
  };

  try{
    await sgMail.send(mail_to_send);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success"})
    }
  } catch(e){
    return {
      statusCode: e.code,
      body: e.message
    }
  }
};