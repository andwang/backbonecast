---
layout: page
title: "Backbone.Events"
order: 3.1
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
# <a id="namspace">`Events` is a Namespace</a>
When you come across Backbone's `Events` for the first time, you'll notice it is a little different from the other Backbone classes. Unlike `Model`/`Collection`/`View`, `Events` is plural. More intriguing is the fact that you do not recall any code that directly instantiates or uses Backbone's `Events`.

The differences arise from the fact that `Events` is not a *class*. Backbone's `Model`, `Collection`, `View` and `Router` are all *classes*, or *constructors*. In JavaScript, the way you use a class is to *new* it up, then call methods on the instance:

{% highlight javascript %}
var andrew = new Backbone.Model();
andrew.set("gender", "male");
person.get("gender");
{% endhighlight %}

`Events` is not a class, which means that you should never attempt to instantiate it via *new*. Rather, `Events` is a *namespace*, or *module*, which is simply a JavaScript object:

{% highlight javascript %}
Backbone.Events = {
  on: function...,
  off: function...,
  trigger: function...
}
{% endhighlight %}

In particular, there are 3 functions defined in the `Events` namespace: `on`, `off` and `trigger`, all of which are essential to the operation of Backbone. They are the real <dfn>meat</dfn>, and `Events` is just the <dfn>container</dfn>. The container is useful, because it prevents the functions from polluting the global namespace.

# <a id="mixin">`Events` is a Mixin</a>

If you don't know what a mixin is, here is a good [introduction]({{ BASE_URL }}/chapters/underscore.html#extend).

Although possible, `Events` is rarely directly accessed. Instead, `Events` is mixed into other classes so that the 3 methods, `on`/`off`/`trigger`, are accessible through the classes:

{% highlight javascript %}
var andrew = { gender: "male" };

// mix Backbone.Events into the person object
_.extend(andrew, Backbone.Events);

// now you can use any of the methods on the object
andrew.on("rap", function() {
  alert("booya!");
});
andrew.trigger("rap");
andrew.off();
{% endhighlight %}

Notice that `on`/`off`/`trigger` is avaiable on the person object.

In Backbone, `Events` are mixed into `Model`/`Collection`/`View`/`Router`:

{% highlight javascript %}
_.extend(Model.prototype, Events ...);
_.extend(Collection.prototype, Events ...);
_.extend(View.prototype, Events ...);
_.extend(Router.prototype, Events ...);
{% endhighlight %}

Notice that `Events` is mixed into the prototypes, so that it is available on every instance of these classes:
{% highlight javascript %}
var andrew = new Backbone.Model();
andrew.on("sing", function() {
  alert("woolala!");
});
andrew.trigger("sing");
andrew.off();
{% endhighlight %}

# <a id="methods">On, Off, and Trigger</a>

Once you understand where these methods come from, using `on`/`off`/`trigger` is actually very straightforward.

`trigger` signals an event has happened.
{% highlight javascript %}
var andrew = {};
_.extend(andrew, Backbone.Events);
andrew.trigger("sing"); // andrew is singing
{% endhighlight %}

Note that there is nothing special about the event name "sing". The object "andrew" has no special knowledge about the string "sing". The event name is just an arbitrary string that you use to mark an event. You can make it "serenade", "hum" if you like. Although, if you have heard me sing, you will probably choose an event name such as "groan".

In the example above, when you trigger an event "sing", nothing happens. That is because you did not tell "andrew" what to do when the event "sing" happens. To register an action that takes place when an event happens, you use "on":

{% highlight javascript %}
var andrew = {};
_.extend(andrew, Backbone.Events);
andrew.on("sing", function() {
  alert("woolala");
});
andrew.trigger("sing");
{% endhighlight %}

Now you'll see "woolala" shows up as an alert when you trigger the event "sing". Again, nothing is special about the string "sing". When `trigger` is called, behind the scenes, Backbone looks at all callbacks registered on "andrew" and checks if any callback is registered with the event name "sing". If any callback with the event name is found, Backbone invokes it. That's it.

