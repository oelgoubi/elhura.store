require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken")

const app = express();

app.use(morgan('dev'))
const cron = require('node-cron');
const userService = require('./app/services/user');
const authService = require('./app/services/auth');

const app = express();

global.__basedir = __dirname;

app.use(morgan('dev'))

var corsOptions = {
  //origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

//sequelize
const db = require("./app/models");
db.sequelize.sync();

// remove non valid users each after every 2 hours
cron.schedule("0 0 */2 * * *", async () => {
  await userService.removeNonValidUsers();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Elhura" });
});

// try {
//   db.sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }


function authenticateToken(req,res,next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err) return res.sendStatus(403) 
    req.user = user
    next();
  })
}





require("./app/routes/auth.routes")(app);
function authenticateToken(req,res,next){
  console.log("BANG")
  const refresh_token = req.cookies.refresh_token
  const access_token = req.cookies.access_token
  console.log("ACCESS AND REFRESH : "+access_token+" "+refresh_token)
  if(access_token === null || refresh_token === null || access_token === undefined || refresh_token === undefined) return res.sendStatus(401)

  jwt.verify(access_token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err) {
      console.log("BEUG")
      jwt.verify(refresh_token,process.env.REFRESH_TOKEN_ACCESS,(refresh_err, refresh_user)=>{
        if(refresh_user !== undefined) {
          const access_token = authService.refreshToken(refresh_user.id, refresh_user.idRole);
          res.cookie('access_token', access_token, { httpOnly : true, maxAge : 3600*1000 });
        }
        if(refresh_err) return res.sendStatus(403)
        req.user = refresh_user
        next();
      });
    }
    req.user = user;
    next();
  });
}

require("./app/routes/auth.routes")(app);
require("./app/routes/file.routes")(app);
require("./app/routes/list-article.routes")(app);
require("./app/routes/user.routes")(app,authenticateToken);
require("./app/routes/client.routes")(app,authenticateToken);
require("./app/routes/company.routes")(app,authenticateToken);
require("./app/routes/admin.routes")(app,authenticateToken);
require("./app/routes/address.routes")(app,authenticateToken);
require("./app/routes/article.routes")(app,authenticateToken);
require("./app/routes/cart-element.routes")(app,authenticateToken);
require("./app/routes/category.routes")(app,authenticateToken);
require("./app/routes/command.routes")(app,authenticateToken);
require("./app/routes/shipping.routes")(app,authenticateToken);
require("./app/routes/tag.routes")(app,authenticateToken);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});