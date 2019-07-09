import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {Button, Form, Input, Menu} from 'semantic-ui-react'
import {Link, Redirect} from "react-router-dom";
import MovieAPI from "../../api";


export default class TopMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeItem: props.menuItems[0].name,
            showSearchBar: props.showSearchBar && true,
            searchBarLoading: false,
            sendDataToHome: props.sendDataToHome,
            searchBarTerm: '',
            redirect: false,
            redirectPath: ''
        };

        this.handleItemClick = (e, data) => {
            console.log(data);
            this.setState({activeItem: data.name})
        };

        this.onLoginBtnClicked = (e, data) => {
            console.log(data);
            if (data.children === "Logout") {
                localStorage.removeItem("token");
            }
            this.setState({redirect: true, redirectPath: '/login'})
        };

        this.searchBarOnChange = (e, {value}) => {
            this.setState({searchBarTerm: value});
        };

        this.formSubmitCallback = (apiResponse) => {
            this.setState({searchBarLoading: false});
            if (!apiResponse.error) {
                this.state.sendDataToHome(apiResponse);
            }
        };

        this.onSearchFormSubmit = () => {
            if (this.state.searchBarTerm !== '') {
                this.setState({searchBarLoading: true});

                const searchQuery = this.state.searchBarTerm;
                const currentPage = 1;

                MovieAPI.searchMovie(searchQuery, currentPage, this.formSubmitCallback);
                localStorage.setItem('searchQuery', searchQuery);
                localStorage.setItem('currentPage', "" + currentPage);
            }
        }
    }


    render() {
        const {activeItem, showSearchBar, redirect, redirectPath} = this.state;
        const token = localStorage.getItem("token") === null;


        if (redirect) {
            return <Redirect to={redirectPath}/>
        } else {
            return (
                <div className="container">
                    <Menu secondary stackable>

                        {this.props.menuItems.map(item => {
                                return (
                                    <Link to={item.path}>
                                        <Menu.Item
                                            name={item.name}
                                            active={activeItem === item.name}
                                            onClick={this.handleItemClick}
                                        />
                                    </Link>
                                )
                            }
                        )}

                        {
                            showSearchBar ?
                                (
                                    <Menu.Menu position='right'>
                                        <Menu.Item>
                                            <Form onSubmit={this.onSearchFormSubmit}>
                                                <Input
                                                    icon="search"
                                                    placeholder='Search movies...'
                                                    loading={this.state.searchBarLoading}
                                                    onChange={this.searchBarOnChange}
                                                />
                                            </Form>
                                        </Menu.Item>
                                    </Menu.Menu>
                                ) :
                                null
                        }

                        {
                            !token ?
                                (
                                    <Menu.Item position={"right"}>
                                        <Button negative onClick={this.onLoginBtnClicked}>Logout</Button>
                                    </Menu.Item>
                                ) : null

                        }
                    </Menu>
                </div>
            )
        }
    }
}