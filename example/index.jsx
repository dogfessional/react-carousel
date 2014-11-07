var React = require('react')
var Carousel = require('../')

var SampleComponent = React.createClass({
  render: function () {
    return (
      <div style={{ width: 380 }}>
        <Carousel>
          <img src="/306x306.png" />
          <img src="/306x306.png" />
          <img src="/306x306.png" />
          <img src="/306x306.png" />
          <img src="/306x306.png" />
        </Carousel>
      </div>
    )
  }
})

React.renderComponent(SampleComponent(), document.body)
