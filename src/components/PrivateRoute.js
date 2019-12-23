import React, {Fragment} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Container, Row} from 'reactstrap'
import NavBar from './NavBar'
import {isEmpty} from '../utils/api'

const PrivateRoute = ({component: Component, isSignedIn, ...rest}) => (
    <Route {...rest} render={(props) => {
        return (
            isSignedIn
                ?
                <Fragment>
                    <NavBar/>
                    <Container>
                        <Row>
                            <Component {...props}/>
                        </Row>
                    </Container>
                </Fragment>
                : <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
           }}/>
        )
    }}/>
)

function mapStateToProps({authedUser}) {
    return {
        isSignedIn: !isEmpty(authedUser)
    }
}
export default connect(mapStateToProps, null, null, {pure: false,})(PrivateRoute)