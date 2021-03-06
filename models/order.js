module.exports = function(sequelize, DataTypes) {
	var Order = sequelize.define("Order", {
		custom: {
			type: DataTypes.TEXT,
		},
		date: {
			type: DataTypes.DATE,
			defaultValue: sequelize.NOW
		},
		finished: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		sent: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	});

	Order.associate = function(models){
		Order.belongsTo(models.User);

		Order.belongsToMany(models.Product, {
			through: "OrderProduct"
		});
	}

	return Order;
};