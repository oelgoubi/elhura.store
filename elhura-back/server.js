require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken")

const app = express();

app.use(morgan('dev'))



var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//sequelize
const db = require("./app/models");
db.sequelize.sync();

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

app.post("/api/login",(req,res)=>{
  const { email,password} = req.body;
  // TODO : Authenticate User by checking if the  the email address exists
  // And the password matchs the pwd in the DB


  const user = { email : email}

  const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
  res.json({
    accessToken
  })
})

app.post



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






require("./app/routes/client.routes")(app,authenticateToken);
require("./app/routes/company.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/address.routes")(app);
require("./app/routes/article.routes")(app);
require("./app/routes/cart-element.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/command.routes")(app);
require("./app/routes/shipping.routes")(app);
require("./app/routes/tag.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});