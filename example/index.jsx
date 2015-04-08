var React = require('react')
var Carousel = require('../js/Carousel')

var SampleComponent = React.createFactory(React.createClass({
  render: function () {
    return (
      <div style={{ width: 320 }}>
        <Carousel>
          <img src="http://www.fillmurray.com/300/300" />
          <img src="http://www.fillmurray.com/300/299" />
          <img src="http://www.fillmurray.com/300/298" />
          <img src="http://www.fillmurray.com/300/301" />
          <img src="http://www.fillmurray.com/300/302" />
        </Carousel>
      </div>
    )
  }
}))

React.render(SampleComponent(), document.getElementById('example'))
