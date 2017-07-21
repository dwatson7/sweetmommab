module.exports = function(sequelize, DataTypes) {
	var Order = sequelize.define("Order", {
		custom: {
			type: DataTypes.TEXT
		},
		date: {
			type: DataTypes.DATE,
			defaultValue: Date.now()
		}
	});

	Order.associate = function(models){
		Order.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});

		Order.belongsToMany(models.Product, {
			through: "OrderProducts"
		});
	}
}