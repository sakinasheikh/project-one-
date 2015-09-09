var db = require("./models");

// var new_idea = {
//   title: "wallpaper",
//   images: ['http://thumbs.dreamstime.com/x/paisley-wallpaper-pattern-17158469.jpg', 'http://cdn.shopify.com/s/files/1/0153/0623/products/Classic_Paisley_Wallpaper_in_Purples_and_Metallic_design_by_Seabrook_Wallcoverings_1_2048x2048.jpg?v=1364508551', 'http://www.ukwallpaper.co.uk/imgs/products/281132.jpg'],
// };

var user = {
  email: "sakina@gmail",
  passwordDigest: '1234',
  ideas: [] ,
};

// Clear Database
db.User.remove({}, function(err){

  if (err) { return console.log(err); };
  console.log("---> Database Wiped");

  // Seed Database
  db.User.createSecure(user.email, user.passwordDigest, function(err, newUser){
    if (err) { return console.log(err); };
    console.log("---> One newUser added")
    var newIdea = new db.Idea();
    newIdea.titles = "wallpaper";
    newIdea.images = ['http://thumbs.dreamstime.com/x/paisley-wallpaper-pattern-17158469.jpg', 'http://cdn.shopify.com/s/files/1/0153/0623/products/Classic_Paisley_Wallpaper_in_Purples_and_Metallic_design_by_Seabrook_Wallcoverings_1_2048x2048.jpg?v=1364508551', 'http://www.ukwallpaper.co.uk/imgs/products/281132.jpg'];
    var newNewIdea = new db.Idea();
    newNewIdea.titles = "puppys";
    newNewIdea.images = ['http://www.pawderosa.com/images/puppies.jpg', 'http://cdn2.hellogiggles.com/wp-content/uploads/2013/12/09/a-cutest-puppies-11.jpg', 'https://realistrebel.files.wordpress.com/2015/01/cutest-puppy-ever-1384460985_org.jpg', 'https://s-media-cache-ak0.pinimg.com/236x/cb/42/f0/cb42f032223eedc9111ae4e46f58ebaa.jpg'];
    newUser.ideas.push(newIdea);
    newUser.ideas.push(newNewIdea);
    newUser.save(function(err, user){
      console.log(user);
    });
  });

});