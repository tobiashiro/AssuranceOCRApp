import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import './login.css';

import { Form, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';

 
class LoginPage extends React.Component {
 
    constructor(){
        super();
        this.state = {
          username: '',
          password: '',
          token: '',
          responseStatus: 0,
          response : {},
          
        }
 
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.login = this.login.bind(this);
        
    }
 
    handleUsername(event){
        this.setState({username: event.target.value});
    }
    
    handlePassword(event){
        this.setState({password: event.target.value});
        }
 
    login(event) {
 
        event.preventDefault();
        var url = 'http://127.0.0.1:8000/token-auth/';
        var data = {
            username: this.state.username,
            password: this.state.password
        };
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                this.setState({ responseStatus: response.status });
                return response.json()
            } else {
                throw new Error('Error with login');
            }
        })
            .then(data  => {
                this.setState({token: data.token});
                localStorage.setItem('token', data.token);
                window.location.reload(false);
                console.log(data);
            }
        )
        .catch((error) => {
            console.log(error)
        });;;
    }
 
 
 
    render(){
        if (this.state.token !== undefined && this.state.token.length !== 0) {
            console.log("redirect")
            console.log(this.state.token)
            return <Redirect to='/DocumentsRegistration' />;
        }
    return (
        <div className="back">
            <div>
                <div className="row m-0">
                <div className="col-sm">
                        <button>
                            <Link to="/register">Rejestracja</Link>
                            </button>
                    </div>
                </div>
                <section className="login-block">
                    <div className="container">
                        <div className="row ">
                            <div className="col login-sec">
                                <form className="login-form bg-light">
                                <h2 className="text-center">Logowanie</h2>
                                    <div className="form-group">
                                        <label className="text-uppercase">Nazwa użytkownika</label>
                                        <input type="text" value= {this.state.username} className="form-control" onChange={this.handleUsername}/>
                                        <label className="text-uppercase">Hasło</label>
                                        <input type="password" value= {this.state.password} className="form-control" onChange={this.handlePassword}/>
                                        <input type="submit" value="Zaloguj" className="btn btn-primary btn-login float-right" onClick = {this.login}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )}
}
export default LoginPage;