---
layout: page
title: "Underscore.js"
tags: [Underscore]
order: 2
---
{% include JB/setup %}

`jQuery` programmers know that `jQuery` provides a number of utility functions that make JS programming more productive. These include miscellaneous functions such as `isNumeric`, which tests if the argument is a number,
{% highlight javascript %}
jQuery.isNumeric(2); // returns true;
{% endhighlight %}

and iterator functions such as `map`, `each`, `unique`, that take an array or object as input and iterate each of the elements to do something useful:
{% highlight javascript %}
$.map([1, 2, 3], function(num) {
  return 10 - num;
}); // returns [9, 8, 7]
{% endhighlight %}

Like `jQuery`, `Underscore.js` is a JS utility library. 

#Why would anyone use `Underscore`?

### `Underscore` is much more powerful.

`jQuery` provides few JS utility functions, mostly to support its own DOM manipulation libraries. As a result, many useful utility methods are missing in `jQuery`.

On the other hand, `Underscore` is designed to be a complete JS utility toolbox. There are many methods in `Underscore` that are not in jQuery.


If you are looking for a JS utility function, you should look for it in `Underscore` before writing your own. 

### `Underscore` is not a DOM utility library.

Unlike `jQuery`, which provides DOM selection and manipulation methods, `Underscore.js` is a pure JS utility library that does not help with working with the DOM.

{% highlight javascript %}

{% endhighlight %}
-------------------------------------
# Collections

A collection is an array or an object. All of the methods below work on both an array, i.e. `[1, 2, 3]`, and an object, i.e. `{ x: 1, y: 2 }`.

*each*

The `each` method iterates over a list and calls the function passed in on each of the element.

{% highlight javascript %}

_.each(["hello", "world", "peace"], function(word) { alert(word); }

_.
{% endhighlight %}




-------------------------------------
# Arrays

-------------------------------------
# Objects

-------------------------------------
# Functions

-------------------------------------
# Utility

-------------------------------------
# Chaining




