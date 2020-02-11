import React, { Component } from "react";
// component and styles
import BillboardChart from "react-billboardjs";
import "react-billboardjs/lib/billboard.css";

class LineChart extends Component {
  render() {
    const data = this.props.data;
    const times = data.map((d) => new Date(d.time).setHours(0, 0, 0, 0))
    const prices = data.map((d) => d.price);
    times.unshift("x");
    prices.unshift("Price");
    const chart_data = {
      x: "x",
      columns: [times,prices]
    };
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
          format: "%e %b"
        }
      }
    };
    const point = {
      show: false    
    }
    return (
      <BillboardChart
        data={chart_data}
        axis={axis}
        point={point}
      />
    );
  }
}
export default LineChart