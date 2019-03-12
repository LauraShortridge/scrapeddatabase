// Grab the articles as a json

$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articlecard").append(
      "<div class='card mb-3' id='articleimage'> <img class='card-img-top' src='" + data[i].image + "'alt='Card image cap'><div class='card-body'><p data-id='" + data[i]._id + "'>" + data[i].title + "</p> <a href='" + data[i].link + "'>Check out the article here.</a><br><button href='#' class='btn btn-primary mt-3'>Save Article</button></div></div>"
    );
      console.log(data[i]._id);
  }
});

$.getJSON("/saved", function (data) {
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#savedarticlecard").append(
      "<div class='card mb-3' id='articleimage'> <img class='card-img-top' src='" + data[i].image + "'alt='Card image cap'><div class='card-body'><p data-id='" + data[i].id + "'>" + data[i].title + "</p> <a href='" + data[i].link + "'>Check out the article here.</a><br><button href='#' class='btn btn-primary mt-3 mr-3 notebutton'>Add a Note</button><button href='#' class='btn btn-primary mt-3 deletebutton'>Delete</button></div></div>"
    );
    console.log(data[i]._id);
  }
})

$("#scrapebutton").on("click", function () {
  console.log("I have been clicked");
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    .then(function (result) {
      console.log(result);
      location.reload();
    })
});

$("#articlecard").on("click", ".btn-primary", function () {
  $.ajax({
    method: "POST",
    url: "/saved",
    data: {
      image: $(this).parents("#articleimage").children("img").attr("src"),
      title: $(this).parents(".card-body").children("p").text(),
      link: $(this).parents(".card-body").children("a").attr("href"),
      id: $(this).parents(".card-body").children("p").attr("data-id")
    }
  })
  .then(function (data) {
    // Log the response
    console.log(data);
    // Empty the notes section
    $("#notes").empty();
  });
});

// Whenever someone clicks an add a note button
$(document).on("click", ".notebutton", function () {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id 
  var thisId = $(this).parents(".card-body").children("p").attr("data-id");
  console.log(thisId);

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#deletenote", function () {
  
})


