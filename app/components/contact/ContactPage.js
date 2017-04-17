import React from 'react';
import { Jumbotron, Grid, Row } from 'react-bootstrap';

class ContactPage extends React.Component {
    render() {
        return ( 
            <div className="ContactPage">
                <Jumbotron>
                    <Grid>
                        <h1> Contact Page </h1> 
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

export default ContactPage;