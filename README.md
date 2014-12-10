jquery-mobile-datepicker
========================

The underlying purpose of creating this was because I developed iOS/Android app using JQueryMobile for my front-end. Problem arises when you use <b>\<input type='date'\></b> or <b>\<input type='month'\></b> on Android version 4.4 below; their WebView does not support these types of input. Therefore, to provide consistency across all versions this was made!

This version of datepicker is tested with <b>JQuery Mobile v1.4.2</b> and <b>JQuery v1.10.2</b>

<h2>Live Demo </h2>
Check out the live demo in JSFiddle: [click here](http://jsfiddle.net/2pz3urur/)

<h2>How To Use?</h2>
Let's assume these are your inputs:
```
// Date picker
<input type='text' class='datepicker'>

// Month picker
<input type='text' class='monthpicker'>
```

To call jquery-mobile-datepicker, do this:
```
// Date picker
$('.datepicker').datepicker();

// Month picker
$('.monthpicker').monthpicker();
```

As simple as that!

<h2>Dependency</h2>
This plugin requires JQuery, JQueryMobile, and FontAwesome. Put the following tags on your header:
```
// JQuery 2.1.1
<script src='//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js'>

// JQuery Mobile 
<script src='//cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.1/jquery.mobile.min.js'>
<link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.1/jquery.mobile.min.css'>

// Font Awesome
<link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css'>
<link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/fonts/FontAwesome.otf'>
```

