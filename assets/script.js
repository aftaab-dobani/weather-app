// var searchForm = $("#search-form")
// var searchTermEl = $("#search-term") 
// var currentDisplay = $("#current-display")


// searchForm.on("submit", function (event) {
//     event.preventDefault();

//     var searchTerm = searchTermEl.val();
//     console.log(searchTerm);

//     var apiKey = "819e5b8efc5e89edb4ff847e76d49bcd";
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&APPID=" + apiKey;
     
//     fetch(queryURL)
//       .then(function(response){
//         return response.json();
//     })
//     .then(function (data){
//         console.log(data.main.temp);

//         var tempEl = $("#temp")
//         tempEl.addClass("col-sm-4");
//         tempEl.attr(data.main.temp);
//         currentDisplay.append(tempEl);

        
//     });

// });

// api url with search term and key 
// store key in variable 

// Function to Get Forecast 
function getForecast(searchValue) {
    if (!searchValue) {
        return;
    }
    var endpoint = `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
          var forecastEl = document.querySelector('#forcast');
          forecastEl.innerHTML = '<h4 class="mt-3">5-Day Forcast:</h4>';

          forcastRowEl = document.createElement('div');
          forcastRowEl.className = '"row"';

          for (var i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.indexOf('15:00:00') !== -1) {
              
                // Create HTML elements for a bootstrap card
              var colEl = document.createElement('div');
              colEl.classList.add('col-md-2');
              var cardEl = document.createElement('div');
              cardEl.classList.add('card', 'bg-primary', 'text-white');
              var windEl = document.createElement('p');
              windEl.classList.add('card-text');
              windEl.textContent = `Wind Speed: ${data.list[i].wind.speed} MPH`;
              var humidityEl = document.createElement('p');
              humidityEl.classList.add('card-text');
              humidityEl.textContent = `Humidity : ${data.list[i].main.humidity} %`;
              var bodyEl = document.createElement('div');
              bodyEl.classList.add('card-body', 'p-2');
              var titleEl = document.createElement('h5');
              titleEl.classList.add('card-title');
              titleEl.textContent = new Date(
                data.list[i].dt_txt
              ).toLocaleDateString();
              var imgEl = document.createElement('img');
              imgEl.setAttribute(
                'src',
                `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
              );
              var p1El = document.createElement('p');
              p1El.classList.add('card-text');
              p1El.textContent = `Temp: ${data.list[i].main.temp_max} °F`;
              var p2El = document.createElement('p');
              p2El.classList.add('card-text');
              p2El.textContent = `Humidity: ${data.list[i].main.humidity}%`;


}



