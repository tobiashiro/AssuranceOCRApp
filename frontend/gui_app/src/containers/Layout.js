import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {Link} from  "react-router-dom";
import './logout.css';
import { Button } from 'antd';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import Nav from '../components/nav';
import PropTypes from 'prop-types';
import DocumentsRegistration from '../components/DocumentsRegistration'

const { Header, Content, Footer } = Layout;



class CustomLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: 'true',
      height:0
    };
  }


handle_logout = () => {
  localStorage.removeItem('token');
  this.setState({ logged_in: false, username: '' });
  window.location.reload(false);
  console.log(this.setState.logged_in)
  console.log(localStorage.token)
};

componentWillMount(){
  this.setState({height: window.innerHeight-185});
  console.log(this.state.height)
}

render () {


  return (

    
    <Layout className="layout">
    <Header >
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['DocumentsRegistration']}>
        <Menu.Item key="DocumentsRegistration"><Link to="/DocumentsRegistration"></Link>Rejestracja dokumentu</Menu.Item>
        <Menu.Item key="DataSearch"><Link to="/DataSearch"></Link>Dane polisy</Menu.Item>
        <Menu.Item key="3"><Link to="/ApplicationStatistics"></Link>Statystyki</Menu.Item>
        <Menu.Item key="4"><Link to="/TemplateManagment"></Link>Zarządzanie szablonami</Menu.Item>
    
        <Button datafromparents={this.state.username} onClick={this.handle_logout} style={{ float:'right', marginTop:'15px' }}>Wyloguj</Button> 
        
      </Menu>
      
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '15px 0' }}>
      <Breadcrumb.Item><div>&nbsp;</div></Breadcrumb.Item>
      </Breadcrumb>
      <div style={{background:'#fff', padding:24, minHeight:this.state.height}}>
        {this.props.children}
        </div>
     
    </Content>
    <Footer style={{ textAlign: 'center' }}>©2020 Created by Adam Witasik</Footer>
  </Layout>
    )
}
}




export default CustomLayout;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
