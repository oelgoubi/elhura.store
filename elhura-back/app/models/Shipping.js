/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Shipping', {
    idShipping: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    shippingAddress: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    billingAddress: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Shipping',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idShipping" },
        ]
      },
    ]
  });
};
