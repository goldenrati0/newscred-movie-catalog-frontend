import React from 'react'
import CustomModal from "../grid/grid";
import LoadMoreButton from "../load-more-btn/load-more-btn";
import TopMenu from "../menu/menu";
import {Divider} from "semantic-ui-react";
import {MenuItemProps, ModalProps} from '../../config'
import {Redirect} from "react-router-dom";

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            loggedIn: true
        };

        this.getDataFromMenu = (response) => {
            if (!response.error) {
                if (response.msg === 'login required') {
                    this.setState({loggedIn: false});
                } else {
                    this.setState({movies: [...response.response.data.result]});
                }
            } else {
                console.log(response.data.result);
                this.setState({movies: response.data.result});
            }
        };

        this.getDataFromLoadingPage = (response) => {
            if (!response.error) {
                if (response.msg === 'login required') {
                    this.setState({loggedIn: false});
                } else {
                    this.setState({movies: [...this.state.movies, ...response.response.data.result]});
                }
            } else {
                console.log(response.response.data.result);
                this.setState({movies: [...this.state.movies, ...response.response.data.result]});
            }
        };

        /*this.getFavoriteMovie = (response) => {
            if (!response.error) {
                console.log(response.response.data.result);
                if (response.msg === 'login required') {
                    this.setState({loggedIn: false});
                } else {
                    this.setState({movies: [...response.response.data.result]});
                }
            } else {
                this.setState({movies: [...ModalProps.cardItems]});
            }
        };*/
    }

    componentWillMount() {
        const token = localStorage.getItem("token");
        if (!token) {
            this.setState({loggedIn: false});
            return
        }

        this.setState({movies: [...ModalProps.cardItems]});
        localStorage.removeItem("searchQuery");
        localStorage.removeItem("currentPage");
    }

    render() {
        const {loggedIn} = this.state;

        if (loggedIn) {
            return (
                <div>
                    <TopMenu
                        {...MenuItemProps}
                        sendDataToHome={this.getDataFromMenu}
                        showSearchBar={true}
                    />

                    <div className="container">
                        <Divider/>
                    </div>

                    <CustomModal
                        cardItems={[...this.state.movies]}
                        columns={5}
                    />

                    <div className="container">
                        <Divider/>
                    </div>

                    <LoadMoreButton
                        sendDataToHome={this.getDataFromLoadingPage}
                        hidden={this.state.loadMoreBtnHidden}
                    />

                    <Divider
                        style={{marginBottom: 100}}
                    />
                </div>
            )
        } else {
            return (
                <Redirect to={"/login"}/>
            )
        }
    }
}

export default Home;