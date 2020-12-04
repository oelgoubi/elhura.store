/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Client', {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    birthplace: {
      type: DataTypes.STRING(254),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Client',
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
};
