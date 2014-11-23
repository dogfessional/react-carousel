var React = require('react')

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

    var swipeContainer = Swipeable({
      onFlick: this.doMoveImage,
      onSwipingRight: this.prevImageScroll,
      onSwipingLeft: this.nextImageScroll,
      onSwiped: this.doMoveImage,
      className: 'carousel-container',
      ref: 'carouselContainer',
      style: {
        '-webkit-transform': 'translateX(' + delta + 'px)',
        transition: this.state.delta === 0 ? transition : 'none',
        width: this.state.containerWidth + 'px'
      }
    }, this.props.children.map(function (item, i) {
      return React.createElement('div', {
        key: i,
        className: 'carousel-item'
      }, item)
    }))

    return React.createElement('div', {
      className: 'carousel'
    }, swipeContainer)
  }
})

module.exports = Carousel
