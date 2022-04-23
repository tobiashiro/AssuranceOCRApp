import React from 'react';
import CustomLayout from '../containers/Layout';
import { Redirect, Link } from 'react-router-dom';
import './documents.css';
import axios from 'axios';
import { Table, Button, Modal, ModalHeader, ModalFooter, FormGroup, Label,ModalBody, Input} from 'reactstrap'



class TemplateManagment extends React.Component {
 
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      responseStatus: 0,
      insurancesCompany : [],
      regex:[],
      userToken: localStorage.getItem('token'),
      template_name:'',
      email:'',
      regex_insurance_period_from:'',
      regex_insurance_period_up_to:'',
      regex_insurer:'',
      regex_policy_number:'',
      regex_registration_number:'',
      regex_vehicle_brand:'',
      regex_vehicle_model:'',
      regex_vehicle_type:'',
      regex_engine_capacity:'',
      regex_vin_number:'',
      regex_year_production:'',
      template:[],

      editTemplateData:{
      id:'',
      template_name:'',
      email:'',
      regex_insurance_period_from:'',
      regex_insurance_period_up_to:'',
      regex_policy_id:'',
      regex_registration_number:'',
      regex_vehicle_brand:'',
      regex_vehicle_model:'',
      regex_vehicle_type:'',
      regex_engine_capacity:'',
      regex_vin_number:'',
      regex_vehicle_year_production:'',
      },
      editTemplateModal:false
    }

    this.handleChangeTemplateName = this.handleChangeTemplateName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeRegexInsurancePeriodFrom = this.handleChangeRegexInsurancePeriodFrom.bind(this);
    this.handleChangeRegexInsurancePeriodUpTo = this.handleChangeRegexInsurancePeriodUpTo.bind(this);
    this.handleChangeRegexInsurer = this.handleChangeRegexInsurer.bind(this);
    this.handleChangeRegexPolicyNumber = this.handleChangeRegexPolicyNumber.bind(this);
    this.handleChangeRegexRegistrationNumber = this.handleChangeRegexRegistrationNumber.bind(this);
    this.handleChangeRegexVehicleBrand = this.handleChangeRegexVehicleBrand.bind(this);
    this.handleChangeRegexVehicleModel = this.handleChangeRegexVehicleModel.bind(this);
    this.handleChangeRegexVehicleType = this.handleChangeRegexVehicleType.bind(this);
    this.handleChangeRegexEngineCapacity = this.handleChangeRegexEngineCapacity.bind(this);
    this.handleChangeRegexVinNumber = this.handleChangeRegexVinNumber.bind(this);
    this.handleChangeRegexYearProduction = this.handleChangeRegexYearProduction.bind(this);
    this.editTemplate = this.editTemplate.bind(this);

  }

toggleEditTemplateData(){
this.setState({
  editTemplateModal:! this.state.editTemplateModal
});
}

  saveTemplate(e) 
{
  let file=this.state.file
      let formdata=new FormData()
      let token=this.state.userToken
  
      formdata.append('template_name', this.state.template_name)
      formdata.append('email', this.state.email)
      formdata.append('regex_insurance_period_from', this.state.regex_insurance_period_from)
      formdata.append('regex_insurance_period_up_to', this.state.regex_insurance_period_up_to)
      formdata.append('regex_policy_id', this.state.regex_policy_number)
      formdata.append('regex_insurer', this.state.regex_insurer)
      formdata.append('regex_registration_number', this.state.regex_registration_number)
      formdata.append('regex_vehicle_brand', this.state.regex_vehicle_brand)
      formdata.append('regex_vehicle_model', this.state.regex_vehicle_model)
      formdata.append('regex_vehicle_type', this.state.regex_vehicle_type)
      formdata.append('regex_vehicle_year_production', this.state.regex_year_production)
      formdata.append('regex_vehicle_vin_number', this.state.regex_vin_number)
      formdata.append('regex_vehicle_engine_capacity', this.state.regex_engine_capacity)
      
      console.log(formdata)
      
      axios ({
        url:'http://127.0.0.1:8000/api/regextemplate/',
        method:'POST',
        headers:{
          authorization: token
        },
        data:formdata
      }).then((res)=>{
  console.log(formdata)
      },(err)=>{
  
      })
      window.location.reload(false);
}

componentWillMount(){
  axios.get('http://127.0.0.1:8000/api/regextemplate/').then((response)=>{
    this.setState({
      template:response.data
    })
  })
}

