var React = require('react')

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Swipeable = React.createFactory(require('react-swipeable'))

var Carousel = React.createClass({
  getInitialState: function () {
    return {
      prevIndex: 0,
      currentIndex: 0,
      itemWidths: Array(this.props.children.length),
      itemStart: Array(this.props.children.length),
      containerWidth: 0,
      delta: 0
    }
  },

  componentDidMount: function () {
    var widths = Array.prototype.map.call(
      React.findDOMNode(this.refs.carouselContainer).children,
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
      itemWidths: widths,
      itemStart: startPos,
      containerWidth: totalWidth
    })
  },

  addResistance: function (delta) {
    return delta * (1 - parseInt(Math.sqrt(Math.pow(delta, 2)), 10) / 1000)
  },

  doMoveImage: function (_, x) {
    var index = this.state.currentIndex
    var imageMoveIndex = this.state.currentIndex
    if (x < 0) {
      if (index > 0) {
        index = index - 1
        imageMoveIndex = index
      }
    } else if (x > 0) {
      if (index < this.props.children.length - 1) {
        index = index + 1
        imageMoveIndex = imageMoveIndex
      }
    }

    this.setState({
      prevIndex: imageMoveIndex,
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

    var transition = 'all 250ms ease-out'

    var clear = React.createElement('div', {
      key: 'clear',
      style: {
        height: 0,
        visibility: 'hidden',
        clear: 'left'
      }
    })

    var swipeContainer = Swipeable({
      onSwipingRight: this.prevImageScroll,
      onSwipingLeft: this.nextImageScroll,
      onSwiped: this.doMoveImage,
      ref: 'carouselContainer',
      style: {
        WebkitTransform: 'translate3d(' + delta + 'px, 0, 0)',
        transition: this.state.delta === 0 ? transition : 'none',
        width: this.state.containerWidth + 'px'
      }
    }, this.props.children.map(function (item, i) {
      return React.createElement('div', {
        key: i,
        style: { float: 'left' }
      }, item)
    }).concat(clear))

    return React.createElement('div', _extends({}, this.props, {
      style: {
        overflow: 'hidden',
        width: '100%'
      }
    }), swipeContainer)
  }
})

module.exports = Carousel
