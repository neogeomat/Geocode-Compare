WebApp URL: https://geocodecompare.000webhostapp.com
Android Apk URL: https://build.phonegap.com/apps/3427083/download/android/?qr_key=4M-V94DETqVatM-9LdDo

There are many geocoding service providers nowadays. There is no consistency among the results provided by these services. This app shows the different results for same location and visualises them on the map.

API Used: Arcgis Geocoding API, Google Geocoding API, HERE Geocoding API and OpenStreetmap Geocoding API (and also reverse geocoding api's of same)

Libraries: Jquery Mobile, Leaflet, Leaflet control geocoder plugin

How to use: In the landing/home page, search for any place, and it will display the results from different services. Click on any of the results and it will take you to  map page showing all the results. The same can be achieved by clicking on the map button in the navigation bar. Where am I page will show you the results of reverse geocode of your current position. The header is persistent on all pages for uniform user experience. 

Problems faced: 
Async nature of tile handling has been difficult to handle as the map needed to be redrawn. a timeout function has been used to remedy this issue. 
Legend need more work, currently the markers and legend are not same. Two svg has been used in the map for circlemarker (outer circle and inner dot). In the map, leaflet handles the svg part. But the legend is HTML and svg has to be hard-coded as HTML. Copying the rendered HTML part from map didnot work.
Back Button in the map page shows up in some cases and doesnot show up sometimes. this issue is not fully understood.

Possibe improvements:
Reverse Geocode of other locations
More geocode service providers
Option to choose service provisers
Calculation of discrepancy results and visulatization in charts 