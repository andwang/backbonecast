---
layout: post
title: "extend"
category: Underscore.js
tags: [underscore]
---
{% include JB/setup %}

{% highlight javascript %}
_.extend = function(obj) {
  each(slice.call(arguments, 1), function(source) {
    for (var prop in source) {
      obj[prop] = source[prop];
    }
  });
  return obj;
};
{% endhighlight %}


To anyone who has witten `Backbone` code, the `extend` method is familiar. All of your application's `Model`s, `View`s and `Router`s are created by extending the corresponding classes of `Backbone`:
{% highlight javascript %}
var Person = Backbone.Model.extend({
  defaults: {
    firstName: 'Andrew',
    lastName: 'Wang'
  }
});
{% endhighlight %}

Conceptually, `extend` simply copies all the properties of the class
