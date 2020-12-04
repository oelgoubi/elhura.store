/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CartElement', {
    idCartElement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idArticle: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Article',
        key: 'idArticle'
      }
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Client',
        key: 'idUser'
      }
    },
    quantityArticleCartElement: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CartElement',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCartElement" },
        ]
      },
      {
        name: "FK_cartElementArticle",
        using: "BTREE",
        fields: [
          { name: "idArticle" },
        ]
      },
      {
        name: "FK_cartElementClient",
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
    ]
  });
};
