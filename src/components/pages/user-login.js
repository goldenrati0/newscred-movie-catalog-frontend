import React from 'react'
import {Button, Container, Form, Header, Segment} from "semantic-ui-react";
import MovieAPI from "../../api";
import {Redirect} from "react-router-dom";
import {MenuItemProps} from "../../config";
import TopMenu from "../menu/menu";

class UserLoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formLoading: false,
            email: '',
            password: '',
            error: false,
            errorMessage: '',
            loggedIn: false
        };

        this.handleChange = (e, {name, value}) => this.setState({[name]: value});

        this.onFormSubmit = () => {
            const data = {
                email: this.state.email,
                password: this.state.password
            };

            this.setState({formLoading: true});
            MovieAPI.userLogin(data, this.formSubmitCallback);
        };

        this.formSubmitCallback = (apiReponse) => {
            this.setState({formLoading: false});
            if (apiReponse.error) {
                this.setState({error: true});
                this.setState({errorMessage: apiReponse.response.response.data.error.msg});
            } else {
                const token = apiReponse.response.data.result.access_token;
                console.log(token);
                localStorage.setItem("token", "Bearer " + token);
                this.setState({error: false});
                this.setState({loggedIn: true});

            }
        };
    }

    componentWillMount() {
        localStorage.removeItem("token");
    }

    render() {
        const {email, password, error, errorMessage, loggedIn} = this.state;
        return (
            loggedIn ?
                <Redirect to={"/home"}/> :
                (
                    <div className="container">
                        <TopMenu
                            {...MenuItemProps}
                            sendDataToHome={this.getDataFromMenu}
                            showSearchBar={false}
                        />
                        <Header as={"h1"} textAlign={"center"} style={{paddingTop: 100}}>User Login</Header>
                        {
                            error ?
                                <Segment inverted color='red' textAlign={"center"}>
                                    {errorMessage}
                                </Segment>
                                : null
                        }
                        <Container textAlign="center">
                            <Form size={"large"} loading={this.state.formLoading} onSubmit={this.onFormSubmit}>
                                <Form.Input required label='Email' name={"email"} value={email}
                                            placeholder='joe@schmoe.com'
                                            onChange={this.handleChange} style={{width: 400}}/>
                                <Form.Input required type="password" label='Password' name={"password"} value={password}
                                            placeholder="****" onChange={this.handleChange} style={{width: 400}}/>
                                <Button>Login</Button>
                                <div className="container"><a href={"/signup"}>Signup</a></div>
                            </Form>
                        </Container>
                    </div>
                )
        )
    }
}

export default UserLoginPage;