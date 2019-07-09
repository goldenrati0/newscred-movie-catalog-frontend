import React from 'react'
import {Button, Container, Form, Header, Segment} from "semantic-ui-react";
import MovieAPI from "../../api";
import {MenuItemProps} from "../../config";
import TopMenu from "../menu/menu";
import {Redirect} from "react-router-dom";

class UserSignupPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formLoading: false,
            name: '',
            email: '',
            password: '',
            error: false,
            errorMessage: '',
            redirect: false,
            redirectPath: '/'
        };

        this.handleChange = (e, {name, value}) => this.setState({[name]: value});

        this.onFormSubmit = () => {
            const data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            };

            this.setState({formLoading: true});
            MovieAPI.userSignup(data, this.formSubmitCallback);
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
                this.setState({error: false, redirect: true, redirectPath: '/home'});
            }
        };
    }

    render() {
        const {name, email, password, error, errorMessage, redirect, redirectPath} = this.state;

        if (redirect) {
            return <Redirect to={redirectPath}/>
        } else {
            return (
                (
                    <div className="container">
                        <TopMenu
                            {...MenuItemProps}
                            sendDataToHome={this.getDataFromMenu}
                            showSearchBar={false}
                        />
                        <Header as={"h1"} textAlign={"center"} style={{paddingTop: 100}}>Signup</Header>
                        {
                            error ?
                                <Segment inverted color='red' textAlign={"center"}>
                                    {errorMessage}
                                </Segment>
                                : null
                        }
                        <Container textAlign="center">
                            <Form size={"large"} loading={this.state.formLoading} onSubmit={this.onFormSubmit}>
                                <Form.Input required label='Name' name={"name"} value={name}
                                            placeholder='Joe Schmoe'
                                            onChange={this.handleChange} style={{width: 400}}/>
                                <Form.Input required label='Email' name={"email"} value={email}
                                            placeholder='joe@schmoe.com'
                                            onChange={this.handleChange} style={{width: 400}}/>
                                <Form.Input required type="password" label='Password' name={"password"} value={password}
                                            placeholder="****" onChange={this.handleChange} style={{width: 400}}/>
                                <Button>Signup</Button>
                                <div className="container"><a href={"/login"}>Login</a></div>
                            </Form>
                        </Container>
                    </div>
                )
            )
        }
    }
}

export default UserSignupPage;