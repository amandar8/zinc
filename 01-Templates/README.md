# Creating HTML Elements with Templates

We're going to step through the process of implementing some simple templates or components for our framework. Components are small, reusable chunks of markup and functionality that you can define and use in your web application. Let's begin by working on a user component for a list of users.

## 1) Creating elements from dynamic data

We'll start off by doing things the way we're used to doing them in vanilla javascript: grab a bunch of data from somewhere, create some HTML elements, plop the data into the elements, and stick them in an existing element.

Using the provided index.html and zinc.js files, implement the `populateList` function so that it takes the provided user data and adds them to the list with id `z-user-list`. (If you need a refresher, check out [Document.createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) and [Node.appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) on MDN.)

## 2) Creating elements with templates

So, that's all fine, but once things get more complicated than a single element with some data in it, they're going to get... complicated. That's a lot of nested createElement and appendChild and whatnot. So... since we're wanting to write some html and stick some data in it, let's just do that. Let's write a string with our HTML in it and use template literals to fill in the data!

Change your `populateList` function to use another function, `renderTemplate`. `renderTemplate` should take two arguments: a template string to fill in, and an object with the image, first name, last name, location, and email in it. The template string should looks something like this:

```html
    <li class="user">
        <img class="user-photo" src="{{ photo }}" alt="Photo of {{ firstName }} {{ lastName }}">
        <div class="user-name">{{ firstName }} {{ lastName }}</div>
        <div class="user-location">{{ city }}, {{ state }}</div>
        <div class="user-email">{{ email }}</div>
    </li>
```

and you'll be filling it in with data that looks like this: 

```js
    const data = {
        photo: user.picture.thumbnail,
        firstName: user.name.first,
        lastName: user.name.last,
        city: user.location.city,
        state: user.location.state,
        email: user.email
    };
```

Append the filled-in template html returned from the `renderTemplate` function to the `z-user-list` element to make the magic happen! (You'll want to look at [String.replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) with [regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) and [insertAdjacentHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML))

## 3) Templates with nested data

For bonus points, implement your `renderTemplate` function to just accept the raw `user` object that you get back in your fetched list of user data. This means that you'll have to figure out a way not just to replace the {{ variable }} with a single object's key value, but to drill down into some data.nested.object.value and replace {{ nested.object.value }} with the right thing. In that case, your template will look like:

```html
<li class="user">
    <img class="user-photo" src="{{ picture.thumbnail }}" alt="Photo of {{ name.first }} {{ name.last }}">
    <div class="user-name">{{ name.first }} {{ name.last }}</div>
    <div class="user-location">{{ location.city }}, {{ location.state }}</div>
    <div class="user-email">{{ email }}</div>
</li>
```
## 4) Loading HTML template files

Finally, instead of including our HTML template as a string in our javascript file, let's give renderTemplate the name or URL of an HTML file, and load that in on the fly. So, your template will look the same, but it'll be in user.html, and your call for each new user list item will look something like renderTemplate('user', user).