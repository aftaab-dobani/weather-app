var searchForm = $("#search-form")
var searchTermEl = $("#search-term") 
var currentDisplay = $("#current-display")


searchForm.on("submit", function (event) {
    event.preventDefault();

    var searchTerm = searchTermEl.val();
    console.log(searchTerm);

    var apiKey = "819e5b8efc5e89edb4ff847e76d49bcd";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&APPID=" + apiKey;
     
    fetch(queryURL)
      .then(function(response){
        return response.json();
    })
    .then(function (data){
        console.log(data.main.temp);

        var tempEl = $("#temp")
        tempEl.addClass("col-sm-4");
        tempEl.attr(data.main.temp);
        currentDisplay.append(tempEl);

        
    });

});

// api url with search term and key 
// store key in variable 


