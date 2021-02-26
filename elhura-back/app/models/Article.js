/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Article', {
    idArticle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idCategory: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Category',
        key: 'idCategory'
      }
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Company',
        key: 'idUser'
      }
    },
    designation: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    unitPrice: {
      type: DataTypes.DECIMAL(8,0),
      allowNull: true
    },
    wholesalePrice: {
      type: DataTypes.DECIMAL(8,0),
      allowNull: true
    },
    avatarUrl: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(254),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Article',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idArticle" },
        ]
      },
      {
        name: "FK_articleCategory",
        using: "BTREE",
        fields: [
          { name: "idCategory" },
        ]
      },
      {
        name: "FK_articleCompany",
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
    ]
  });
};
