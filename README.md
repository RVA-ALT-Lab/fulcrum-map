# Fulcrum Map Package

This is a base example of a leaflet map with historical VA county boundaries projected on the map layers.

All dependencies (CSS, JS) are loaded in the body of the `index.html` and that file can be opened in a browser directly by file path or served on a local server.

If you click on a county, a popup with the county name should be displayed.

Based on how we need to load resources, here are a few things I could do:
1. Combine all JS and data files into one file per vignette
2. The script and html could reference a global version of leaflet instead of loading their own
3. Place all of the JS for a vignette in a `<script>` tag inside the corresponding HTML file instead of referencing external scripts using `src` attribute

The result should look something like this:
![base-interactive example](./base-interactivity.png "Base Map")