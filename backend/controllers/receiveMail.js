import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

export const receiveMail = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      message: result.array()[0].msg,
    });
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  const { subject, email, content } = req.body;

  let mailOptions = {
    from: email,
    to: 'theophilly20@gmail.com',
    subject: subject,
    text: `${content} from ${email}`,
  };

  await transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error ' + err);
      return res
        .status(400)
        .json({ message: 'sorry something went wrong', error: err });
    } else {
      return res.status(200).json({ message: 'Email sent successfully' });
    }
  });
};
