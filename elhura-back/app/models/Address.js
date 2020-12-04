/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Address', {
    idAddress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    street: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    postalCode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    region: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(254),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Address',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idAddress" },
        ]
      },
    ]
  });
};
