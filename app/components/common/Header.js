import React from 'react';
import { IndexLink } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';

class Header extends React.Component {
    render() {
        return ( 
            <div className="Header">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <IndexLink to="/"> Versus </IndexLink> 
                        </Navbar.Brand> 
                        <Navbar.Toggle />
                    </Navbar.Header> 
                    <Navbar.Collapse>
                        <Nav>
                        </Nav> 
                    </Navbar.Collapse> 
                </Navbar> 
            </div>
        );
    }
}

export default Header;