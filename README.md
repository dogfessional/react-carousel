# Carousel

> A carousel for the mobile web

## Install

    npm install react-carousel

## Use

    var Carousel = require('react-carousel')

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
    })

# Props

Carousel does not take any props.

# Children

The children in carousel are used to provide a carousel-like experience by allowing
people to flip through each element one by one.

# Dependency

[react-swipeable](https://github.com/dogfessional/react-swipeable)

# License

MIT
