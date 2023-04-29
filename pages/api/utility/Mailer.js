const nodemailer = require("nodemailer");

exports.mailer = async (req, res, data) => {
  // console.log(data);
  // async..await is not allowed in global scope, must use a wrapper
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  // console.log(process.env.SMTP_HOST,process.env.SMTP_USER,process.env.SMTP_USER_PASS);
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_USER_PASS, // generated ethereal password
      },
    });

    // send mail with defined transport object
    console.log(data)
    
    const { email, subject } = data;
    let info = transporter.sendMail(
      {
        from: `"Fashionista E-Commerce" <${process.env.SMTP_USER}>`, // sender address
        to: email,
        subject,
        text: data.msg,
      },
      (error) => {
        if (!error) console.log("send");
        else{
          return res.status(500).json({
            success: false,
            msg:error.message
          });
        } 
      }
    );
    if (data?.res?.statusCode === 201) {
      const { statusCode, msg, user, token } = data.res;
      return res.status(statusCode).json({ info, success: true, msg, user, token });
    }

    return res.status(200).json({
      success: true,
      msg: "reset link has been sent to your gmail",
    });
  } catch (error) {
    res.status(500).json({success: false, msg:error.message });
  }
};

// mailer().catch(console.error);
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_KEY,
//     api_secret: process.env.CLOUD_SECRET,
// })
