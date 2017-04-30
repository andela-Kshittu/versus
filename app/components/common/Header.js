import React from 'react';
import {IndexLink} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class Header extends React.Component {
    render() {
        return ( 
            <div className="Header">
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <IndexLink className="top-text" to="/"> Versus </IndexLink> 
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <LinkContainer to="/login">
                            <NavItem className="top-text" eventKey={1}>Login/Signup</NavItem>
                        </LinkContainer>
                        <NavItem className="top-text" eventKey={2} href="#">Share</NavItem>
                    </Nav>
                </Navbar> 
            </div>
        );
    }
}

export default Header;
