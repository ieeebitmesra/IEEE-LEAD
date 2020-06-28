PROJECT NAME - WEATHER 
	
NAME - SWATI PRIYA

MILESTONES ACHIEVED - 
	
	1. Fetching latitude and longitude of a given location through API call - On top of the webpage the weather details are displayed by fetching the current location of the viewer, i.e. latitude and longitude, through API call . 

	If you search for any city , there are various weather details displayed .

 	2. Fetching weather of given location through API call - This is done using the API call : 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + input.value + '&appid=apikey'

	As you type the city name like Ranchi , Delhi , Mumbai , etc..,  the weather details such as city_name , country_Id , current_temperature , humidity , min_temperature , max_temperature , latitude_value , longitude_value , description are displayed on the webpage .

	3. Fetching location's weather for a past date and displaying weather of current location  on webpage opening - There is a search bar at the bottom of the page where one can search for the past date ( past five days ) weather data by just entering the date in yyyy-mm-dd format .

	The weather details of current location are displayed on the top of the webpage . API used for this is - 'http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`' . 

Moreover, if you click on the temperature then the temperature in celsius changes to fahrenheit and vice versa.

	4. Additionals - 

		a. Viewer seems to be more interested in knowing the future weather data too. Hence, I have displayed the 7 days weather forecast data too.

		b. I have customized the webpage according to the weather. The background image changes according to the weather description.

		c. I have added a weather icon to demonstrate the current location's weather.

		Moreover, the webpage is responsive .

TECH STACK -
	
	The project is made using HTML , CSS and, JS.

DESCRIPTION - 

	The weather details of current location are displayed on the top of the webpage . 

	Details are - 

	• An icon which describes the weather accurately, 
	• Current temperature,
	• Weather description and,
	• City name along with country_ Id;

	As you type the city name like Ranchi , Delhi , Mumbai , etc..,  the weather details such as city_name , country_Id , current_temperature , humidity , min_temperature , max_temperature , latitude_value , longitude_value , description are displayed on the webpage.

	Just below that the weather forecast for 7 days is displayed. 

	At the bottom of the webpage a search bar is present where you can search for past weather data ( previous  5 days ) . 

	If you enter a wrong or out of scope date then error is returned . 

	I have added a typing effect to display content “Search For Past Weather Data (!Previous 5 Days!)”.

 UNIQUE - 

	• The webpage is responsive. • The weather forecast data of 7 days.

PROBLEMS FACED -
	
	• Conversion of UNIX timestamp to date and vica versa.
	• Changing the background image according to the weather was tricky as well.

SCOPE OF IMPROVEMENT - 
	 
	Code would have been better like using array, more comments.


WHAT DID I LEARN FROM THIS PROJECT - 
  	
	This is my first project using API. While making this project I learned many new concepts. It was a 'learn on the go experience,' the best part of the project.

	After this project I am definitely going to explore more about js.

LINK FOR THIS PROJECT - https://swatipriya2805.github.io/weather/

