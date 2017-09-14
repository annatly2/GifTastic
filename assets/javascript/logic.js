$(document).ready(function(){
var topics = ["Master of None", "Aziz Ansari", "Alan Yang", "Lena Waithe", "New York City", "Pasta"];

function displayGifs(){
  var topicName = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topicName + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
          url: queryURL,
          method: "GET"
  }).done(function(response){
    console.log(response);
    var results = response.data;
    for (var i = 0; i < results.length; i++){
      var gifDiv = $("<div class = 'item'>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: "+rating);

      var topicImg = $("<img>");
      var stillUrl = results[i].images.original_still.url;
      var animateUrl = results[i].images.fixed_height.url;

      topicImg.attr("src", stillUrl);
      topicImg.attr("data-state", "still");
      gifDiv.prepend(p);
      gifDiv.prepend(topicImg);

      $("#gifs-appear-here").prepend(gifDiv);
    }

  });

  $("#gifs-appear-here").html("");
}

function renderButtons(){

$("#buttons-view").empty();

  for(var i = 0; i < topics.length; i++){
          var newButton = $("<button>");
          newButton.addClass("topic");
          newButton.attr("data-name", topics[i]);
          newButton.text(topics[i]);
          $("#buttons-view").append(newButton);
  }
}

$("#add-topic").on("click", function(event){
  event.preventDefault();

  var newTopic = $("#topic-input").val().trim();
  topics.push(newTopic);
  console.log(topics);
  renderButtons();

});

$(document).on("click", ".topic", displayGifs);
renderButtons();

$(".item").on("click", function(){
    console.log("hello");
  var state = $(this).attr("data-state");
  if(state ==="still"){
    $(this).attr("src", animateUrl);
    $(this).attr("data-state", "animate");
  }else{
    $(this).attr("src", stillUrl);
    $(this).attr("data-state", "still");
  }


});



});