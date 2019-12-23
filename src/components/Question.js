import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Row} from 'reactstrap'
import {handleAnswerQuestion} from '../actions/questions'
import Results from "./Results"

class Question extends Component {
    state = {
        vote: false
            }
    handleVoteOne = (vote) => {
        const {dispatch, question} = this.props
        dispatch(handleAnswerQuestion(question.id, vote))
        alert('Your vote is: ' + question.optionOne.text);
       }
    handleVoteTwo = (vote) => {
        const {dispatch, question} = this.props
        dispatch(handleAnswerQuestion(question.id, vote))
        alert('Your vote is: ' + question.optionTwo.text);
       }
    render() {
        const {question} = this.props

        if ( question == null ) {
            return <p>Question was not found.</p>
        }

        return (
            <div>
                <h1>Would you rather</h1>
                <Row>                        
                    <h5>{question.author} Asks:</h5>
                </Row>
                <Row>
                    <Results questionId={question.id} optionName="optionOne" onClick={this.handleVoteOne}/>
                    <Results questionId={question.id} optionName="optionTwo" onClick={this.handleVoteTwo}/>
                </Row>
            </div>
        )
    }
}

function mapStateToProps({questions, users, authedUser}, props) {
    const {question_id} = props.match.params
    const question = questions[question_id]
    const user = users[authedUser]
    return {
        question,
        authedUser,
        showResults: Object.keys(user.answers).includes(question_id),
    }
}
export default connect(mapStateToProps)(Question)