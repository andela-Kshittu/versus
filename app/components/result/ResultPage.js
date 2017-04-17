import React from 'react';
import { Jumbotron, Grid, Row } from 'react-bootstrap';

class ResultPage extends React.Component {
    render() {
        return ( 
            <div className="ResultPage">
                <Jumbotron>
                    <Grid>
                        <h1> Reault </h1> 
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

export default ResultPage;