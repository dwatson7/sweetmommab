var bcrypt = require("bcrypt");
var saltRounds = 10;

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1,20]
			},
			unique: true
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1],
				is: /^[\w.]+[@]{1}[\w.]+[.]{1}[a-z.]+$/i //match things that look like a valid email
			}
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1],
				is: /^[\w]+$/
			}
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		}
	}, {
		hooks: {
			beforeCreate: function(user) {
				User.hashPassword(user.password, function(err, hash){
					if (err) throw err;
					user.setDataValue("password", hash);
					user.save();
				});
			}
		}

	});

	User.associate = function(models) {
		User.hasMany(models.Recommendation);
		User.hasMany(models.Order);
	}

	User.hashPassword = function(password, cb) {
		bcrypt.genSalt(saltRounds, function(err, salt){
			bcrypt.hash(password, salt, function(err, hash){
				if (err) cb(err);
				cb(null, hash);
			});
		});
	};

	User.prototype.checkPassword = function(pass, cb) {
		bcrypt.compare(pass, this.password, cb);
	};


	return User;
};
		