import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Upload, message, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import CustomLayout from '../containers/Layout';
import './documents.css';
import axios from 'axios';
import DropdownList from 'react-widgets/lib/DropdownList';
import Dropdown from './DropDown';
import { Form, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';
import './DocumentsRegistration.scss';

//import LoginPage from './LoginPage'





class DocumentsRegistration extends React.Component {

  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      responseStatus: 0,
      insurancesCompany : [],
      userToken: localStorage.getItem('token'),
      file:'',
      text_from_documents:'',
      date: new Date(),
      data_pdf:[],
      value:'',
      insurance_period_from:'',
      insurance_period_up_to:'',
      insurer:'',
      policy_id:'',
      registration_number:'',
      vehicle_brand:'',
      vehicle_model:'',
      vehicle_type:'',
      vehicle_vin_number:'',
      vehicle_year_production:'',
      vehicle_engine_capacity:'',
      policy_number:'',
      value_submit:'',
      ins_data: [],
      email_ins:'',
      total:''

      

      
      
    }
    this.handleChangeInsurancePeriodFrom = this.handleChangeInsurancePeriodFrom.bind(this);
    this.handleChangeInsuranceUpTo = this.handleChangeInsuranceUpTo.bind(this);
    this.handleChangeInsurer = this.handleChangeInsurer.bind(this);
    this.handleChangeVehicleBrand = this.handleChangeVehicleBrand.bind(this);
    this.handleChangeVehicleModel = this.handleChangeVehicleModel.bind(this);
    this.handleChangeVehicleType = this.handleChangeVehicleType.bind(this);
    this.handleChangeVehicleVinNumber = this.handleChangeVehicleVinNumber.bind(this);
    this.handleChangeVehicleEngineCapacity = this.handleChangeVehicleEngineCapacity.bind(this);
    this.handleChangeVehicleYearProduction = this.handleChangeVehicleYearProduction.bind(this);
    this.handleChangePolicyNumber = this.handleChangePolicyNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
 
  

  state ={
    file:null,
    ins_data:[],
    ins_email:''
  }
  
  handleFile(e)
  {
    let files=e.target.files;
    this.setState({
      file:e.target.files[0]
    })
    console.warn("data file", files)
    console.log(e.target.files, "$$$$");
    console.log(e.target.files[0], "$$$$");

  }
  componentDidMount() {
    this.fetchInsurancesCompany();
    console.log(this.state.username)
    
}

fetchInsurancesCompany() {
    var url = 'http://127.0.0.1:8000/api/regextemplate/';
    var token = this.state.userToken;
    fetch(url, {
        method: 'GET',
        
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            authorization: token
        },
        body: null
    }).then((response) => {
      console.log(response)
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Error during fetch user data - response to ');
        }
      })
      .then((jsonData) => this.setState({
          insurancesCompany: jsonData
      }))
      .catch((error) => {
          console.log('Error during fetch user data');
          console.log(error);
      });
}




requestDataOfImage() {



  axios.get(`http://127.0.0.1:8000/data_from_documents/`)
    .then(res => {
      const data_pdf = res.data;
      this.setState({ data_pdf });
      console.log(data_pdf)
      this.setState({ 
        insurance_period_from: data_pdf.insurance_period_from,
        insurance_period_up_to: data_pdf.insurance_period_up_to,
        insurer:data_pdf.insurer,
        policy_id:data_pdf.policy_id,
        registration_number:data_pdf.registration_number,
        vehicle_brand:data_pdf.vehicle_brand,
        vehicle_model:data_pdf.vehicle_model,
        vehicle_type:data_pdf.vehicle_type,
        vehicle_vin_number:data_pdf.vehicle_vin_number,
        vehicle_year_production:data_pdf.vehicle_year_production,
        vehicle_engine_capacity:data_pdf.vehicle_engine_capacity,
        policy_number:data_pdf.policy_id,
        total:data_pdf.total
      });
  
   console.log(this.state.policy_number)
    
    })

};

handleUpload(e) 
  {


    var token = this.state.userToken;
    let form_data = new FormData();
    form_data.append('attachments', this.state.file , this.state.file.name)
    form_data.append('template', this.state.value_submit)
    let url = 'http://127.0.0.1:8000/data_from_documents/';
    axios.post(url, form_data, {
   
      headers: {
        'content-type': 'multipart/form-data',
       
       'Authorization': token
      }
      
    })
        .then(res => {
          console.log(res.data);  

        this.requestDataOfImage();
        })
        .catch(err => console.log(err));
     }

saveData(e) 
{
  let file=this.state.file
      let formdata=new FormData()
      let token=this.state.userToken
  
      formdata.append('name_of_the_insurance_company', this.state.value_submit)
      formdata.append('policy_number', this.state.policy_number)
      formdata.append('insurer', this.state.insurer)
      formdata.append('policy_validity_from', this.state.insurance_period_from)
      formdata.append('policy_validity_until', this.state.insurance_period_up_to)
      formdata.append('vehicle_brand', this.state.vehicle_brand)
      formdata.append('vehicle_model', this.state.vehicle_model)
      formdata.append('vehicle_year_of_production', this.state.vehicle_year_production)
      formdata.append('vehicle_type', this.state.vehicle_type)
      formdata.append('vin_number', this.state.vehicle_vin_number)
      formdata.append('capacity', this.state.vehicle_engine_capacity)
      formdata.append('attachment', this.state.file)
      formdata.append('reading_time', this.state.total)
      
      console.log(formdata)
      
      axios ({
        url:'http://127.0.0.1:8000/api/policy/',
        method:'POST',
        headers:{
          authorization: token
        },
        data:formdata
      }).then((res)=>{
  console.log(formdata)
      },(err)=>{
  
      })
}

  
  taskDetails(id) {
    this.props.history.push("/taskManager/" + id);
}


