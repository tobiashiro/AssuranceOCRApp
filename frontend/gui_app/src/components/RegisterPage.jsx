import React from 'react';
import { Redirect, Link } from 'react-router-dom'
 
class RegisterPage extends React.Component {
 
    constructor(){
        super();
        this.state = {
          username: '',
          password: '',
          token: '',
          responseStatus: 0,
          response : {}
        }
 
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.register = this.register.bind(this);
        
    }
 
    handleUsername(event){
        this.setState({username: event.target.value});
    }
    
    handlePassword(event){
        this.setState({password: event.target.value});
        }
 
    register(event) {
 
        event.preventDefault();
        var url = 'http://127.0.0.1:8000/rest_auth/users/';
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
            return <Redirect to='/' />;
        }

    return (
        <div className="back">
            <div>
            <div class="row">
                    <div class="col-sm">
                      <button> <Link to="/">Logowanie</Link></button>
                    </div>
                </div>
                <section className="login-block">
                    <div className="container">
                        <div className="row ">
                            <div className="col login-sec">
                                <form className="login-form bg-light">
                                <h2 className="text-center">Rejestracja</h2>
                                    <div className="form-group">
                                        <label className="text-uppercase">Nazwa użytkownika</label>
                                        <input type="text" value= {this.state.username} className="form-control" onChange= {this.handleUsername}/>
                                        <label className="text-uppercase">Hasło</label>
                                        <input type="text" value= {this.state.password} className="form-control" onChange= {this.handlePassword}/>
                                        <input type="submit" value="Zarejestruj" className="btn btn-primary btn-login float-right" onClick = {this.register}/>
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
export default RegisterPage;