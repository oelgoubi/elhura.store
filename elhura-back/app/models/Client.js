/* jshint indent: 2 */
const db = require("../models");

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  let Client = sequelize.define('Client', {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idRole: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idShipping: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Shipping',
        key: 'idShipping'
      }
    },
    idAddress: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Address',
        key: 'idAddress'
      }
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
    firstName: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    birthPlace: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    isValid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    validationCode: {
      type: DataTypes.STRING(6),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Client',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
      {
        name: "FK_clientAddress",
        using: "BTREE",
        fields: [
          { name: "idAddress" },
        ]
      },
      {
        name: "FK_clientShipping",
        using: "BTREE",
        fields: [
          { name: "idShipping" },
        ]
      },
    ]
  });
  return Client;
};
