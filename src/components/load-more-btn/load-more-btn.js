import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {Button} from "semantic-ui-react";
import MovieAPI from "../../api";

class LoadMoreButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            sendDataToHome: this.props.sendDataToHome,
            hidden: this.props.hidden,
            searchTerm: '',
            currentPage: 0
        };

        this.loadMoreButtonClickCallback = (response) => {
            this.setState({loading: false});

            if (!response.error) {
                localStorage.setItem('currentPage', (this.state.currentPage) + "");
                localStorage.setItem('searchQuery', this.state.searchTerm);
                this.state.sendDataToHome(response);
            }
        };

        this.handleOnClick = (e, data) => {

            const searchQuery = localStorage.getItem('searchQuery');
            if (searchQuery) {
                let currentPage = localStorage.getItem('currentPage');
                if (currentPage)
                    currentPage = parseInt(currentPage) + 1;
                else
                    currentPage = 1;

                this.setState({searchTerm: searchQuery, currentPage: currentPage, loading: true});

                MovieAPI.searchMovie(searchQuery, currentPage, this.loadMoreButtonClickCallback);
            }
        };
    }


    render() {
        return (
            <div className="container">
                <Button
                    loading={this.state.loading}
                    disabled={this.state.loading}
                    hidden={this.state.hidden}
                    fluid={true}
                    size={"large"}
                    color={"teal"}
                    onClick={this.handleOnClick}
                    style={{marginBottom: 20}}>Load More</Button>
            </div>
        )
    }
}

export default LoadMoreButton;