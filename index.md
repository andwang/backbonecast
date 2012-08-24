---
layout: page
title: Learning Backbone.js
tagline: Step-by-step tutorial on Backbone.js
---
{% include JB/setup %}

At my friends' urging, I decided to write a tutorial on Backbone.js.

About one year ago when I began writing my first Backbone.js app, I found it a challenging framework to learn. It is different from any of the other UI framework I used, and at times I was not sure whether I was using it right. As any developer would do under the situation, I looked around for a tutorial or a book.

A quick google search revealed that there was no shortage of information available on Backbone.js. A few hours into my reading, however, I discovered that most tutorials were not very good.  There are a few common problems that plagued the tutorials on the subject:

###They skip over the basics.

Backbone.js has 6 fundamental classes, including Model, Collection, View, Router, History and Event. Few tutorials talk about how to use Event or History. Instead, these classes are just used in the code samples as if they have been introduced before. 

###They don't go into enough depth.

There are a number of advanced concepts in Backbone.js. For example, how should a router communicate with a view? How do views communicate with each other when only transient states changed? Should we not use the anchor href attribute and let the router take care of all routing? There are so many questions I had with no answer to.

###Most importantly, they don't explain well.
Most tutorials are just thrown-together pieces of code using Backbone. There is little explanation on the reasoning of the design. Why did the author choose to write it this way rather than the other way? What makes a design choice good? The explanation is scanty or poor.

This book is my attempt to teach backbone in a comprehensible and comprehensive way. If you discover a mistake in my writing, please 