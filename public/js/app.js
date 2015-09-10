

// var db = require("./models");

// db.Imag.find({}, function (err, foundImag) {
//   if (err) {
//     return console.log(err);
//   }
// });

// same as `$(document).ready`, it will only run once the document loads
$(function(){

  
  // //create our octocat template
  // var imageTemplate = _.template($('#imag-template').html());
  // // data is defined in data.js
  // var images = Imag.image;
  // // get our template to give us an html string for each octocat
  // images.forEach(function(imag){
  //   // give our template some data and get html from it
  //   var imagHtml = imageTemplate(imag);
  //   // append resulting html to the placeholder area
  //   $("#images-placeholder").append(imagHtml);
  // });
});
// function deleteIdeas(context)
// {
//     // We take the id of the button which is equivalent to the mongoDB _id of the book it is related to as well as the _id of the comment.
//     var commentId = context.id;
//     //console.log(commentId);
//     // We send an AJAX DELETE request to the backend with the combination of ids in the data field so we can easily access it via "req.body" on the backend.
//     $.ajax({
//         url: '/idea',
//         type: 'DELETE',
//         data: {_id: commentId},
//         // If the DELETE request is successful, we re-render all the books.
//         success: function(res)
//         {
//             //console.log("deletion successful");
//             render("profile");
//         }
//     });
// }






