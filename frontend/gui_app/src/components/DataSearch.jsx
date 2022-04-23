import React from 'react';
import CustomLayout from '../containers/Layout';
import { Redirect, Link } from 'react-router-dom';
import './documents.css';
import { Button } from 'antd';


class DataSearch extends React.Component {
  
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      responseStatus: 0,
      insurancesCompany : [],
      userToken: localStorage.getItem('token'),
      insurer:'',
      policy:[],
      policy_number:'',
      search_key:''

      
    }
    this.handleSearchInsurer = this.handleSearchInsurer.bind(this);
    this.handleSearchPolicyNumber = this.handleSearchPolicyNumber.bind(this);
  }
//   componentDidMount() {
//     this.fetchPolicy();
//     console.log(this.state.policy)
// }



searchData(e) {
  
    var bearer = 'Bearer ' + this.state.userToken;
   
    if(this.state.insurer.length!=0 && this.state.insurer.length!=undefined) {
      this.state.search_key='search='+this.state.insurer
    }
    else {
      this.state.search_key='search='+this.state.policy_number
    }
    console.log(this.state.search_key);
    fetch('http://127.0.0.1:8000/api/policy/?'+this.state.search_key, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': bearer,
        },
        body: null
    }).then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Error during fetch user data - response to ');
        }
    })
        .then((jsonData) => this.setState({
            policy: jsonData,
            policy_validity_from:jsonData.policy_validity_from
            
        }))
        .catch((error) => {
            console.log('Error during fetch user data');
        });

}

handleSearchInsurer(event) {
  this.setState(
    {
     
      insurer:event.target.value

  });
}

handleSearchPolicyNumber(event) {
  this.setState(
    {
     
      policy_number:event.target.value

  });
}
// cute(){
//   var dateToCut=this.state.policy_validity_from
//   if(dateToCut.length!=0){
//     insurance_period_from.substring(0,9)
//   }
// }

  render() { 
    if(this.state.userToken == undefined && this.state.userToken==null) {
      return <Redirect to='/' />;
    }
    return (
     

      <CustomLayout>
        <div className="search" >
        
  <label>
    Ubezpieczający: 
    <input id="tekst" type="text" value-length='5'  value={this.state.insurer} onChange={this.handleSearchInsurer}/>
  </label>
  <label>
    Numer polisy: 
    <input id="tekst" type="text" value-length='5'  value={this.state.policy_number} onChange={this.handleSearchPolicyNumber}/>
  </label>
   <Button onClick={(e)=>this.searchData(e)} id="przycisk">Wyszukaj</Button>
          <hr></hr>
        </div>
        <div className="table-responsive">
                    <table className="table table-hover bg-warning p-5 mx-auto w-auto">
                        <thead>
                            <tr>
                                <th scope="col">LP</th>
                                <th scope="col">Numer polisy</th>
                                <th scope="col">Nazwa towarzystwa</th>
                          
                                <th scope="col">Ubezpieczający</th>
                                <th scope="col">Ważnosć polisy od</th>
                                <th scope="col">Ważnosć polisy do</th>
                                <th scope="col">Marka pojazdu</th>
                                <th scope="col">Model pojazdu</th>
                                <th scope="col">Rok produkcji</th>
                                <th scope="col">Typ pojazdu</th>
                                <th scope="col">Numer VIN</th>
                                <th scope="col">Pojemność</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.policy.map((policy, index) =>
                                <tr key={index}>
                                   <td> {index + 1}</td>
                                   <td> {policy.policy_number}</td>
                                    <td> {policy.name_of_the_insurance_company}</td>
                                  
                                    <td> {policy.insurer}</td>
                                    <td> {policy.policy_validity_from}</td>
                                    <td> {policy.policy_validity_until}</td>
                                    <td> {policy.vehicle_brand}</td>
                                    <td> {policy.vehicle_model}</td>
                                    <td> {policy.vehicle_year_of_production}</td>
                                    <td> {policy.vehicle_type}</td>
                                    <td> {policy.vin_number}</td>
                                    <td> {policy.capacity}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
      </CustomLayout>
      
    )
  }
}

const mapStateToProps=state=>({
  lists: state.lists
});

export default DataSearch;