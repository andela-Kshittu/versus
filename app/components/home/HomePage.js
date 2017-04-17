import React from 'react';
import { Jumbotron, Grid, Row } from 'react-bootstrap';

class HomePage extends React.Component {
    render() {
        return ( 
            <div className="HomePage">
                <Jumbotron>
                    <Grid>
                        <h1> Home Page </h1> 
                    </Grid> 
                </Jumbotron> 
                <Grid>
                    <Row>
                    </Row> 
                </Grid> 
            </div>
        );
    }
}

export default HomePage;