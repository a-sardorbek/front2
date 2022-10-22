import React from "react";
import Chart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Umumiy arizalar soni",
          data: [100, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "Yakunlangan arizalar soni",
          data: [11, 32, 17, 32, 34, 52, 41],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2022-09-19T00:00:00.000Z",
            "2022-09-19T01:30:00.000Z",
            "2022-09-19T02:30:00.000Z",
            "2022-09-19T03:30:00.000Z",
            "2022-09-19T04:30:00.000Z",
            "2022-09-19T05:30:00.000Z",
            "2022-09-19T06:30:00.000Z",
          ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="area"
              height={350}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ApexChart;
