var React = require('react')
var Carousel = require('../js/Carousel')

var SampleComponent = React.createClass({
  render: function () {
    return (
      <div style={{ width: 320 }}>
        <Carousel>
          <img src="http://www.fillmurray.com/300/300" key={1} />
          <img src="http://www.fillmurray.com/300/299" key={2}  />
          <img src="http://www.fillmurray.com/300/298" key={3}  />
          <img src="http://www.fillmurray.com/300/301" key={4}  />
          <img src="http://www.fillmurray.com/300/302" key={5}  />
        </Carousel>
      </div>
    )
  }
});


var SampleComponentWithIndicator = React.createClass({
  render: function () {
    return (
      <div style={{ width: 320 }}>
        <Carousel showIndicator={true}>
          <img src="http://www.fillmurray.com/300/300" key={1} />
          <img src="http://www.fillmurray.com/300/299" key={2}  />
          <img src="http://www.fillmurray.com/300/298" key={3}  />
          <img src="http://www.fillmurray.com/300/301" key={4}  />
          <img src="http://www.fillmurray.com/300/302" key={5}  />
        </Carousel>
      </div>
    )
  }
});

React.render(<SampleComponent />, document.getElementById('example'))
React.render(<SampleComponentWithIndicator />, document.getElementById('example1'))
