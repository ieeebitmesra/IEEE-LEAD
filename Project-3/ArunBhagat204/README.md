# README

## Weather Website

**NAME :** Arun Bhagat

**GROUP NO. :** 3

**MILESTONES ACHIEVED :** 

1. FETCHING LATITUDE AND LONGITUDE OF A GIVEN LOCATION BY API CALL
2. FETCHING WEATHER OF A GIVEN LOCATION THROUGH API CALL
3. FETCHING WEATHER FOR A PAST DATE AND DISPLAYING CURRENT WEATHER ON WEBSITE OPENING
4. OPTIONAL MILESTONES : CUSTOMIZING WEBSITE ACCORDING TO WEATHER

**TECH STACK :**

1. HTML5
2. CSS3 (WITH Bootstrap)
3. JAVASCRIPT (WITH A BIT OF jQuery)

**DESCRIPTION**

The website consists of four sections along with a navigation bar which contains quick links for scrolling as well as the location search box and contact links. The first section is the welcome page which displays the name and coordinates of the current location of the user(provided that the user gives access to his location through the standard browser prompt) along with a very brief description of the weather conditions of his current location. The next section displays the current weather of the location of the user/the location searched by the user. This design of this section is dynamic and it's background as well as weather icons change depending on the weather conditions it is currently displaying. The next section displays the forecast of the selected location for the next 12 days (4 at a time with the option to display the next four). The final section is for displaying the historical weather data(of the location searched) for a date selected by the user. It shows the name of the location and timezone information along with the requested historical data.

**UNIQUE**

- Around ten different background designs and weather icons for the current weather section depending on the content of the weather data.
- A revamped and neat bootstrap layout with clear seperation of sections and contrasting colour palette.
- A dynamic and animated navigation bar which changes design and opacity depending on the section being scrolled.
- Smooth scrolling animations and clean clutter-less fonts.
- Useful features of weather being shown at a glance along with icons and hoverable display elements.
- Forecast being shown in a compact manner consisting of four days unless expanded to eight or twelve so as to not fill the whole section.
- Date for historical data is input through a calender and the data is displayed just below in the same design as the current weather.
- Timezone and regions are also displayed on the historical data page.
- Responsive and animated(hoverable) buttons along with the option to search location with the 'Enter' key.

**PROBLEMS FACED**

1. Creating the weather layout for forecast and current weather sections
2. Providing buttons and options to expand forecast, enter location and input date.
3. Handling placeholders and error messages in case user does not allow location access.
4. Enabling the user to search from any section of the page and providing weather data at a glance.

**SCOPE OF IMPROVEMENT**

The website could have contained a section for displaying the hourly forecasts but I decided against it so as to not insert too much data as the API can be timed out and use-limited in some cases. Also, I wanted to implement a weather map of the requested location but I faced some problems with the Google Maps API (billing account set up was not working and unresponsive) and could not implement third-party map API's in time.

**WHAT YOU LEARNED?**

This is my first ever API project so I developed an extensive practical knowledge about calling and managing API's as well as displaying their information to the user in a presentable format. I also attained knowledge about creating webpages whose design depends on the content that it is displaying.
