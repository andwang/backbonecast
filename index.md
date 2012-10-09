---
layout: page
title: Intro
order: 0
---
{% include JB/setup %}

At my friend [Bryan Klimt](http://bklimt.com/)'s urging, I decided to write a tutorial on Backbone.js.

About one year ago when I began writing my first `Backbone.js` app, I found the framework challenging to learn. It is different from any of the other UI framework I used, and at times I was not sure whether I was using it right. As any developer would do under the situation, I looked around for a tutorial or a book.

A quick google search revealed that there was no shortage of information available on `Backbone.js`. A few hours into my reading, however, I discovered that most tutorials were not very good. There are a few common problems that plagued the tutorials on the subject:

### They don't explain well.

If you are new to Backbone, you'll find that most "tutorials" on Backbone are just a medley of "hello, world" applications. There is little explanation on the basic concepts such as `el` or `Events`.

### They are out of date.

Like any framework, `Backbone` has evolved a lot since its birth. Most tutorials do not keep track of these changes, and continue to propagate bad practices that earlier versions tolerated. 

For example, in earlier version of `Backbone`, it was OK to assign either the wrapped or unwrapped DOM element to `el`. Later, however, `$el` is introduced to eliminate the ambiguity. However, most tutorials continue to assign the wrapped element to `el`, to most beginners' confusion.

### They don't talk about the advanced concepts.

There are a number of common questions all `Backbone` developers come across. 
-	How do views communicate with each other? 
-	How do views update based on changes in transient states? 
-	How to dispose a view to prevent memory leak?
-	How to call the parent class' implementation in the child?
-	How to deal with model inheritance in `Collection`?

Most tutorials do not delve into this level of complexity.

### They are not sufficiently opinionated.

`Backbone` is not an opinionated framework. It is easy to come up with multiple solutions to the same problem. However, not all solutions are created equal; some are unquestionably superior. Most tutorials do not consider various approaches and simply identify one solution. Often, the one chosen is sub-optimal.

This book is my attempt to create a `Backbone` tutorial that I always wanted.