import React from 'react';
import { Jumbotron, Grid, Row } from 'react-bootstrap';

class LoginPage extends React.Component {
    render() {
        return ( 
            <div className="LoginPage">
                <Jumbotron className="text-center">
                    <Grid>
                        <h2><span className="fa fa-lock"></span>Welcome to Versus</h2>
                        <p>Login or Register with:</p>
                        <a href="/auth/facebook" className="btn btn-primary"><span className="fa fa-facebook"></span> Facebook</a> 
                        <a href="/auth/google" className="btn btn-primary login-button"><i className="fa fa-google-plus"> Google</i></a>
                        <a href="/auth/google" className="btn btn-primary login-button"><i className="fa fa-github"> Github</i></a>
                        <a href="/auth/google" className="btn btn-primary login-button"><i className="fa fa-twitter"> Twitter</i></a>
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
