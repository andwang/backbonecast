---
layout: page
title: "Backbone.Model"
order: 3.2
---
{% include JB/setup %}

Chapter Outline

-  [`View` is a namepsace](#namespace)
-  [`Events` is a mixin](#mixin)
-  [on, off and trigger](#methods)
-  [Event names](#names)
-  [`bind` and `unbind`](#bind)
-  [Context](#context)

---
# <a id="namspace">Inheritance</a>
When you come across Backbone's `Events` for the first time, you'll notice it is a little different from the other Backbone classes. Unlike `Model`/`Collection`/`View`, `Events` is plural. More intriguing is the fact that you do not recall any code that directly instantiates or uses Backbone's `Events`.

The differences arise from the fact that `Events` is not a *class*. Backbone's `Model`, `Collection`, `View` and `Router` are all *classes*, or *constructors*. In JavaScript, the way you use a class is to *new* it up, then call methods on the instance:

{% highlight javascript %}
var andrew = new Backbone.Model();
andrew.set("gender", "male");
person.get("gender");
