import React from 'react';
import CustomLayout from '../containers/Layout';
import { Redirect, Link } from 'react-router-dom';
import './documents.css';
import Chart from './Chart';
import axios from "axios";

class ApplicationStatistics extends React.Component {
 
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      responseStatus: 0,
      insurancesCompany : [],
      userToken: localStorage.getItem('token'),
      chartData:{},
      reading_time:[],
      count_templates:[],
      template:[]
    }
  }



  componentWillMount(){
    // this.getchartData(); // this should be this.getChartData();
  
    axios.get("http://127.0.0.1:8000/api/dataforcharts/")
    .then(res=>{
      console.log(res);
      for(const dataObj of res.data){
       
        this.state.count_templates.push(parseInt(dataObj.sum_of_documents))
        this.state.reading_time.push(parseFloat(dataObj.avarage_time))
        this.state.template.push(dataObj.template)
        console.log(this.state.reading_time)
      }

    })
    .catch(err=>{
      console.log(err);
    });
    console.log(this.state.count_templates)

     this.getChartData();

   }
   getdata() {
   
   }
 
   getChartData(){
     // Ajax calls here
     this.setState({
       chartData:{
         labels: this.state.template,
         datasets:[
           {
             label:this.state.template,
             data:this.state.reading_time,
        
             backgroundColor:[
               'rgba(255, 99, 132, 0.6)',
               'rgba(54, 162, 235, 0.6)',
               'rgba(77, 206, 86, 0.6)',
               'rgba(75, 192, 192, 0.6)',
               'rgba(153, 102, 255, 0.6)',
               'rgba(54, 159, 64, 0.6)',
               'rgba(88, 99, 132, 0.6)'
             ]
           }
         ]
       },
       options:{
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
       
    
       
     });
   }
 
  render() {
    if(this.state.userToken == undefined && this.state.userToken==null) {
      return <Redirect to='/' />;
    }
    return (
      <CustomLayout>
        <Chart chartData={this.state.chartData} legendPosition="bottom"/>
      </CustomLayout>
   
        

    )
  }
}

const mapStateToProps=state=>({
  lists: state.lists
});

export default ApplicationStatistics;