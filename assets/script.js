window.addEventListener('load', function () {
    // history from local storage 
    var existingHistory;
    if (!JSON.parse(localStorage.getItem('history'))) {
      existingHistory = [];
    } else {
      existingHistory = JSON.parse(localStorage.getItem('history'));
    }
  
    var historyItems = [];
  
    
    function getForecast(searchValue) {
      if (!searchValue) {
        return;
      }
      var endpoint = `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`;
      fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
          var forecastEl = document.querySelector('#forecast');
          forecastEl.innerHTML = '<h4 class="mt-3">5-Day Forecast:</h4>';
          forecastRowEl = document.createElement('div');
          forecastRowEl.className = '"row"';
  
          
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
  
              // put data on page 
              colEl.appendChild(cardEl);
              bodyEl.appendChild(titleEl);
              bodyEl.appendChild(imgEl);
              bodyEl.appendChild(windEl);
              bodyEl.appendChild(humidityEl);
              bodyEl.appendChild(p1El);
              bodyEl.appendChild(p2El);
              cardEl.appendChild(bodyEl);
              forecastEl.appendChild(colEl);
            }
          }
        });
    }
  
    // UV index fetch
    // function getUVIndex(lat, lon) {
    //   fetch(
    //     `http://api.openweathermap.org/data/2.5/uvi?appid=d91f911bcf2c0f925fb6535547a5ddc9&lat=${lat}&lon=${lon}`
    //   )
    //     .then((res) => res.json())
    //     .then((data) => {
    //       var bodyEl = document.querySelector('.card-body');
    //       var uvEl = document.createElement('p');
    
  
   
  
    //       bodyEl.appendChild(uvEl);
    //       uvEl.appendChild(buttonEl);
    //     });
    // }
  
    const handleHistory = (term) => {
        if (existingHistory && existingHistory.length > 0) {
          var existingEntries = JSON.parse(localStorage.getItem('history'));
          var newHistory = [...existingEntries, term];
          localStorage.setItem('history', JSON.stringify(newHistory));
          
        } else {
          historyItems.push(term);
          localStorage.setItem('history', JSON.stringify(historyItems));
        }
      };
  
    // Function for API request
    function searchWeather(searchValue) {
      var endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`;
      fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
          if (!existingHistory.includes(searchValue)) {
            handleHistory(searchValue);
          }
          todayEl = document.querySelector('#today');
          todayEl.textContent = ' ';
  
          // HTML content for weather
          var titleEl = document.createElement('h3');
          titleEl.classList.add('card-title');
          titleEl.textContent = `${
            data.name
          } (${new Date().toLocaleDateString()})`;
          var cardEl = document.createElement('div');
          cardEl.classList.add('card');
          var windEl = document.createElement('p');
          windEl.classList.add('card-text');
          var humidEl = document.createElement('p');
          humidEl.classList.add('card-text');
          var tempEl = document.createElement('p');
          tempEl.classList.add('card-text');
          humidEl.textContent = `Humidity: ${data.main.humidity} %`;
          tempEl.textContent = `Temperature: ${data.main.temp} °F`;
          var cardBodyEl = document.createElement('div');
          cardBodyEl.classList.add('card-body');
          var imgEl = document.createElement('img');
          imgEl.setAttribute(
            'src',
            `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
          );
  
          // Append all the content 
          titleEl.appendChild(imgEl);
          cardBodyEl.appendChild(titleEl);
          cardBodyEl.appendChild(tempEl);
          cardBodyEl.appendChild(humidEl);
          cardBodyEl.appendChild(windEl);
          cardEl.appendChild(cardBodyEl);
          todayEl.appendChild(cardEl);
  
        
          getForecast(searchValue);
        //   getUVIndex(data.coord.lat, data.coord.lon);
        });
    }
  
    // Function to make new row 
    function makeRow(searchValue) {
      
      var liEl = document.createElement('li');
      liEl.classList.add('list-group-item', 'list-group-item-action');
      liEl.id = searchValue;
      var text = searchValue;
      liEl.textContent = text;
  
      
      liEl.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
          searchWeather(e.target.textContent);
        }
      });
      document.getElementById('history').appendChild(liEl);
    }
  
    // Existing history 
    if (existingHistory && existingHistory.length > 0) {
      existingHistory.forEach((item) => makeRow(item));
    }
  
    // Helper function to get a search value.
    function getSearchVal() {
      var searchValue = document.querySelector('#search-value').value;
      if (searchValue) {
        searchWeather(searchValue);
        makeRow(searchValue);
        document.querySelector('#search-value').value = '';
      }
    }
  
    // function connect to button 
    document
      .querySelector('#search-button')
      .addEventListener('click', getSearchVal);
  });

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

// window.addEventListener('load', function () {
//     var existingHistory;
//   if (!JSON.parse(localStorage.getItem('history'))) {
//     existingHistory = [];
//   } else {
//     existingHistory = JSON.parse(localStorage.getItem('history'));
//   }

//   var historyItems = [];

//     function getForecast(searchValue) {
//         if (!searchValue) {
//           return;
//         }
//         var endpoint = `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`;
//         fetch(endpoint)
//           .then((res) => res.json())
//           .then((data) => {
//             var forecastEl = document.querySelector("#forcast");
//             forecastEl.innerHTML = '<h4 class="mt-3">5-Day Forcast:</h4>';
      
//             forcastRowEl = document.createElement("div");
//             forcastRowEl.className = '"row"';
      
