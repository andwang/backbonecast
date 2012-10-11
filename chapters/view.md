---
layout: page
title: "Backbone.View"
order: 3.3
---
{% include JB/setup %}

Chapter Outline

-  [`Events` is a namepsace](#namespace)
-  [`Events` is a mixin](#mixin)
-  [on, off and trigger](#methods)
-  [Event names](#names)
-  [`bind` and `unbind`](#bind)
-  [Context](#context)

---

If you have done UI programming before, you are already familiar with the concept of MVC. In a traditional MVC programming paradigm, models are the data, views are the UI elements you see, and view controllers are the coordinators between the models and the views. To be precise, the view controllers are responsible for:

1.  when models change, update the views.
2.  when the views are manipulated (i.e. a button is clicked), update the models.

How does this apply to `Backbone`?  `Backbone`'s `Model` is exactly the model in MVC. The DOM elements are the user interface, so the DOM elements are the views in MVC. `Backbone`'s `View` is the coordinator between the DOM and the models, and hence it is really the controller in `MVC`. 

It is very unfortunate and confusing that the name `View` is chosen for controllers in `Backbone`, but it helps to differentiate `View`s from `Router`s, which is another kind of controller in `Backbone` we'll learn about in another chapter.

---
Learning is most effective when you practice what you learn. While you read the chapter below, you should try running the code [here](../apps/playground/playground.html). It's just a simple web app where I have set up in a way that you can begin writing `Backbone` code right away. I have also set up various DOM elements so that you can practice Backbone `View`.
---

# <a id="namspace">`el` and $el</a>

Every `View` is responsible for some DOM elements, which the `View` might modify in various ways: append/remove a subview, show/hide a subview, move the positions and change the css styles. But there is always top-level DOM element beyond which the `View` does not touch. That top-level element the `View` is responsible for is the `el` property.

You would typically assign `el` during class *instantiation* time:

{% highlight javascript %}
var Playground = Backbone.View.extend();
var playground = new Playground({ el: '.playground' });
{% endhighlight %}

Alternatively, you can assign `el` during class *definition* time:

{% highlight javascript %}
var Playground = Backbone.View.extend({
  el: '.playground'
});

var playground = new Playground();
{% endhighlight %}

After you assigned `el`, you might want to get it back:

{% highlight javascript %}
alert(playground.el instanceof HTMLElement); // returns true
{% endhighlight %}

