import React from 'react';
import { Jumbotron, Grid, Row } from 'react-bootstrap';

class ResultPage extends React.Component {
    render() {
        return ( 
            <div className="LoginPage">
                <Jumbotron>
                    <Grid>
                        <h1> Login/Signup </h1> 
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

export default LoginPage;