//             for (var i = 0; i < data.list.length; i++) {
//               if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
//                 // Create HTML elements for a bootstrap card
//                 var colEl = document.createElement("div");
//                 colEl.classList.add("col-md-2");
//                 var cardEl = document.createElement("div");
//                 cardEl.classList.add("card", "bg-primary", "text-white");
//                 var windEl = document.createElement("p");
//                 windEl.classList.add("card-text");
//                 windEl.textContent = `Wind Speed: ${data.list[i].wind.speed} MPH`;
//                 var humidityEl = document.createElement("p");
//                 humidityEl.classList.add("card-text");
//                 humidityEl.textContent = `Humidity : ${data.list[i].main.humidity} %`;
//                 var bodyEl = document.createElement("div");
//                 bodyEl.classList.add("card-body", "p-2");
//                 var titleEl = document.createElement("h5");
//                 titleEl.classList.add("card-title");
//                 titleEl.textContent = new Date(
//                   data.list[i].dt_txt
//                 ).toLocaleDateString();
//                 var imgEl = document.createElement("img");
//                 imgEl.setAttribute(
//                   "src",
//                   `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
//                 );
//                 var p1El = document.createElement("p");
//                 p1El.classList.add("card-text");
//                 p1El.textContent = `Temp: ${data.list[i].main.temp_max} °F`;
//                 var p2El = document.createElement("p");
//                 p2El.classList.add("card-text");
//                 p2El.textContent = `Humidity: ${data.list[i].main.humidity}%`;
      
//                 // Merge together and put on page
//                 colEl.appendChild(cardEl);
//                 bodyEl.appendChild(titleEl);
//                 bodyEl.appendChild(imgEl);
//                 bodyEl.appendChild(windEl);
//                 bodyEl.appendChild(humidityEl);
//                 bodyEl.appendChild(p1El);
//                 bodyEl.appendChild(p2El);
//                 cardEl.appendChild(bodyEl);
//                 forecastEl.appendChild(colEl);
//               }
//             }
//           });
//       };
//     //API Request

// function searchWeather(searchValue) {
//     var endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`;
//     fetch(endpoint)
//       .then((res) => res.json())
//       .then((data) => {
//         if (!existingHistory.includes(searchValue)) {
//           handleHistory(searchValue);
//         }
  
//         todayEl = document.querySelector("#today");
//         todayEl.textContent = " ";
  
//         var titleEl = document.createElement("h3");
//         titleEl.classList.add("card-title");
//         titleEl.textContent = `${data.name} (${new Date().toLocaleDateString()})`;
//         var cardEl = document.createElement("div");
//         cardEl.classList.add("card");
//         var windEl = document.createElement("p");
//         windEl.classList.add("card-text");
//         var humidEl = document.createElement("p");
//         humidEl.classList.add("card-text");
//         var tempEl = document.createElement("p");
//         tempEl.classList.add("card-text");
//         humidEl.textContent = `Humidity: ${data.main.humidity} %`;
//         tempEl.textContent = `Temperature: ${data.main.temp} °F`;
//         var cardBodyEl = document.createElement("div");
//         cardBodyEl.classList.add("card-body");
//         var imgEl = document.createElement("img");
//         imgEl.setAttribute(
//           "src",
//           `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
//         );
  
//         //Append content
//         titleEl.appendChild(imgEl);
//         cardBodyEl.appendChild(titleEl);
//         cardBodyEl.appendChild(tempEl);
//         cardBodyEl.appendChild(humidEl);
//         cardBodyEl.appendChild(windEl);
//         cardEl.appendChild(cardBodyEl);
//         todayEl.appendChild(cardEl);
  
//         getForecast(searchValue);
//         getUVIndex(data.coord.lat, data.coord.lon);
//       });
//   };

//   function makeRow(searchValue) {
//     var liEl = document.createElement("li");
//     liEl.classList.add("list-group-item", "list-group-item-action");
//     liEl.id = searchValue;
//     var text = searchValue;
//     liEl.textContent = text;
  
//     liEl.addEventListener("click", (e) => {
//       if (e.target.tagName === "LI") {
//         searchWeather(e.target.textContent);
//       }
//     });
//     document.getElementById("history").appendChild(liEl);
//   }
  
//   if (existingHistory && existingHistory.length > 0) {
//     existingHistory.forEach((item) => makeRow(item));
//   }
  
//   function getSearchVal() {
//     var searchValue = document.querySelector("#search-value").value;
//     if (searchValue) {
//       searchWeather(searchValue);
//       makeRow(searchValue);
//       document.querySelector("#search-value").value = "";
//     }
//   }
  
//   //search value to search button 
//   document
//       .querySelector('#search-button')
//       .addEventListener('click', getSearchVal);

// }


// // Function to Get Forecast

// //UV Index

// function getUVIndex(lat, lon) {
//     fetch(
//       `http://api.openweathermap.org/data/2.5/uvi?appid=d91f911bcf2c0f925fb6535547a5ddc9&lat=${lat}&lon=${lon}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         var bodyEl = document.querySelector('.card-body');
//         var uvEl = document.createElement('p');
//         uvEl.id = 'uv';
//         uvEl.textContent = 'UV Index: ';
//         var buttonEl = document.createElement('span');
//         buttonEl.classList.add('btn', 'btn-sm');
//         buttonEl.innerHTML = data.value;



//         bodyEl.appendChild(uvEl);
//         uvEl.appendChild(buttonEl);
//       });
//   }

//   const handleHistory = (term) => {
//     if (existingHistory && existingHistory.length > 0) {
//       var existingEntries = JSON.parse(localStorage.getItem('history'));
//       var newHistory = [...existingEntries, term];
//       localStorage.setItem('history', JSON.stringify(newHistory));
//       // If there is no history, create one with the searchValue and save it localStorage
//     } else {
//       historyItems.push(term);
//       localStorage.setItem('history', JSON.stringify(historyItems));
//     }
//   };






//create new row


