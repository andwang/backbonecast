---
layout: page
title: "Backbone.Model"
order: 3.2
---
{% include JB/setup %}

Chapter Outline

-  [`Model` represents data](#representation)
    - [`defaults`](#defaults)
-  [`Model` validates data](#validation)
-  [`Model` persists data](#persistence)
    - [`save`](#save)
    - [`destroy`](#destroy)
    - [`id` and `idAttribute`](#id)
    - [`fetch`](#fetch)
    - [`url` and `urlRoot`](#url)
-  [`Model` triggers events](#events)

---

Learning is most effective when you practice what you learn. While you read the chapter below, you should try running the code [here](../apps/playground/playground.html). It's just a simple web app where I have set up in a way that you can begin writing `Backbone` code right away. I have also set up the backends used in my examples so that you can try out the code without setting up a backend yourself.

# <a id="representation">Models represent data</a>

If you are writing an app, you need to work with data. To represent and store data, you'll need to create *models*. In a Backbone app, models are created by extending from `Backbone.Model`. Let's say you are creating an app that stores information about people, in particular, their names and ages.

{% highlight javascript %}
var Person = Backbone.Model.extend();
{% endhighlight %}

You can then proceed to use the model by *instantiating* it, or *newing* it up:

{% highlight javascript %}
var andrew = new Person();
{% endhighlight %}

Then you can store information on each instance by setting and getting data from andrew:

{% highlight javascript %}
andrew.set("age", 28);
andrew.set("name", "Andrew");
{% endhighlight %}

In Backbone, "age" and "name" are called "attributes". You can get their values by calling `get`:

{% highlight javascript %}
alert(andrew.get("andrew")); // 28
{% endhighlight %}

### <a id="defaults">defaults</a>

You can provide default values for your models:

{% highlight javascript %}
var Person = Backbone.Model.extend({
  defaults: {
    'gender': 'male'
  }
});
var andrew = new Person();
andrew.get('gender'); // returns 'male'
{% endhighlight %}

By default, every instance of the `Person` model will get all the attributes specified in `defaults`. This is handy.

Some of you might be thinking that there is an alternative, more straightforward way of representing data, by using plain old JavaScript objects(POJO):

{% highlight javascript %}
var andrew = {
  age: 28,
  name: "Andrew"
};
{% endhighlight %}

So what's the point of using `Backbone.Model`? There are 3 advantages over the traditional approach:

-  validation
-  persistence
-  events

# <a id="validation">Models validate data</a>

I may one day make the following mistake:

{% highlight javascript %}
andrew.set("age", "28"); // "28" is a string
{% endhighlight %}

This is bad and I want to prevent people from using strings to store age. This is where `Model` validation comes in:

{% highlight javascript %}
var Person = Backbone.Model.extend({
  validate: function(attrs) {
    if (!_.isUndefined(attrs.age) && !_.isNumber(attrs.age)) {
      return "age must be a number.";
    }
  }
});

var andrew = new Person();
andrew.set("age", "28");
alert(andrew.get("age")); // returns 'undefined'
{% endhighlight %}

The `Model`'s `validate` is run before each `set`. If the data are valid, you don't need to return any value in `validate`; but you should return an *error* if the attributes contain any invalid info, which prevents `set` from completing. The *error* can be any string or object.

# <a id="persistence">Models persist data</a>

In order to use data across sessions, you need to persist your data to your backend. Usually this involves:

1.  set up a database,
2.  expose a ReST API for your data,
3.  write client logic to communicate with the ReST API.

`Backbone` does not solve any of your backend problems; `Backbone` does not simplify 1) and 2). You still need to set up a database and a web data access API. However, `Backbone` simplifies 3).

To save a model, all you need is to tell where the model is saved (via `urlRoot` or `url`) and call `save`:

{% highlight javascript %}
var Person = Backbone.Model.extend({
  urlRoot: 'https://api.parse.com/1/classes/Person'
});

var andrew = new Person({ 'name':'Andrew' });
andrew.save(null, {   
  success: function(model, response) {
    alert('success');
  },
  error: function(model, response) {
    alert('failure');
  }
});
{% endhighlight %}

### <a id="save">save</a>

The first argument to `save` are the *additional* attributes to set before the ajax call is made. I said *additional*, because they are in *addition* to the attributes already set. In my example, the first argument to `save` is `null`, because I've already set all the attributes before calling `save`. But the following code would be equivalent:

{% highlight javascript %}
var andrew = new Person();
andrew.save({ 'name': 'Andrew' }, { success: ... });
{% endhighlight %}

When the ajax call succeeds, the `success` handler will be called; otherwise, the `error` handler will be called.

*Caveat:* if you try the code out in the [playground](../apps/playground/playground.html), you'll find that your requests will be denied. The reason is that my backend needs to see some authentication headers. I'll show you how to add these, but they are unique to the needs of my backend:

{% highlight javascript %}
andrew.save(null, {
  headers: {
    'X-Parse-Application-Id': '60sUVK8j2f3IVU8Ex5cD1tqz9q6wdJFz0QBBjSWm',
    'X-Parse-REST-API-Key': 'GfUacynAXXbpzS6ciF8nc8cf0I9cgisKPWCr0WUA'
  },
  success: ..., failure: ...
});
{% endhighlight %}

The headers are only important if you want to try out the code with the backend I set up. In your own backend, likely you'll need something similar, to ensure that the requests come from an authenticated source. It's not the intention of this tutorial to show you how to set up your backend, so let's just ignore them in our discussion.

### <a id="id">`id` and `idAttribute`</a>

When a `Backbone` `Model` is persisted on the server for the first time, the server assigns an `id` to the instance. 

{% highlight javascript %}
var andrew = new Person({ name: 'Andrew' });
alert(andrew.id); // returns `undefined`
andrew.save(null, {
  success: function(model, response) {
    alert(andrew.id); // returns some string
  }
});
// Don't try the code above yet; it does not yet work.
{% endhighlight %}

What is this `id` attribute and why is it needed?

The `id` attribute is important because the server needs to understand how the instance you just saved maps to an instance in the database. Without `id`, it is impossible for the client to uniquely identify the instance on the server. The client cannot simply use the name, e.g. `Andrew`, to identify the person because there could be more than one `Person` in the database that is named `Andrew`.

The client gets its `id` from the server's response. This is an requirement on the implementation of your server: the response to `save` needs to contain `{ id: "..." }`. The `id` can be any string, as long it uniquely identifies a database entry on your server.

All database tables have some kind of primary key that acts as `id`, but it may or may not be called as `id`. For mongodb, it's called `_id`, and for sqlite it's `rowid`. It would be great if Backbone provides a mapping mechanism so that the server can just return what is natural, e.g. `_id` or `rowid`, and the client maps it to `id`.

And there is. This is the `idAttribute` property on the `Model`. My database collection uses `objectId` and I want Backbone maps it to `id`:

{% highlight javascript %}
var Person = Backbone.Model.extend({
  urlRoot: 'https://api.parse.com/1/classes/Person',
  idAttribute: 'objectId'
});

var andrew = new Person({ 'name':'Andrew' });
andrew.save(null, {   
  headers: ...,
  success: function(model, response) {
    alert(andrew.id);
  }
});
{% endhighlight %}

Now this should work. Basically, `idAttribute` allows the server response to omit `id`, as long as it contain an `id` equivalence, as specified by `idAttribute`.

### <a id="destroy">destroy</a>

calling `destroy` on a model deletes it from the server.
{% highlight javascript %}
andrew.destroy();
{% endhighlight %}

### <a id="fetch">fetch</a>

Once your data are saved, you can read them back later. To accomplish this, you use `fetch`:

{% highlight javascript %}
var someone = new Person({ objectId: andrew.id });
someone.fetch({
  headers: ...,
  success: function(model, response) {
    alert(someone.get('age')); // returns 28
  }
});
{% endhighlight %}

Normally, you would use `id`, rather than `objectId`, but my backend requires `objectId`.

One common mistake with `fetch` is that people forget that it is asynchronous:

{% highlight javascript %}
someone.fetch();
alert(someone.get('age')); // return undefined
{% endhighlight %}

People often mistakenly think that after calling `fetch`, the model should be populated with data; in reality, due to the asynchronous nature of JavaScript, you can only make the assumption within `fetch`'s `success` callback.

### <a id="url">`url` and `urlRoot`</a>

We've used `urlRoot` to inform `save`, `fetch` and `destroy` where the data are located on the server. You might be surprised to learn that the ajax requests are not necessarily sent to the same url as `urlRoot`.

When your `Model` is saved for the first time, `Backbone` issues a `POST` to the collection address, i.e. `\Person`. Let's say you are making some additional changes after your initial `save`, and you are calling `save` again. This time, `Backbone` will detect your model is not new anymore, because your model has an `id`. In a typical `ReST` design, `Backbone` will send `POST` for creating an object, and send `PUT` for modifying an existing object. `Backbone` respects that design and it will issue a `PUT` to the member address, i.e. `\Person\[id]`.

{% highlight javascript %}
andrew = new Person();
andrew.save({ age: 27 }, {
  // first save: POST to /Person
  success: function(model, response) {
    andrew.save({ age: 28 });
    // second save: PUT to /Person/[id]
  }
});
{% endhighlight %}

Similarly, `fetch` would issue GET calls to /Person/[id], and `destroy` would issue DELETE calls to /Person/[id].

In summary, this is how `Backbone` model CRUD operations map to ajax request:

-   create → POST   /collection
-   read → GET   /collection/id
-   update → PUT   /collection/id
-   delete → DELETE   /collection/id

The mapping can also be remembered as follows. If your model is new, i.e. has not been saved before,  the only operation you can do is to CREATE. So when a model is new, its `url` is /collection. Otherwise, if a model has been persisted already, the only operations you can do are GET, PUT, and DELETE, so its `url` is /collection/id. This logic is encapsulated in the `url` method on `Backbone` `Model`.

{% highlight javascript %}
andrew = new Person();
alert(andrew.url()); 
// returns /Person because the model is new
andrew.save({ age: 27 }, { 
  success: function(model, response) {
    alert(andrew.url());
    // return /Person/[id] because the model is not new
  }
}
{% endhighlight %}

`url` is frequently confused with `urlRoot`. The difference between the two is subtle but important. `url` decides at runtime whether to append `id`, while `urlRoot` just plainly returns the collection address. Because `url` is *smart*, it should rarely be overwritten and should be treated as a method. Meanwhile, because `urlRoot` is *dumb*, it should be treated as a property that returns the address of the collection. Note that it's the address of the *collection*, not the address of the individual element within the collection. In the example, `https://api.parse.com` is where my server is, and `/1/classes/Person` is where the `Person` collection is exposed at. 

`urlRoot` is wherever you set up your backend for this `Person` collection, and it does not have to be `https`. It can start with `http`, or it can even be a relative URL like `/Person`.

Consequently, you should always extend a `Model` by assigning to its `urlRoot` property and never to the `url` method.

`Backbone` is not opinionated on the difference between `urlRoot` and `url`, and that has caused much confusion. `Backbone` will tolerate code that uses `urlRoot` and `url` interchangably:

{% highlight javascript %}
var Person = Backbone.Model.extend({
  url: "/Person"
});

var andrew = new Person();
andrew.save();
{% endhighlight %}

Will the code work? To a sane person, the above code seems problematic, because `url` is not a method, i.e. `function() { return '/Person'; }`. But it works, and it will actually persist `andrew` to the server. How? 

The way `Backbone` deals with `url` is that it will test `url`'s type. If it's a function, `Backbone` will call the function and use the return value as the url; if it's not a function, `Backbone` will just get its value. In the example above, it will work because `Backbone` is smart enough to figure out you want to use `url` as a value.

Why is this bad? Imagine now you need to delete `andrew` on the server. You call `andrew.destroy()`. Because `url` is fixed at `/Person`, `DELETE` will be sent to `/Person` rather than `/Person/[id]`. If your backend can handle that, it still works, but it is certainly a violation of the most common ReST design pattern which is what the default Backbone mapping.

For good sanity, please adopt the following:
-   Treat `url` as a method; it should not be overwritten.
-   Treat `urlRoot` as an attribute; when used outside of `Collection`, it should always be overwritten.

If possible, you should design your backend according to the mapping above. In the rare event that is not possible, your other option is to change the above mapping in `Backbone`. `Backbone.sync` is the method you need to override. We will not go into that in this tutorial.

# <a id="events">Events</a>

Let's say we are keeping track of both the `yearOfBirth` and `age` of a `Person` as attributes on the model.

{% highlight javascript %}
var Person = Backbone.Model.extend({
  defaults: {
    age: 28
    yearOfBirth: 1983
  }
});
{% endhighlight %}

Clearly, the `age` and `yearOfBirth` are related; one is a function of the other. It would be great if `age` automatically updates when `yearOfBirth` changes, and `yearOfBirth` automatically changes when `age` changes.

{% highlight javascript %}
andrew.set('age', 5); 

// clearly, andrew is born 5 years ago,
// but 'yearOfBirth' will not automatically update itself
{% endhighlight %}

This is where `Events` come in. Every time an attribute changes in `Backbone`, an event of the name `change:[attr]` is triggered. The model can listen to that change event, and run some logic when that happens.

{% highlight javascript %}
var Person = Backbone.Model.extend({
  defaults: ...,
  initialize: function() {
    this.on('change:age', this.updateYearOfBirth, this);
  },

  updateYearOfAge: function() {
    this.set('yearOfBirth', 2012 - this.get('age'));
  }
});
{% endhighlight %}

The above code sets up the model to be observing on the `change:age` event. When `age` is changed, the callback `updateYearOfBirth` is called. And the callback updates the `yearOfBirth`.

{% highlight javascript %}
andrew.set('age', 5); 
andrew.get('yearOfBirth'); // returns 2007
{% endhighlight %}

There is a `change:[attr]` event for every attribute. You can similarly set up the observer for `yearOfBirth` change, and update `age` accordingly. This is left as an exercise for the reader. (I've always wanted to say that.)

There is also a catch-all `change` event that is triggered for any change in any attribute of the model. Other model events of interest include:

-   `destroy` →  when a model is destroyed.
-   `sync` → triggers whenever a model has been successfully synced to the server.
-   `error` → when a model's validation fails, or a save call fails on the server.
-   `all` → catch-all event for any of the above event, including `change`.

Use `on` to observe any model event. You can use `off` to unsubscribe from an event change. Please refer to the [Events](events.html) chapter for more details.