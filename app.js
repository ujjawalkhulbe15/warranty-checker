var express =require ("express");
var app = express();
const hostname = 'localhost';
const port = '3000';
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');

const { auth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'vIsztYGWZ4K6ogm5vMDF_sgRh9VzSPKLKwXVfrqC7TySWmXIL-AuBNxadjBAlKYu',
  baseURL: 'http://localhost:3000',
  clientID: 'Q9AVZtThmlUsEwrbqMitjburU6apwcQ4',
  issuerBaseURL: 'https://dev-1yeocy-f.us.auth0.com'
};
app.use(auth(config));


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine' , 'ejs');



app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? res.render("index2") : res.render("index"));
});

app.get('/table', (req, res) => {
  res.render("table");
});

app.get('/claim', (req, res) => {
  res.render("claim");
});
app.get('/done' , (req,res)=>{
  res.render('done');
})

//emailJS send mails on 1 ,3, 5 ,10 days
app.post('/send' , (req,res)=>{
var date = req.body.date

  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:587,
    secure: true,
    auth: {
      user: 'technerd505@gmail.com',
      pass: 'technerd43321.'
    }
  })

  // Specify what the email will look like
  const mailOpts = {
    from: 'technerd505@gmail.com', // This is ignored by Gmail
    to: '${req.body.email}',
    subject: 'Warranty Expiring soon!! ',
    text: ` Your product expiry date is coming soon`
  }

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      console.log(error); // Show a page indicating failure
    }
    else {
      console.log('success'); // Show a page indicating success
    }
  })
})

//nodemailer setup
app.post('/sign_up', (req, res) => {

  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:465,
    secure: true,
    auth: {
      user: 'technerd505@gmail.com',
      pass: 'technerd43321.'
    }
  })

  // Specify what the email will look like
  const mailOpts = {
    from: '${req.body.email}', // This is ignored by Gmail
    to:'technerd505@gmail.com',
    subject: 'New message from contact form ',
    text: ` (${req.body.email}) says: ${req.body.message}`
  }

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      console.log(error); // Show a page indicating failure
    }
    else {
      console.log('success'); // Show a page indicating success
    }
  })
})

app.listen(port, hostname ,function(){
console.log (`warranty-checker started and running at port name-${hostname}:${port}`);
console.log("warranty-checker Started");
});
