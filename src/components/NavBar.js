import React, {Component, Fragment} from 'react'
import LoadingBar from 'react-redux-loading'
import {NavLink, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Nav, Navbar,  NavItem } from 'reactstrap'
import {LogOut} from "../actions/authedUser"
import './App.css';

class NavBar extends Component {
    state = {
        redirectLogin: false
    }
    handleSignout = (e) => {
        e.preventDefault()
        this.props.dispatch(LogOut())
        this.setState(() => ({
            redirectLogin: true
        }))
    }
    render() {
        const {redirectLogin} = this.state
        const {authedUser} = this.props
        if (redirectLogin === true) {
            return (<Redirect to="/login"/>)
        }
        return (
            <Fragment>
                <Navbar style={{backgroundColor:'aqua'}}>
                    <Nav>
                        <NavItem>
                            <NavLink  exact to="/" className="link">Dashboard</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink  to="/leaderboard" className="link">Leaderboard</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink  to="/add"  className="link">New Question</NavLink>
                        </NavItem>  
                        <NavItem  style={{marginRight:'30px'}}>hi, {authedUser}</NavItem>                    
                        <NavItem>
                            <NavLink  to="#"
                             onClick={this.handleSignout} className="link">Signout</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                <LoadingBar/>
            </Fragment>
        )
    }
}

function mapStateToProps({authedUser,users}) {
    return {
     user:users[authedUser],
     authedUser
    }
}
export default connect(mapStateToProps)(NavBar)