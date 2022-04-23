import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css'; 
import CustomLayout from './containers/Layout';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { Switch, Route, HashRouter } from 'react-router-dom';
import DocumentsRegistration from './components/DocumentsRegistration';
import DataSearch from './components/DataSearch';
import ApplicationStatistics from './components/ApplicationStatistics';
import TemplateManagment from './components/TemplateManagment';

const App = () => {
    return (
    // <div className="App">
<HashRouter>
  <switch>
   <Route exact path='/' component={LoginPage} />
    <Route path="/DocumentsRegistration" exact component={DocumentsRegistration}/>
    <Route path="/Register" exact component={RegisterPage}/>
    <Route path="/DataSearch" exact component={DataSearch}/>
    <Route path="/ApplicationStatistics" exact component={ApplicationStatistics}/>
    <Route path="/TemplateManagment" exact component={TemplateManagment}/>
  </switch>
</HashRouter>
     //  <CustomLayout>
        //<PolicyList/>
      //</CustomLayout> */}
   // </div>
  );
}

export default App;
