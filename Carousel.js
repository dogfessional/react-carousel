var React = require('react/addons')
var cx = React.addons.classSet

var Swipeable = require('react-swipeable')

var Carousel = React.createClass({
  getInitialState: function () {
    return {
      currentIndex: 0,
      itemStart: Array(this.props.children.length),
      containerWidth: 0,
      delta: 0
    }
  },

  componentDidMount: function () {
    var widths = Array.prototype.map.call(
      this.refs.carouselContainer.getDOMNode().children,
      function (node) {
        return node.offsetWidth
      }
    )

    var totalWidth = widths.reduce(function (a, b) { return a + b }, 0)
    var startPos = widths.reduce(function (total, width) {
      total.push(total[total.length - 1] + width)
      return total
    }, [0])

    this.setState({
      itemStart: startPos,
      containerWidth: totalWidth
    })
  },

  addResistance: function (delta) {
    return delta * (1 - parseInt(Math.sqrt(Math.pow(delta, 2)), 10) / 1000)
  },

  moveImage: function (e, x, y) {
    var index = this.state.currentIndex
    if (x > 100) {
      if (this.state.delta > 0) {
        if (index > 0) {
          index = index - 1
        }
      } else if (this.state.delta < 0) {
        if (index < this.props.children.length - 1) {
          index = index + 1
        }
      }
    }

    this.setState({
      currentIndex: index,
      delta: 0
    })
  },

  prevImageScroll: function (e, delta) {
    this.setState({
      delta: this.addResistance(delta)
    })
  },

  nextImageScroll: function (e, delta) {
    this.setState({
      delta: 0 - this.addResistance(delta)
    })
  },

  render: function () {
    var delta = this.state.delta +
      (0 - this.state.itemStart[this.state.currentIndex])

    var cxContainer = cx({
      'carousel-container': true,
      'animate-carousel': this.state.delta === 0
    })

    return React.DOM.div(
      { className: 'carousel' },
      Swipeable({
        onSwipingRight: this.prevImageScroll,
        onSwipingLeft: this.nextImageScroll,
        onSwiped: this.moveImage,
        className: cxContainer,
        ref: 'carouselContainer',
        style: {
          '-webkit-transform': 'translateX(' + delta + 'px)',
          width: this.state.containerWidth + 'px'
        }
      }, this.props.children.map(function (item, i) {
        return React.DOM.div({ key: i, className: 'carousel-item' }, item)
      }))
    )
  }
})

module.exports = Carousel
