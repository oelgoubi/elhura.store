var DataTypes = require("sequelize").DataTypes;
var _Address = require("./Address");
var _Admin = require("./Admin");
var _Article = require("./Article");
var _CartElement = require("./CartElement");
var _Category = require("./Category");
var _Client = require("./Client");
var _Command = require("./Command");
var _CommandLine = require("./CommandLine");
var _Company = require("./Company");
var _Role = require("./Role");
var _Shipping = require("./Shipping");
var _Tag = require("./Tag");
var _articleTags = require("./articleTags");
var _favorites = require("./favorites");

function initModels(sequelize) {
  var Address = _Address(sequelize, DataTypes);
  var Admin = _Admin(sequelize, DataTypes);
  var Article = _Article(sequelize, DataTypes);
  var CartElement = _CartElement(sequelize, DataTypes);
  var Category = _Category(sequelize, DataTypes);
  var Client = _Client(sequelize, DataTypes);
  var Command = _Command(sequelize, DataTypes);
  var CommandLine = _CommandLine(sequelize, DataTypes);
  var Company = _Company(sequelize, DataTypes);
  var Role = _Role(sequelize, DataTypes);
  var Shipping = _Shipping(sequelize, DataTypes);
  var Tag = _Tag(sequelize, DataTypes);
  var articleTags = _articleTags(sequelize, DataTypes);
  var favorites = _favorites(sequelize, DataTypes);

  Admin.belongsTo(Address, { foreignKey: "idAddress"});
  Address.hasMany(Admin, { foreignKey: "idAddress"});
  Admin.belongsTo(Role, { foreignKey: "idRole"});
  Role.hasMany(Admin, { foreignKey: "idRole"});
  Article.belongsTo(Category, { foreignKey: "idCategory"});
  Category.hasMany(Article, { foreignKey: "idCategory"});
  Article.belongsTo(Company, { foreignKey: "idUser"});
  Company.hasMany(Article, { foreignKey: "idUser"});
  CartElement.belongsTo(Article, { foreignKey: "idArticle"});
  Article.hasMany(CartElement, { foreignKey: "idArticle"});
  CartElement.belongsTo(Client, { foreignKey: "idUser"});
  Client.hasMany(CartElement, { foreignKey: "idUser"});
  Client.belongsTo(Shipping, { foreignKey: "idShipping"});
  Shipping.hasMany(Client, { foreignKey: "idShipping"});
  Client.belongsTo(Address, { foreignKey: "idAddress"});
  Address.hasMany(Client, { foreignKey: "idAddress"});

  return {
    Address,
    Admin,
    Article,
    CartElement,
    Category,
    Client,
    Command,
    CommandLine,
    Company,
    Role,
    Shipping,
    Tag,
    articleTags,
    favorites,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
