# Creating and Rendering Components

Now that we know how to create templates and use them to insert rendered HTML into our page, let's move on to the next step, and use what we've learned to build some custom components.

## 1) Simple Component

Our components will be tags that we define ourselves, and attach a template and data object to. We're going to start by replacing our starter user with an HTML element that we're just going to call `<user-item>`. All we want to do is take this user data:

```js
    const userData = {
        picture: {
            thumbnail: 'https://f4.bcbits.com/img/0001142378_10.jpg'
        },
        name: {
            first: 'Jack',
            last: 'Burton'
        },
        location: {
            city: 'San Francisco',
            state: 'CA'
        },
        email: 'jack.burton@example.com'
    };
```

then render it into our `user.html` template, and insert that HTML into the `user-item` tag on our page. (You'll want to use [Document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) or something similar to grab the component element.)

## 2) Registering Components

We're about to take our first step into making Zinc a framework that we can use with external templates and data, instead of baking them in to our javascript. You'll see that there are two javascript files now: `zinc.js` and `user.js`. We'll keep working in `zinc.js` to build up our library, and you'll see that we've created a global object called `Zinc` at the top of it. This will allow us to expose the Zinc framework to the rest of our application, and use it in other files.

Here's what we want to do: use Zinc to register our component, telling it what the element name is that we're inserting our content into, what template to use, and where the data is coming from. Let's define a `Zinc.registerComponent` function that does that.

```js
    Zinc.registerComponent = function(elementName, templateFile, dataObject) {
        ...
    }
```

After our `registerComponent` function is declared, we can then put a function (called, say, `renderComponents`) into our `init` function that runs when the page loads (which is after all the javascript is loaded), and use that to automatically render the `<user-item>` element into our page. 

After we complete this step, you should be able to test it out by putting multiple `<user-item>` elements on the page—which will all render out our friend Jack's entry the same way. If you'd like to register some different components that display different data, just do that by giving another `elementName`, use the same template file, and give it the new data object you want it to use. Play around with it!

Bonus: See if you can go back to fetching five random users from the API, and register five different user components to display them.

## 3) Adding Functionality with a Controller

Displaying data in our components is nice, but we'd also like to define some custom functionality for the user item. We'll do that by passing in yet another argument to `registerComponent`, this time a callback function to set up the *controller* for our component. 

Let's create a controller function that toggles a highlight off and on our list item when we click it. All we're going to do is add a click event handler to the `<li>` element in the template that adds or removes a class (.hilight) to the item.

```js
    Zinc.registerComponent = function(elementName, templateFile, dataObject, controller) {
        ...
    }
```

Now, this is going to get tricky, so let's step through this. You're going to want to attach your controller directly to the element (the `<li>`) when you add it to the DOM. Let's say that whenever and however we create that element (*cough*DOMParser*cough*insertAdjacentElement*cough*), we'll just add our controller to it as the element.$controller. That way, you can access the element through `this` in your controller, and make it do whatever you want on a click event.

## 4) Simplifying registerComponent with a config object

Here's a relatively easy win for you. As of now, we're potentially passing four arguments to `Zinc.registerComponent`, and that's a bad code smell—it's just too many arguments to keep track of what they are and what order they should be in. SO! Instead of passing in a bunch of arguments (and I bet there will be more in the future), let's just pass in one configuration object to the function.

```js
    Zinc.registerComponent = function(configObj);

    Zinc.registerComponent({
        name: 'user-item',
        templateFile: 'user',
        data: userDataObject,
        controller: userController,
        // ... and so on
    });
```

Everything else should work the same—you're just simplifying the way you call the registration function, and setting it up to be more easily extended in the future.
