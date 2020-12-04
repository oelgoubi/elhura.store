/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CommandLine', {
    idCommandLine: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idCommand: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idShipping: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idArticle: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quantityArticleCommandLine: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    subtotal: {
      type: DataTypes.DECIMAL(8,0),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CommandLine',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCommandLine" },
        ]
      },
    ]
  });
};