handleChangeTemplateName(event) {
    this.setState(
      {
        template_name: event.target.value,
      
  
    });
  }
 
  handleChangeEmail(event) {
    this.setState(
      {
        email: event.target.value,
      
  
    });
  }

  
  handleChangeRegexInsurancePeriodFrom(event) {
    this.setState(
      {
        regex_insurance_period_from: event.target.value,
      
  
    });
  }

  handleChangeRegexInsurancePeriodUpTo(event) {
    this.setState(
      {
        regex_insurance_period_up_to: event.target.value,
      
  
    });
  }

  handleChangeRegexInsurer(event) {
    this.setState(
      {
        regex_insurer: event.target.value,
      
  
    });
  }

  
  handleChangeRegexPolicyNumber(event) {
    this.setState(
      {
        regex_policy_number: event.target.value,
      
  
    });
  }

  handleChangeRegexRegistrationNumber(event) {
    this.setState(
      {
        regex_registration_number: event.target.value,
      
  
    });
  }

  
  handleChangeRegexVehicleBrand(event) {
    this.setState(
      {
        regex_vehicle_brand: event.target.value,
      
  
    });
  }

  handleChangeRegexVehicleModel(event) {
    this.setState(
      {
        regex_vehicle_model: event.target.value,
      
  
    });
  }

  handleChangeRegexVehicleType(event) {
    this.setState(
      {
        regex_vehicle_type: event.target.value,
      
  
    });
  }

  handleChangeRegexEngineCapacity(event) {
    this.setState(
      {
        regex_engine_capacity: event.target.value,
      
  
    });
  }

  handleChangeRegexVinNumber(event) {
    this.setState(
      {
        regex_vin_number: event.target.value,
      
  
    });
  }

  handleChangeRegexYearProduction(event) {
    this.setState(
      {
        regex_year_production: event.target.value,
      
  
    });
  }

  updateTemplate(){
  let {template_name,regex_insurance_period_from,regex_insurance_period_up_to,regex_policy_id,regex_insurer,regex_registration_number,regex_vehicle_brand,regex_vehicle_model,regex_vehicle_type,regex_vehicle_year_production,regex_vehicle_vin_number,regex_vehicle_engine_capacity}=this.state.editTemplateData;
  axios.put('http://127.0.0.1:8000/api/regextemplate/' + this.state.editTemplateData.id+'/',{
    template_name,regex_insurance_period_from,regex_insurance_period_up_to,regex_policy_id,regex_insurer,regex_registration_number,regex_vehicle_brand,regex_vehicle_model,regex_vehicle_type,regex_vehicle_year_production,regex_vehicle_vin_number,regex_vehicle_engine_capacity
  }).then((response) => {
    console.log(response.data)
    window.location.reload(false);
  });
 
  }

  editTemplate(id,template_name,regex_insurance_period_from,regex_insurance_period_up_to,regex_insurer,regex_policy_id,regex_registration_number,regex_vehicle_brand,regex_vehicle_model,regex_vehicle_type,regex_vehicle_engine_capacity,regex_vehicle_vin_number,regex_vehicle_year_production ){
   this.setState({
     editTemplateData:{id,template_name,regex_insurance_period_from,regex_insurance_period_up_to,regex_insurer,regex_policy_id,regex_registration_number,regex_vehicle_brand,regex_vehicle_model,regex_vehicle_type,regex_vehicle_engine_capacity,regex_vehicle_vin_number,regex_vehicle_year_production}, editTemplateModal: ! this.state.editTemplateModal
   });
  }

  deleteTemplate(id){
    axios.delete('http://127.0.0.1:8000/api/regextemplate/' + id+'/').then((response)=>{
      window.location.reload(false);
  });
  }

  render() {
   
    if(this.state.userToken == undefined && this.state.userToken==null) {
      return <Redirect to='/' />;
    }

    let template=this.state.template.map((regex) => {
      return(
    <tr key={regex.id}>
         <td>{regex.id}</td>
          <td>{regex.template_name}</td>
          <td>{regex.regex_insurance_period_from}</td>
          <td>{regex.regex_insurance_period_up_to}</td>
          <td>{regex.regex_insurer}</td>
          <td>{regex.regex_policy_id}</td>
          <td>{regex.regex_registration_number}</td>
          <td>{regex.regex_vehicle_brand}</td>
          <td>{regex.regex_vehicle_model}</td>
          <td>{regex.regex_vehicle_type}</td>
          <td>{regex.regex_vehicle_engine_capacity}</td>
          <td>{regex.regex_vehicle_vin_number}</td>
          <td>{regex.regex_vehicle_year_production}</td>
       
       
          <td>
            <Button color="success" size='sm'className='mr-2' onClick={this.editTemplate.bind(this, regex.id,regex.template_name,regex.regex_insurance_period_from,regex.regex_insurance_period_up_to,regex.regex_insurer,regex.regex_policy_id,regex.regex_registration_number,regex.regex_vehicle_brand,regex.regex_vehicle_model,regex.regex_vehicle_type,regex.regex_vehicle_engine_capacity,regex.regex_vehicle_vin_number,regex.regex_vehicle_year_production)}>Edytuj</Button>
           
            <Button color="danger" size='sm' onClick={this.deleteTemplate.bind(this, regex.id)}>Usuń</Button>
            
          </td>
        </tr>
      )
    });

    return (
      <CustomLayout>
        <div className="App container">
        <Modal isOpen={this.state.editTemplateModal} toggle={this.toggleEditTemplateData.bind(this)}>
        <ModalHeader toggle={this.toggleEditTemplateData.bind(this)}>Edytuj szablon</ModalHeader>
        <ModalBody>
        <FormGroup>
          <Label for="title">Nazwa szablonu</Label>
          <Input id="title" value={this.state.editTemplateData.template_name} onChange={(e)=>{
            let {editTemplateData}=this.state;
            this.state.editTemplateData.template_name=e.target.value;
            this.setState({editTemplateData});
          }}/>
        </FormGroup>
        
        <FormGroup>
          <Label for="template_name">Regex - data ważności od</Label>
          <Input id="template_name" value={this.state.editTemplateData.regex_insurance_period_from} onChange={(e)=>{
            let {editTemplateData}=this.state;
            this.state.editTemplateData.regex_insurance_period_from=e.target.value;
            this.setState({editTemplateData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="template_name">Regex - data ważności do</Label>
          <Input id="template_name" value={this.state.editTemplateData.regex_insurance_period_up_to} onChange={(e)=>{
            let {editTemplateData}=this.state;
            this.state.editTemplateData.regex_insurance_period_up_to=e.target.value;
            this.setState({editTemplateData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="template_name">Regex - ubezpieczający</Label>
          <Input id="template_name" value={this.state.editTemplateData.regex_insurer} onChange={(e)=>{
            let {editTemplateData}=this.state;
            this.state.editTemplateData.regex_insurer=e.target.value;
            this.setState({editTemplateData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="template_name">Regex - numer polisy</Label>
          <Input id="template_name" value={this.state.editTemplateData.regex_policy_id} onChange={(e)=>{
            let {editTemplateData}=this.state;
            this.state.editTemplateData.regex_policy_id=e.target.value;
            this.setState({editTemplateData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="template_name">Regex - numer rejestracyjny</Label>
          <Input id="template_name" value={this.state.editTemplateData.regex_registration_number} onChange={(e)=>{
            let {editTemplateData}=this.state;
            this.state.editTemplateData.regex_registration_number=e.target.value;
            this.setState({editTemplateData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="template_name">Regex - marka pojazdu</Label>
          <Input id="template_name" value={this.state.editTemplateData.regex_vehicle_brand} onChange={(e)=>{
            let {editTemplateData}=this.state;
            this.state.editTemplateData.regex_vehicle_brand=e.target.value;
            this.setState({editTemplateData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="template_name">Regex - model pojazdu</Label>
          <Input id="template_name" value={this.state.editTemplateData.regex_vehicle_model} onChange={(e)=>{
            let {editTemplateData}=this.state;
            this.state.editTemplateData.regex_vehicle_model=e.target.value;
            this.setState({editTemplateData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="template_name">Regex - typ pojazdu</Label>
          <Input id="template_name" value={this.state.editTemplateData.regex_vehicle_type} onChange={(e)=>{
            let {editTemplateData}=this.state;
            this.state.editTemplateData.regex_vehicle_type=e.target.value;
            this.setState({editTemplateData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="template_name">Regex - pojemność</Label>
          <Input id="template_name" value={this.state.editTemplateData.regex_vehicle_engine_capacity} onChange={(e)=>{
            let {editTemplateData}=this.state;
            this.state.editTemplateData.regex_vehicle_engine_capacity=e.target.value;
            this.setState({editTemplateData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="template_name">Regex - VIN</Label>
          <Input id="template_name" value={this.state.editTemplateData.regex_vehicle_vin_number} onChange={(e)=>{
            let {editTemplateData}=this.state;
            this.state.editTemplateData.regex_vehicle_vin_number=e.target.value;
            this.setState({editTemplateData});
          }}/>
        </FormGroup>
        <FormGroup>
          <Label for="template_name">Regex - rok produkcji</Label>
          <Input id="template_name" value={this.state.editTemplateData.regex_vehicle_year_production} onChange={(e)=>{
            let {editTemplateData}=this.state;
            this.state.editTemplateData.regex_vehicle_year_production=e.target.value;
            this.setState({editTemplateData});
          }}/>
        </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateTemplate.bind(this)}>Zapisz szablon</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditTemplateData.bind(this)}>Zakończ</Button>
        </ModalFooter>
      </Modal>
      </div>
        <div className='title'>
            <h1>Dodaj szablon dokumentu</h1>
        <hr></hr>
        </div>
        <div className="table-responsive title">
                    <table className="table table-hover bg-warning p-5 mx-auto w-auto">
                        <thead>
                            <tr>
                                <th scope="col">Nazwa szablonu</th>
                                <th scope="col">Regex - data ważności od</th>
                                <th scope="col">Regex - data ważności do</th>
                                <th scope="col">Regex - ubezpieczający</th>
                                <th scope="col">Regex - numer polisy</th>
                                <th scope="col">Regex - numer rejestracyjny</th>
                                <th scope="col">Regex - marka pojazdu</th>
                                <th scope="col">Regex - model pojazdu</th>
                                <th scope="col">Regex - typ pojazdu</th>
                                <th scope="col">Regex - pojemność</th>
                                <th scope="col">Regex - VIN</th>
                                <th scope="col">Regex - rok produkcji</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                        <tr>
                            <td> <input type="text" value={this.state.template_name} onChange={this.handleChangeTemplateName} /></td>
                            <td> <input type="text" value={this.state.regex_insurance_period_from} onChange={this.handleChangeRegexInsurancePeriodFrom} /></td>
                            <td> <input type="text" value={this.state.regex_insurance_period_up_to} onChange={this.handleChangeRegexInsurancePeriodUpTo} /></td>
                            <td> <input type="text" value={this.state.regex_insurer} onChange={this.handleChangeRegexInsurer} /></td>
                            <td> <input type="text" value={this.state.regex_policy_number} onChange={this.handleChangeRegexPolicyNumber} /></td>
                            <td> <input type="text" value={this.state.regex_registration_number} onChange={this.handleChangeRegexRegistrationNumber} /></td>
                            <td> <input type="text" value={this.state.regex_vehicle_brand} onChange={this.handleChangeRegexVehicleBrand} /></td>
                            <td> <input type="text" value={this.state.regex_vehicle_model} onChange={this.handleChangeRegexVehicleModel} /></td>
                            <td> <input type="text" value={this.state.regex_vehicle_type} onChange={this.handleChangeRegexVehicleType} /></td>
                            <td> <input type="text" value={this.state.regex_vehicle_engine_capacity} onChange={this.handleChangeRegexEngineCapacity} /></td>
                            <td> <input type="text" value={this.state.regex_vin_number} onChange={this.handleChangeRegexVinNumber} /></td>
                            <td> <input type="text" value={this.state.regex_year_production} onChange={this.handleChangeRegexYearProduction} /></td>
                            
                            </tr>
                        </tbody>
                    </table>
                    <div>
      <Button onClick={(e)=>this.saveTemplate(e)}>Zapisz szablon</Button>
      <hr></hr>
      <h1>Dostępne szablony</h1>
      <hr></hr>
      
    </div>
    <div className='table-responsive'>
      <Table>
        <thead>
          <tr>
            <th> 
              Id 
            </th>
            <th>
            Nazwa szablonu
            </th>
           
            <th >Regex - data ważności od</th>
            <th >Regex - data ważności do</th>
            <th >Regex - ubezpieczający</th>
            <th scope="col">Regex - numer polisy</th>
            <th scope="col">Regex - numer rejestracyjny</th>
           <th scope="col">Regex - marka pojazdu</th>
             <th scope="col">Regex - model pojazdu</th>
            <th scope="col">Regex - typ pojazdu</th>
            <th scope="col">Regex - pojemność</th>
            <th scope="col">Regex - VIN</th>
            <th scope="col">Regex - rok produkcji</th>
            <th scope="col">Akcja</th>
          </tr>
        </thead>
       {template}
      </Table>
    </div>
    
   </div>
                

   
      
      </CustomLayout>

   
       
    )
  }
}

const mapStateToProps=state=>({
  lists: state.lists
});

export default TemplateManagment;