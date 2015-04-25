var React = require('react')

var Swipeable = require('react-swipeable')

var Carousel = React.createClass({
  getInitialState: function () {
    return {
      prevIndex: 0,
      currentIndex: 0,
      itemWidths: Array(this.props.children.length),
      itemStart: Array(this.props.children.length),
      containerWidth: 0,
      canceled: false,
      delta: 0
    };
  },

  componentDidMount: function () {
    var itemWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var count = React.Children.count(this.props.children);
    var totalWidth = itemWidth * count;
    var startPos = widths.reduce(function (total, width) {
      total.push(total[total.length - 1] + width);
      return total;
    }, [0])

    this.setState({
      itemWidths: widths,
      itemStart: startPos,
      containerWidth: totalWidth
    })
  },

  addResistance: function (delta) {
    return delta * (1 - parseInt(Math.sqrt(Math.pow(delta, 2)), 10) / 1000);
  },

  resetState: function (index, imageMoveIndex) {
    this.setState({
      prevIndex: imageMoveIndex,
      currentIndex: index,
      delta: 0,
      canceled: false
    });
  },

  doMoveImage: function (_, x, y) {
    var index = this.state.currentIndex;
    var imageMoveIndex = this.state.currentIndex;

    if (Math.abs(y) > Math.abs(x)) {
      return this.resetState(index, imageMoveIndex);
    }

    if (this.state.canceled) {
      return this.resetState(index, imageMoveIndex);
    }

    if (x < 0) {
      if (index > 0) {
        index = index - 1;
        imageMoveIndex = index;
      }
    } else if (x > 0) {
      if (index < this.props.children.length - 1) {
        index = index + 1;
        imageMoveIndex = imageMoveIndex;
      }
    }

    return this.resetState(index, imageMoveIndex);
  },

  prevImageScroll: function (e, delta) {
    this.setState({
      delta: this.addResistance(delta),
      canceled: this.state.canceled || Math.abs(delta) < Math.abs(this.state.delta)
    })
  },

  nextImageScroll: function (e, delta) {
    this.setState({
      delta: 0 - this.addResistance(delta),
      canceled: this.state.canceled || Math.abs(delta) < Math.abs(this.state.delta)
    })
  },

  renderIndicator: function() {
    var indicator = [];
    var count = React.Children.count(this.props.children);
    for (var i = 0; i < count; i++) {
      if (this.state.currentIndex === i) {
        indicator.push(<li className="active" key={i}></li>);
      }
      else {
        indicator.push(<li key={i}></li>);
      }
    }

    return (
      <ul className="carousel-indicator">
        {indicator}
      </ul>
    );
  },

  render: function () {
    var delta = this.state.delta +
      (0 - this.state.itemStart[this.state.currentIndex])

    var transition = 'all 250ms ease-out'

    var clear = (<div style={{height: 0, visibility: 'hidden', clear: 'left'}}></div>)

    var swipeContainerChildren = this.props.children.map(function (item, i) {
      return (
        <div key={i} style={{float: 'left'}}>
          {item}
        </div>
      )
    })

    var swipeContainer = (
      <Swipeable onSwipingRight={this.prevImageScroll}
        onSwipingLeft={this.nextImageScroll}
        onSwiped={this.doMoveImage}
        ref="carouselContainer"
        style={{
          WebkitTransform: 'translate3d(' + delta + 'px, 0, 0)',
          transition: this.state.delta === 0 ? transition : 'none',
          width: this.state.containerWidth
        }} >
          {swipeContainerChildren}
          {clear}
      </Swipeable>
    )

    return (
      <div {...this.props} style={{overflow: 'hidden', width: '100%'}}>
        {swipeContainer}
        {this.props.showIndicator && this.renderIndicator()}
      </div>
    )
  }
})

module.exports = Carousel
