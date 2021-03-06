var express = require('express'),
    bodyParser = require('body-parser'),
    db = require("./models"),
    session = require("express-session"), 
    path = require('path'),
    app = express(),
    methodOverRide = require('method-override'),
    _ = require("underscore");
    // cookieParser = require('cookie-parser');

// views path
var views = path.join(process.cwd(), "views");

app.use(express.static(__dirname + "/public"));
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverRide('_method'));
// app.use(cookieParser());

db.User.find({}, function (err, foundUsers) {
	if (err) {
		return console.log(err);
	}
});

//session
app.use(
	session({
		secret: "super8secret-keyy",
		resave: false,
		saveUnitialized: true,
	})
);



// extending the `req` object to help manage sessions
app.use(function (req, res, next) {
  // login a user
  req.login = function (user) {
    req.session.userId = user._id;
  };
  // find the current user
  req.currentUser = function (cb) {
    db.User.
      findOne({ _id: req.session.userId },
      function (err, user) {
        req.user = user;
        cb(null, user);
      })
  };
  // logout the current user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  }
  // call the next middleware in the stack
  next(); 
});

// show a users idea
app.get("/api/idea", function (req, res) {
	//get the images 
})

app.get("/profile", function (req, res) {
  req.currentUser(function(err, user) {
    if (req.user === null) {
      res.redirect("/login");
    }
    res.render('profile', {user: user});
  })
});

app.get("/signup", function (req, res) {
  res.render('signUp');
});

app.get("/login", function (req, res) {
  res.render('login');
});


// where the user submits the sign-up form
app.post(["/users", "/signup"], function (req, res) {
  // grab the user from the params
  var user = req.body.user;
  // pull out their email & password
  var email = user.email;
  var password = user.password;
  // create the new user
  db.User.createSecure(email, password, function (err, user) {
  	console.log("this is signup user", user);
  	req.login(user);

    res.redirect("/profile"); 
    // res.send(email + " is registered!\n");

  });
});


app.post(["/idea"], function (req, res) {
  console.log(req.body);
  // var idea = req.body.idea;
  // var titles = idea.titles;
  // var images = idea.images;

  // db.Idea.createIdea(titles, images, function (err, idea) {
  //   console.log(idea);
  //   req.user.push(idea);
  //   req.user.save(function (err, wait) {
  //     if (err) {return console.log(err);}
  //     res.redirect("/profile");
  //   });
    
  // });
  req.currentUser(function(err, user) {
    user.ideas.push(req.body.idea);
    user.save(function (err) {
      if (err) { return console.log(err); }
      console.log(req.body.idea , " has been added for user " + user.email);
    });
  });
      res.redirect('/profile');


});

// where the user submits the login form
app.post(["/sessions", "/login"], function (req, res) {
  var user = req.body.user;
  var email = user.email;
  var password = user.password;
  db.User.authenticate(email, password, function (err, user) {
    if(err){console.log(err); 
      
      res.redirect('/login');}
      else {
    console.log("this is login user", user);
    req.login(user);
    // redirect to user profile
    res.redirect("/profile"); 
    }
  });
});

app.post(["/sessions", "/logout"], function (req, res) {
  req.logout();
  res.redirect("/login");
})

app.delete('/user/:_id/idea/:id', function (req, res) {
  console.log(req.params);
  var artId = req.params.id
  console.log("params", artId);
  db.User.findOne(req.params._id).then(function (user) {
    user.ideas.id(artId).remove();
      user.save(function (err){
        if (err) {
          console.log(err);
        }
        res.redirect("/profile");
      });    
  });
});

// app.post("/profile", function (req, res) {
// 	var imag = req.body.imagesHere;
// 	db.Imag.create(image, function (err, imag) {
		
// 		res.redirect("/profile")
// 	})
// })
// 



var listener = app.listen(3000, function () {
  console.log("Listening on port " + listener.address().port);
});