$(document).ready(function(){
var topics = ["Master of None", "Aziz Ansari", "Alan Yang", "Lena Waithe", "New York City", "Pasta"];

function displayGifs(){
  var topicName = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicName + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
          url: queryURL,
          method: "GET"
  }).done(function(response){
    console.log(response);
    var results = response.data;
    for (var i = 0; i < results.length; i++){
      var gifDiv = $("<div class = 'item'>");
      var rating = results[i].rating.toUpperCase();
      var p = $("<p>").text("Rating: "+rating);

      var topicImg = $("<img>");
      var stillUrl = results[i].images.original_still.url;
      var animateUrl = results[i].images.fixed_height.url;

      topicImg.attr("src", stillUrl);
      topicImg.attr("playsrc", animateUrl);
      topicImg.attr("stopsrc", stillUrl);
      topicImg.attr("width", "300px");

      gifDiv.prepend(p);
      gifDiv.prepend(topicImg);

      $("#gifs-appear-here").prepend(gifDiv);
      topicImg.addClass("clickGif");
    }
  });

  $("#gifs-appear-here").html("");
}

function changeImg(){
  var animateImg = $(this).attr("playsrc");
  var stopImg = $(this).attr("stopsrc");

  if($(this).attr("playsrc") === $(this).attr("src")){
    $(this).attr("src", stopImg);
  }else{
    $(this).attr("src", animateImg);
  }
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
  renderButtons();
  $("#topic-input").val("");
});

$(document).on("click", ".topic", displayGifs);
renderButtons();
$(document).on("click", ".clickGif", changeImg);
});