handleChangeInsurancePeriodFrom(event) {
  this.setState(
    {
      insurance_period_from: event.target.value,
    

  });
}

handleChangeInsuranceUpTo(event) {
  this.setState(
    {
     
      insurance_period_up_to:event.target.value

  });
}

handleChangeInsurer(event) {
  this.setState(
    {
     
      insurer:event.target.value

  });
}

handleChangeVehicleBrand(event) {
  this.setState(
    {
     
      vehicle_brand:event.target.value

  });
}

handleChangeVehicleModel(event) {
  this.setState(
    {
     
      vehicle_model:event.target.value

  });
}

handleChangeVehicleType(event) {
  this.setState(
    {
     
      vehicle_type:event.target.value

  });
}

handleChangeVehicleVinNumber(event) {
  this.setState(
    {
     
      vehicle_vin_number:event.target.value

  });
}

handleChangeVehicleYearProduction(event) {
  this.setState(
    {
     
      vehicle_year_production:event.target.value

  });
}

handleChangeVehicleEngineCapacity(event) {
  this.setState(
    {
     
      vehicle_engine_capacity:event.target.value

  });
}

handleChangePolicyNumber(event) {
  this.setState(
    {
     
      policy_number:event.target.value

  });
}



handleSubmit(event) {
  

  event.preventDefault();

  
}

handleChangeIns = event => {
  this.setState({ value_submit: event.target.value });
  
};

  render() 
  {
      if (this.state.userToken == undefined && this.state.userToken==null) {
      console.log("redirect")
      return <Redirect to='/' />;
   }
    return (
      <CustomLayout>
     <div className="template" >
       {this.state.text_from_documents}
       <form onSubmit={this.handleSubmit}>
      <h1>Wybierz szablon</h1>
        <br />
        <br />
        <Label for="exampleSelect"></Label>
        <select  class="form-control" id="exampleFormControlSelect1" value={this.state.value_submit} onChange={this.handleChangeIns}>     
        {this.state.insurancesCompany.map(item => (
              <option  key={item.id} value={item.template_name}>
                {item.template_name}
                
              </option>
            ))}
        </select>
        <br></br>
        <hr></hr>
        <Button color='primary' onClick={this.handleSubmit}>Zatwierdz szablon</Button>
      </form>
      <hr></hr>
    <br></br>
    <Label class="btn btn-default">
      <Input className='inputfile' type="file" accept=".pdf"  onChange={(e)=>this.handleFile(e)} />
      </Label>
      <button onClick={(e)=>this.handleUpload(e)} >Wczytaj dane dokumentu</button>
      </div>
      <div><hr></hr></div>
      <div className='naglowek'><h1>Dane z rejestracji dokumentu:</h1>
      <div>
      <div >
      <div >
      <form onSubmit={this.handleSubmit}>
        <label>
          <hr></hr>  
        </label>
        </form>
        <table className="table table-hover bg-warning p-5 mx-auto w-auto">
                        <thead>
                        <tr>
                                <td> Numer polisy:</td>
                                <td> <input type="text" value={this.state.policy_number} onChange={this.handleChangePolicyNumber} /></td>
                                <td> Ubezpieczający:</td>
                                <td> <input type="text" value={this.state.insurer} onChange={this.handleChangeInsurer} /></td>
                            </tr>
                        <tr>
                                <td> Ważności polisy od:</td>
                                <td> <input type="text" value={this.state.insurance_period_from} onChange={this.handleChangeInsurancePeriodFrom} /></td>
                                <td> Ważności polisy do:</td>
                               <td> <input type="text" value={this.state.insurance_period_up_to} onChange={this.handleChangeInsuranceUpTo} /></td>
                            </tr>
                            <tr>
                            <td> Marka pojazdu:</td>
                               <td> <input type="text" value={this.state.vehicle_brand} onChange={this.handleChangeVehicleBrand} /></td>
                               <td> Pojemność:</td>
                                <td> <input type="text" value={this.state.vehicle_engine_capacity} onChange={this.handleChangeVehicleEngineCapacity} /></td>
                            </tr>
                            <tr>
                                <td> Model pojazdu:</td>
                                <td> <input type="text" value={this.state.vehicle_model} onChange={this.handleChangeVehicleModel} /></td>
                                <td> Typ pojazdu:</td>
                               <td> <input type="text" value={this.state.vehicle_type} onChange={this.handleChangeVehicleType} /></td>
                            </tr>
                            <tr>
                                <td> Rok produkcji:</td>
                                <td> <input type="text" value={this.state.vehicle_year_production} onChange={this.handleChangeVehicleYearProduction} /></td>
                                <td> Numer VIN:</td>
                               <td> <input type="text" value={this.state.vehicle_vin_number} onChange={this.handleChangeVehicleVinNumber} /></td>
                            </tr>
                        </thead>
                        <tbody>                   
                        </tbody>
                    </table>
    </div>
    <div>
      <Button color='primary' onClick={(e)=>this.saveData(e)}>Zapisz dane</Button>
      <hr></hr>
    </div>
      </div>
      </div>
      </div>
      </CustomLayout>
      
    )
  }
}

const mapStateToProps=state=>(
  {
  lists: state.lists
});

export default DocumentsRegistration;