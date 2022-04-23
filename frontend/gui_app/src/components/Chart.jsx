import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData,
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: false,
   
  }

  render(){
    return (
      <div className="chart">

<Bar
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text: 'Czas odczytywania danych',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
          
        }
        />


        
      </div>
    )
  }
}

export default Chart;