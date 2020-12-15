const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Client = require("./Client.js")(sequelize, Sequelize);
db.Address = require("./Address.js")(sequelize, Sequelize);
db.Admin = require("./Admin.js")(sequelize, Sequelize);
db.Article = require("./Article.js")(sequelize, Sequelize);
db.ArticleTags = require("./articleTags.js")(sequelize, Sequelize);
db.CartElement = require("./CartElement.js")(sequelize, Sequelize);
db.Category = require("./Category.js")(sequelize, Sequelize);
db.Command = require("./Command.js")(sequelize, Sequelize);
db.CommandLine = require("./CommandLine.js")(sequelize, Sequelize);
db.Company = require("./Company.js")(sequelize, Sequelize);
db.Favorites = require("./favorites.js")(sequelize, Sequelize);
db.Role = require("./Role.js")(sequelize, Sequelize);
db.Shipping = require("./Shipping.js")(sequelize, Sequelize);
db.Tag = require("./Tag.js")(sequelize, Sequelize);

module.exports = db;