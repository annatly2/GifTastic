var topics = ["Master of None", "Aziz Ansari", "pasta"];

for(i = 0; i < topics.length; i++){
        console.log("hello");
        var newButton = $("<button>");
        newButton.addClass("topics");
        newButton.attr("gif-name", topics[i]);
        newButton.text(topics[i]);
        $("buttons-view").append(newButton);
	
}

$("button").on("click", function(){

	var food = $(this).attr("data-food");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        food + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
        	url: queryURL,
        	method: "GET"
        })
        .done(function(response){
        	console.log(response);
        	var results = response.data;
        	for (var i = 0; i < results.length; i++){
        		var gifDiv = $("<div class = 'item'>");
        		var rating = results[i].rating;
        		var p = $("<p>").text("Rating: "+ rating);

        		var foodImage = $("<img>");
        		foodImage.attr("src", results[i].images.fixed_height.url);

        		gifDiv.prepend(p);
        		gifDiv.prepend(foodImage);

        		$("#gifs-appear-here").prepend(gifDiv);

        	}


        });

});