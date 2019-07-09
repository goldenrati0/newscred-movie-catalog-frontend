import axios from "axios";
import {FAV_MOVIE_IMDB_IDS} from "./config";


const API_BASE_URL = process.env.API_BASE_URL || "http://127.0.0.1:8080";
const USER_SIGNUP = "/user/register";
const USER_LOGIN = "/user/login";
const USER_INFO = "/user/me";
const SEARCH_URL = "/movie/search";
const FAVORITE_MOVIE_URL = "/user/me/movies";

export default class MovieAPI {

    static userInfo = (callbackFunc) => {
        const url = API_BASE_URL + USER_INFO;
        let apiResponse = {response: null, error: false, msg: ''};

        axios({
            method: "GET",
            url: url,
            headers: {
                "Authorization": localStorage.getItem("token")
            },
            responseType: 'json',
            responseEncoding: 'utf8'
        })
            .then(response => {
                apiResponse.response = response;
            })
            .catch(error => {
                apiResponse.response = error;
                apiResponse.error = true;
                if (error.request.status === 401 || error.request.status === 402 || error.request.status === 422) {
                    apiResponse.msg = "login required"
                }
            })
            .finally(() => {
                console.log(apiResponse);
                callbackFunc(apiResponse);
            })
    };

    static userSignup = (data, callback) => {
        const url = API_BASE_URL + USER_SIGNUP;
        let apiResponse = {response: null, error: false, msg: ''};

        axios({
            method: "POST",
            url: url,
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            },
            responseType: 'json',
            responseEncoding: 'utf8'
        })
            .then(response => apiResponse.response = response)
            .catch(error => {
                apiResponse.response = error;
                apiResponse.error = true;
                if (error.request.status === 401 || error.request.status === 402 || error.request.status === 422) {
                    apiResponse.msg = "login required"
                }
            })
            .finally(() => {
                console.log(apiResponse);
                callback(apiResponse);
            })
    };

    static userLogin = (data, callback) => {
        const url = API_BASE_URL + USER_LOGIN;
        let apiResponse = {response: null, error: false, msg: ''};

        axios({
            method: "POST",
            url: url,
            data: {
                email: data.email,
                password: data.password
            },
            responseType: 'json',
            responseEncoding: 'utf8'
        })
            .then(response => apiResponse.response = response)
            .catch(error => {
                apiResponse.response = error;
                apiResponse.error = true;
                if (error.request.status === 401 || error.request.status === 402 || error.request.status === 422) {
                    apiResponse.msg = "login required"
                }
            })
            .finally(() => {
                console.log(apiResponse);
                callback(apiResponse);
            })
    };

    static searchMovie = (query, page = 1, callbackFunc) => {
        const url = API_BASE_URL + SEARCH_URL;
        let apiResponse = {response: null, error: false, msg: ''};

        axios({
            method: "GET",
            url: url,
            headers: {
                "Authorization": localStorage.getItem("token")
            },
            params: {
                q: query,
                page: page
            },
            responseType: 'json',
            responseEncoding: 'utf8'
        })
            .then(response => {
                apiResponse.response = response;
            })
            .catch(error => {
                apiResponse.response = error;
                apiResponse.error = true;
                if (error.request.status === 401 || error.request.status === 402 || error.request.status === 422) {
                    apiResponse.msg = "login required"
                }
            })
            .finally(() => {
                console.log(apiResponse);
                callbackFunc(apiResponse);
            })
    };

    static favoriteMovie = (imdbID) => {
        const url = API_BASE_URL + FAVORITE_MOVIE_URL;
        let apiResponse = {response: null, error: false, msg: ''};

        axios({
            method: "POST",
            url: url,
            headers: {
                "Authorization": localStorage.getItem("token")
            },
            data: {
                imdb_id: imdbID
            },
            responseType: 'json',
            responseEncoding: 'utf8'
        })
            .then(response => {
                apiResponse.response = response;
            })
            .catch(error => {
                console.log(error);
                apiResponse.response = error;
                apiResponse.error = true;
                if (error.request.status === 401 || error.request.status === 402 || error.request.status === 422) {
                    apiResponse.msg = "login required"
                }
            })
            .finally(() => {
                console.log(apiResponse);
            })
    };

    static getFavoriteMovie = (callback) => {
        const url = API_BASE_URL + FAVORITE_MOVIE_URL;
        let apiResponse = {response: null, error: false, msg: ''};

        axios({
            method: "GET",
            url: url,
            headers: {
                "Authorization": localStorage.getItem("token")
            },
            responseType: 'json',
            responseEncoding: 'utf8'
        })
            .then(response => {
                if (response.data.result.length === 0) {
                    apiResponse.error = true;
                } else {
                    apiResponse.response = response;
                }
            })
            .catch(error => {
                console.log(error);
                apiResponse.response = error;
                apiResponse.error = true;
                if (error.request.status === 401 || error.request.status === 402 || error.request.status === 422) {
                    apiResponse.msg = "login required"
                }
            })
            .finally(() => {
                console.log(apiResponse);
                callback(apiResponse);
            })
    };

    static getPopularMovies = () => {
        let ids = FAV_MOVIE_IMDB_IDS;
        let movie_data = [];
        ids.map(id => {
            const url = API_BASE_URL + SEARCH_URL + "/" + id;
            axios({
                method: "GET",
                url: url,
                headers: {
                    "Authorization": localStorage.getItem("token")
                },
                responseType: 'json',
                responseEncoding: 'utf8'
            })
                .then(response => {
                    console.log(response.data.result);
                    movie_data.push(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
            return null;
        });
        return movie_data;
    }
}