import otpGenerator from "otp-generator"; // to generate OTP 
import nodemailer from "nodemailer";

export const getOTP = () => {
  return otpGenerator.generate(7, {
    digits: true,
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
}

export const getOTPtemlate = (emailDetails) => {
  let template = `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
  
  <div style="margin: 50px auto; width: 70%; padding: 20px 0">
      <div style="border-bottom: 1px solid #eee">
      <img src="https://omnifood.dev/img/omnifood-logo.png" alt="OmniFood Logo" style="max-width: 100px; height: auto;">
      </div>
      <p style="font-size: 1.1em">Hi, ${emailDetails.name}</p>
      <p>We received a request to reset the password associated with your OmniFood account. Please use the following One-Time Password (OTP) to complete the password reset process:</p>
      <h2 style="background: #e67e22; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;"> 
      <a href="${emailDetails.resetLink}" style="color: #fff; text-decoration: none;">Reset Link</a>  </h2> 
      <p>If the button above doesn't work, you can also <a href="${emailDetails.resetLink}" style="color: #0000FF; text-decoration: none;">click here to reset your password</a>.</p> 
      <p style="font-size: 0.9em;">This OTP is valid for 5 minutes. If you didn't request a password reset, please disregard this email.</p>
      <p style="font-size: 0.9em;">Regards,<br />OmniFood Team</p>
      <hr style="border: none; border-top: 1px solid #eee" />
      <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
          For assistance, contact us at support@omnifood.dev or visit our <a href="https://omnifood.dev/support" style="color: #00466a; text-decoration: none;">Support Center</a>.
      </div>
  </div>
</div>
`;
  return template;
}

export const mailSender = async (emailDetails) => {
  // input through which mechanism send your email

  //  -> port, facilitator (technical details)
  let template = getOTPtemlate(emailDetails);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  let dataObj = {
    from: '"OmniFood 🍽️" <cultfit@support.com>', // sender address
    to: emailDetails.email, // list of receivers
    subject: "OmniFood Account - Reset your password!",
    html: template,
  };
  // send mail with defined transporter object
  let info = await transporter.sendMail(dataObj);
}
