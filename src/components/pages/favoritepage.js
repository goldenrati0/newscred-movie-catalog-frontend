import React from 'react'
import MovieAPI from "../../api";
import TopMenu from "../menu/menu";
import {Divider} from "semantic-ui-react";
import CustomModal from "../grid/grid";
import {MenuItemProps} from "../../config";
import {Redirect} from "react-router-dom";


class FavoritePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            favMovies: [],
            loggedIn: true
        };

        this.getFavoriteMovie = (response) => {
            if (!response.error) {
                console.log(response.response.data.result);
                if (response.msg === 'login required') {
                    this.setState({loggedIn: false});
                } else {
                    this.setState({favMovies: [...response.response.data.result]});
                }
            } else {
                this.setState({favMovies: []});
            }
        };
    }

    componentWillMount() {
        const token = localStorage.getItem("token");
        if (!token) {
            this.setState({loggedIn: false});
        } else {
            MovieAPI.getFavoriteMovie(this.getFavoriteMovie);
            localStorage.removeItem("searchQuery");
            localStorage.removeItem("currentPage");
        }
    }

    render() {
        const {loggedIn, favMovies} = this.state;

        if (loggedIn) {
            return (
                <div>
                    <TopMenu
                        menuItems={[...MenuItemProps.menuItems]}
                        sendDataToHome={this.getFavoriteMovie}
                        showSearchBar={false}
                    />

                    <div className="container">
                        <Divider/>
                    </div>

                    <CustomModal
                        cardItems={[...favMovies]}
                        columns={5}
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

export default FavoritePage;