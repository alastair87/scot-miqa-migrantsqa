import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { postAnswer } from "../api/questions";
import QuestionCard from "./QuestionCard";
export default class QuestionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCardId: null,
      editQuestion: null,
      editQuestionId: null,
      editContentQuestion: null,
      content: "",
      score: "",
      tags: "",
      deleteQuestion: null,
      deletedsucessfully: false
    };
  }
  handleEditClick = (question, event) => {
    event.stopPropagation();
    this.setState({
      editQuestion: question,
      editContentQuestion: question.content,
      editQuestionId: question.id
    });
  };

  handleCancelClick = event => {
    event.stopPropagation();
    this.setState({
      editQuestion: null
    });
  };

  handleSaveClick = question => {
    question.stopPropagation();
    const postData = {
      method: "POST",
      body: JSON.stringify({
        content: this.state.editContentQuestion,
        date_posted: new Date(),
        id: this.state.editQuestionId
      }),
      headers: { "Content-Type": "application/json" }
    };
    return fetch("/api/questions/update-question", postData)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          console.log("reloaded page");
          this.props.pageReload();
        } else {
          throw res;
        }
      })
      .then(loggedInUser => {
        this.setState(state => ({
          editQuestion: null
        }));
      })
      .catch(err => {});
  };
  handleDeleteClick = (question, event) => {
    event.stopPropagation();
    this.setState(state => ({ deleteQuestion: question.id }));
    const postData = {
      method: "DELETE",
      body: JSON.stringify({
        id: question.id
      }),
      headers: { "Content-Type": "application/json" }
    };
    fetch("/api/questions/delete-question", postData)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          this.props.pageReload();
        } else {
          throw res;
        }
      })
      .then(loggedInUser => {
        this.setState(state => ({
          deleteQuestion: null,
          deletedsucessfully: true
        }));
      })
      .catch(err => {});
  };

  onChange = e => {
    this.setState({
      editContentQuestion: e.target.value
    });
  };

  handleOnSubmitAnswer = e => {
    e.preventDefault();
    const { content, score, tags } = this.state;
    const questionId = this.props.QuestionId;

    postAnswer(content, tags, questionId)
      .then(result => {
        if (result.status === 200) {
          this.props.pageReload();
          this.setState({
            content: ""
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Container>
        {this.props.questions.map((question, index) => {
          return (
            <QuestionCard
              index={index}
              activeIndex={this.props.activeIndex}
              question={question}
              userId={this.props.userId}
              toggleAnswers={this.props.toggleAnswers}
              editQuestion={this.state.editQuestion}
              editContentQuestion={this.state.editContentQuestion}
              handleSaveClick={this.handleSaveClick}
              onChange={this.onChange}
              handleCancelClick={this.handleCancelClick}
              handleEditClick={this.handleEditClick}
              answers={this.props.answers}
              handleOnSubmitAnswer={this.handleOnSubmitAnswer}
              handleDeleteClick={this.handleDeleteClick}
              handleChange={this.handleChange}
              content={this.state.content}
            ></QuestionCard>
          );
        })}
      </Container>
    );
  }
}
