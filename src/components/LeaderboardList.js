import React,{Fragment} from 'react';
import {Table,Col,Row} from 'reactstrap'
import {connect} from 'react-redux'
import './App.css';


class LeaderboardList extends React.Component {
    render() {
        const {user} = this.props
        const numberOfAsked = user.questions.length
        const numberOfAnswered = Object.keys(user.answers).length
        return (
            <div className='tableContainer'>
            <Fragment>
            <Row>
            <Col md='12'>
            <Table>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Avatar</th>
                    <th> Asked</th>
                    <th>Answered</th>
                    <th>Score</th>
                </tr>
            </thead>
                <tbody>
                    <tr style={{backgroundColor:'aqua'}}>
                        <td>{user.name}</td>
                        <td><img src={user.avatarURL}className="leaderBoardImg"/></td>
                        <td>{numberOfAsked}</td>
                        <td>{numberOfAnswered}</td>
                        <td>{numberOfAnswered + numberOfAsked}</td>
                    </tr>
                </tbody>  
            </Table>
            </Col>
            </Row>
            </Fragment>
            </div>
        )
    }
}

function mapStateToProps({users}, {id}) {
    return {
        user: users[id]
    }
}
export default connect(mapStateToProps)(LeaderboardList)