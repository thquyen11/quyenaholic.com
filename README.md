# create-reactype-thquyen11

* Boilterplate of react-redux with typescript
* Including sample code and explantion comment of most crucial packages in react project
* Main dependencies in this repository:
    1. react, react-dom, react-router: for creating React components
    2. redux, redux-thunk: for creating Redux store and redux middleware
    3. enzyme: for testing
    4. topojson, d3: for data visualization

# How to use

1. Clone this repository
2. Download dependencies ```npm i```
3. Start building your awesome app

*For more React features codebase, please check my side project [freecodecamp-frontend](https://github.com/thquyen11/freecodecamp-frontend)*

# React-Redux overview

## What is React.js

* React is a framework that allow you to render HTML page from pure javascript in client side via a ReactDOM. It different from traditional server-side rendering (SSR) where the whole HTML is rendered and send from server to client machine, React in the other hand only require data (JSON, text) from server API, then it render the HTML page directly on client machine and populate data into page by javascript code. By doing this, it improve the UX, event reaction by limit the number of call to server and the amount of data transmit between server and client.
* The main principal of React is reusable components, instead of create every HTML page. You simply create separate reusable componenets (i.e: navbar, button, etc...) then inject into the HTML according to the design.
* I personally like this approaching more than traditional HTML rendering, because as a backend developer this component idea is similar to Object-Oriented Programming. Thinking about each React component as a class, you will inject (~ create object from class) and modify some features like color, text, etc.. (~ override class method, property) as you wish.

## What is Redux
* Originially, each React componenet has a store to keep the component states. Everytime the states are updated (user input change,etc...), React will automatically re-render the component in order to update the HTML page with new information
* However, this approaching has a big flaw. As your website grows up, the number of components also grow in number. And at some point, you definately lost in the maze of components' states controlling. In order to solve this problem, Redux introduce a incredible approach by creating only one center store in the Root componenets, whenver a state is updated, store transmit the new state to *connected components*. Pay attention on *connected components*, the beauties of Redux are:
    1. We can decide what states will update a specific component. By doing this, User A update his Profile page won't re-render User B who is reading an article.
    2. Only update *connected component* will improve page performance by not update the whole page everytime.

## Authors

* **Quyen Ho**

## Inspiration

* [create-react-app](https://github.com/facebook/create-react-app)
* [freecodecamp-frontend](https://github.com/thquyen11/freecodecamp-frontend)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details






