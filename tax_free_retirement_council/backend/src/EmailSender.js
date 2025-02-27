var nodemailer = require("nodemailer");
var http = require("http");
var url = require("url");
require("dotenv").config({ path: __dirname + "/.env" });

export const send_email = async (formData) => {
  try {
    var transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: true,
    });

    await transporter
      .verify()
      .then(() => console.log("Nodemailer verified: SMTP connection works!"))
      .catch((error) => console.error("SMTP verification failed:", error));
    console.log("Server is ready to take our messages");
    const text_message = `A new lead has filled out the form via the website: 

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phoneNumber}
Age: ${formData.age}
State: ${formData.state}
Retirement Status: ${formData.retirementStatus}
Main Concerns: ${formData.mainConcerns}


`;
    const to_recipients = "ethanjmark2@gmail.com";

    var mailOptions = {
      from: "autosender.eth@gmail.com",
      to: to_recipients,
      bcc: "autosend.eth@gmail.com",
      subject: `New contact has submitted the form - ${formData.firstName} ${formData.lastName}`,
      text: text_message,
    };
    console.log("Sending email...");

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent to: " + to_recipients);

    return { success: true, message: "Email sent successfully", info };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email", error };
  }
};
