import React, {useState} from 'react'
import {Button} from 'semantic-ui-react'
import MovieAPI from "../../api";

const FavoriteButton = (props) => {
    const [btnColor, setColor] = useState(props.liked ? 'red' : 'grey');
    return (
        <div>
            <Button icon='heart' color={btnColor} disabled={props.imdbID == null ? true : false} onClick={(e, d) => {

                if (props.imdbID) {
                    console.log("making fav: " + props.imdbID);
                    MovieAPI.favoriteMovie(props.imdbID);
                    setColor(btnColor === 'red' ? 'grey' : 'red');
                }
            }}/>
        </div>
    )
};

export default FavoriteButton;