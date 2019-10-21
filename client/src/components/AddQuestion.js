import React, { Component } from "react";
import {
  Container,
  Segment,
  Form,
  Dropdown,
  Button,
  Grid
} from "semantic-ui-react";
import { postQuestion } from "../api/questions";
import LoginPrompt from "./LoginPrompt";
import { tags } from "../util/tag-options";
import HomePageSearch from "./HomePageSearch";

export default class AddQuestion extends Component {
  state = {
    content: "",
    tags,
    isAnswered: null,
    score: 0,
    userId: "",
    currentValues: null
  };

  handleAddition = (e, { value }) => {
    this.setState(prevState => ({
      tags: [{ text: value, value }, ...prevState.tags]
    }));
  };

  handleChangeTag = (e, { value }) => this.setState({ currentValues: value });

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleOnSubmit = e => {
    e.preventDefault();
    const questionTag = this.state.currentValues;
    const { content, isAnswered, score, userId } = this.state;
    postQuestion(content, questionTag, isAnswered, score, userId)
      .then(result => {
        if (result.status === 200) {
          this.props.pageReload();
          this.setState({
            content: "",
            currentValues: null
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { content, currentValues } = this.state;
    return (
      <Container>
        {this.props.userId ? (
          <Form onSubmit={this.handleOnSubmit}>
            <Grid columns={2}>
              <Grid.Column floated="left">
                <Button>Add a question</Button>
              </Grid.Column>
              <Grid.Column floated="right" textAlign="right">
                <HomePageSearch
                  getFilteredTags={this.props.getFilteredTags}
                  sortType={this.props.sortType}
                ></HomePageSearch>
              </Grid.Column>
            </Grid>
            <Segment stacked>
              <Form.Input
                fluid
                action={{ icon: "circular add" }}
                placeholder="Please write your question here..."
                name="content"
                onChange={this.handleChange}
                value={content}
                required
                minLength={12}
                type="text"
              />
              <Dropdown
                options={this.state.tags}
                placeholder="Add Tags"
                search
                fluid
                selection
                multiple
                allowAdditions
                value={currentValues}
                onAddItem={this.handleAddition}
                onChange={this.handleChangeTag}
              />
            </Segment>
          </Form>
        ) : (
          <LoginPrompt />
        )}
      </Container>
    );
  }
}