At some point in the future, you probably will want to stop listening to a certain event. To do so, use "off", the opposite of "on":

{% highlight javascript %}
var andrew = {};
_.extend(andrew, Backbone.Events);
andrew.on("sing", function() {
  alert("woolala");
});
andrew.trigger("sing"); // alert shows
andrew.off("sing");

andrew.trigger("sing"); // alert does not show
{% endhighlight %}

The second `trigger` does nothing because there is no longer a callback of the event "sing".

# <a id="names">Event names</a>

You can register as many events on an object as you'd like. Let's say "andrew" can sing, rap, hip-hop, and tango. Because singing and rapping are vocal skills, while the other two are dance sills, you want to call the events "vocal:sing", "vocal:rap", "dance:tango", "dance:hiphop". 

{% highlight javascript %}
andrew.on("vocal:sing", ...);
andrew.on("vocal:rap", ...);
andrew.on("dance:tango", ...);
andrew.on("dance:hiphop", ...)
{% endhighlight %}

There is nothing special about the colon. It's just a character that helps us organize the events into categories. Backbone provides no special support for the colon. It just helps us read.

Using the colon, however, is the convention for namespacing Backbone events. Do this.

You can turn off individual events by `off(eventName)`. But if you want to turn off all events registered on an object, use `off()`, with no event name passed in:
{% highlight javascript %}
// turn off "vocal:sing"
andrew.off("vocal:sing", ...);

// turn off all events on andrew
andrew.off();
{% endhighlight %}


# <a id="bind">`bind` and `unbind`</a>

In an older version of Backbone, `on` was called `bind` and `off` was called `unbind`. The name `bind` was confusing because underscore.js has a method named [`bind`]({{ BASE_PATH }}/chapters/underscore.html#bind) which also deals with functions.

Like underscore.js, jQuery had this exact problem and decided to abandon the name `bind` for `on`. Following jQuery's lead, Backbone migrated the names too. 

For back-compatibility, `Backbone` continues to support these outdated methods as alternative ways of calling `on` and `off`.

{% highlight javascript %}
Events.bind = Events.on;
Events.unbind = Events.off;
{% endhighlight %}

This allowed sloppy coders to continue to use `bind` for `on`. Don't use `bind` for `on`. Don't do it. If I see this in your code, I'll be like:

<img src="{{ BASE_PATH }}/assets/rage-why.png" />

# <a id="context">Context</a>

Whenever you pass a function around in JavaScript, the function's context will be lost. If you do not know what function context is, make sure you read [this]({{ BASE_PATH }}/chapters/underscore.html#bind) before proceeding.

When you call `on`, you pass a callback to it, so you need to think about the loss of context.

{% highlight javascript %}
var andrew = {
    name: "andrew"
};

var yurika = {
  name: "yurika",
  playGame: function() {
    alert(this.name + " loses.");
  }
};

_.extend(andrew, Backbone.Events);
andrew.on("play", yurika.playGame);
andrew.trigger("play");
{% endhighlight %}

I am really good at playing video games. I don't know why, but that is like the only thing I have a natural gift for. My wife Yurika, on the other hand, is less fortunate. When she plays against me, she often losses, hence the inspiration for the code.

What is the outcome of the code? If you understand function context, you know it would be: "andrew loses." Actually, you probably cannot be certain that it's "andrew loses." But you know for sure it's not going to be "yurika loses.", because the context "yurika" is lost by the time the function `playGame` is invoked.

To preserve the function context, you could have called `_.bind(yurika.playGame, yurika)` before calling `on`; had you done this, indeed "yurika loses" would be the alert message, and that is what you want. However, there is an easy way to do this:

{% highlight javascript %}
// equivalent to calling _.bind first
andrew.on("play", yurika.playGame, yurika);
{% endhighlight %}

When you pass the third parameter to `on`, Backbone binds it as the context for the callback. When `playGame` is called, "yurika" is used as the context. The world is right again. 