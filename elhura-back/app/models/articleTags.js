/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('articleTags', {
    idArticle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idTag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'articleTags',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idArticle" },
          { name: "idTag" },
        ]
      },
    ]
  });
};
