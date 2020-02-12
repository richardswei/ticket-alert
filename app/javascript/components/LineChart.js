import React, { Component } from "react";
// base css

class LineChart extends Component {
  
  componentDidMount() {
    this._renderChart();
  }

  _renderChart() {

    const data = this.props.data;
    const times = data.map((d) => new Date(d.time).setHours(0, 0, 0, 0))
    const prices = data.map((d) => d.price);
    times.unshift("x");
    prices.unshift("Price");
    
    const axis = {
      y: {
        tick: {
          format: function(x) {
            return "$"+x;
          }
        }
      },
      x: {
        type: "timeseries",
        tick: {
          rotate: 45,
          format: "%e %b"
        }
      }
    };
    const point = {
      show: false    
    };

    bb.generate({
      bindto: "#chart",
      padding: {right:40},
      data: {
        columns: [times,prices],
        type: "line",
        x: "x",
      },
      axis: axis,
      point: point
    });
  }

  render() {
    return <div id="chart" />;
  }
}

export default LineChart