import React, {Component} from 'react'
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {connect} from 'react-redux'
import QuestionList from './QuestionList'
import classnames from 'classnames';

class Dashboard extends Component {
    state = {
        activeTab: '1'
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        const {UnansweredQuestionIds,  AnsweredQuestionIds} = this.props
        return (
            <div >
                <Nav tabs >
                    <NavItem>
                        <NavLink
                         style={{color: 'blue', cursor:'pointer'}}
                            className={classnames({active: this.state.activeTab === '1'})}
                            onClick={() => {
                                this.toggle('1');}}>
                            Unanswered
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                         style={{color: 'blue', cursor:'pointer'}}
                            className={classnames({active: this.state.activeTab === '2'})}
                            onClick={() => {
                                this.toggle('2');}} >
                            Answered
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">                       
                            {UnansweredQuestionIds.map((questionId) => (
                                <span key={questionId}><QuestionList id={questionId}/></span>
                            ))}                        
                    </TabPane>
                    <TabPane tabId="2">                      
                            { AnsweredQuestionIds.map((questionId) => (
                                < span key={questionId}><QuestionList id={questionId}/></span>
                           ))}                     
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser}) {
    const UnansweredQuestions = Object.values(questions).filter((question) => !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser))
    const AnsweredQuestions = Object.values(questions).filter((question) => question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
    )
    return {
        UnansweredQuestionIds: Object.values(UnansweredQuestions)
            .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id),
        AnsweredQuestionIds: Object.values(AnsweredQuestions)
            .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id)
    }
}
export default connect(mapStateToProps)(Dashboard)