# Carousel

> A carousel for the mobile web

## Install

```sh
npm install react-carousel
```

## Demo

Check it out on a mobile device:

http://dogfessional.github.io/react-carousel/

## Use

```js
var Carousel = require('react-carousel');

var SampleComponent = React.createClass({
  render: function () {
    return (
      <Carousel>
        <img src="http://fillmurray.com/300/300" />
        <img src="http://fillmurray.com/600/300" />
        <img src="http://fillmurray.com/100/300" />
        <img src="http://fillmurray.com/400/300" />
        <img src="http://fillmurray.com/200/300" />
      </Carousel>
    )
  }
});
```

# Props

**showIndicator**

_Type:_ Boolean _Defaults:_ `undefined`

To make indicator show up properly, add styles for `.carousel-indicator` and it's descendants accordingly.

# Children

The children in carousel are used to provide a carousel-like experience by allowing
people to flip through each element one by one.

# Dependency

[react-swipeable](https://github.com/dogfessional/react-swipeable)

## Development

Initial set up, run:

    npm install

For watch on files, live reload, JSX transpiling and browserify, run:

    gulp

# License

MIT
