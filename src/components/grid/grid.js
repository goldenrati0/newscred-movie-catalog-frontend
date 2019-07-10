import React from 'react'
import {Card, Container, Grid, GridColumn, Header, Icon, Image, List, Modal, ModalActions} from 'semantic-ui-react'
import FavoriteButton from "../fav-button/fav-button";

class CustomModal extends React.Component {

    render() {

        if (this.props.cardItems.length === 0) {
            return (
                <div className={"container"}>
                    <Header
                        as={"h1"}
                        textAlign={"center"}
                        style={{paddingTop: 100}}>No Favorite Movies</Header>
                </div>
            )
        } else {
            const modalTrigger = (item) => (
                <Card>
                    <Image src={item.Poster}
                           wrapped ui={false} size={"large"}/>
                    <Card.Content>
                        <Card.Header>{item.Title}</Card.Header>
                        <Card.Meta>{item.Year || "2018"}</Card.Meta>
                        {
                            item.Plot.length >= 50 ?
                                <Card.Description>{item.ShortPlot || item.Plot.substr(0, 50)}</Card.Description>
                                :
                                <Card.Description>{item.ShortPlot || item.Plot}</Card.Description>
                        }

                    </Card.Content>
                    <Card.Content extra>
                        <Container textAlign={"center"}>
                            <Icon name='imdb'/>
                            {item.imdbRating || "10.0"}
                        </Container>
                    </Card.Content>
                </Card>
            );

            return (
                <div className="container">
                    <Grid container columns={this.props.columns} stackable>

                        {this.props.cardItems.map(item => {
                            return (
                                <GridColumn>

                                    <Modal
                                        style={{marginLeft: 320, marginRight: 200, marginTop: 10, marginBottom: 100}}
                                        size="small"
                                        centered={true}
                                        dimmer={true}
                                        trigger={modalTrigger(item)}>

                                        <Modal.Header>{item.Title}</Modal.Header>

                                        <Modal.Content image scrolling>
                                            <Image wrapped size='large' src={item.Poster}/>
                                            <Modal.Description>

                                                <List>
                                                    <List.Item>
                                                        <List.Header>Plot</List.Header>
                                                        {item.Plot || item.description}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>IMDB Rating</List.Header>
                                                        {item.imdbRating}/10.0
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Rated</List.Header>
                                                        {item.Rated}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Released</List.Header>
                                                        {item.Released}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Runtime</List.Header>
                                                        {item.Runtime}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Genre</List.Header>
                                                        {item.Genre}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Director</List.Header>
                                                        {item.Director}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Actors</List.Header>
                                                        {item.Actors}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Writer</List.Header>
                                                        {item.Writer}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Language</List.Header>
                                                        {item.Language}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Country</List.Header>
                                                        {item.Country}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Awards</List.Header>
                                                        {item.Awards}
                                                    </List.Item>
                                                    <List.Item>
                                                        <List.Header>Production</List.Header>
                                                        {item.Production}
                                                    </List.Item>
                                                </List>

                                            </Modal.Description>
                                        </Modal.Content>

                                        <ModalActions>
                                            <FavoriteButton liked={item.favorite || false} imdbID={item.imdbID}/>
                                        </ModalActions>

                                    </Modal>

                                </GridColumn>
                            )
                        })}

                    </Grid>
                </div>
            )
        }
    }
}

export default CustomModal;