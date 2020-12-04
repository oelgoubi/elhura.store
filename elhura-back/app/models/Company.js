/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Company', {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idRole: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idAddress: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    siret: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    documents: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Company',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
    ]
  });
};
