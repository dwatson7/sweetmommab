var db = require("../../models");

module.exports = function(app, passport) {

	//we would put the guest account where null is ideally
	// app.get("/logintest", function(req, res){
	// 	if (!req.user) {
	// 		res.render("home", {user: null});
	// 	}
	// 	else {
	// 		res.render("home", {user: req.user});
	// 	}
	// });

	app.get("/login", function(req, res){
		res.render("login", {message: req.flash});
	});


	app.get("/create", function(req, res){
		res.render("create", {message:req.flash});
	});

	//Account creation
	app.post("/create", function(req, res){
		db.User.findOne({
			where: {
				username: req.body.username
			}
		}).then(function(data){
			if (!data){
				db.User.create({
					name: req.body.name,
					username: req.body.username,
					password: req.body.password,
					email: req.body.email
				}).then(function(user){
					if (!user) console.log("couldn't create");
					else {
						res.redirect("/login");
					}
				});
			}
			else if (data) {
				req.flash("Username Taken.");
			}
		});
	});

	app.post("/login",
		passport.authenticate("local", {
			failureRedirect: "/login",
			failureFlash: true
		}), function(req, res) {
			res.redirect("back");
	});
}