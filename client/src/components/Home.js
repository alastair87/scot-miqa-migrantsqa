import React, { Component } from "react";
import "../styles/Home.css";
import HomePageSearch from "./HomePageSearch";
import { Container, Divider } from "semantic-ui-react";
import QuestionsContainer from "./QuestionsContainer";

export default class Home extends Component {
  state = {
    tags: [],
    sortBy: "date_posted"
  };

  getFilteredTags = tags => {
    this.setState({
      tags
    });
  };
  sortType = (e, type) => {
    console.log("sss", type);
    this.setState({ sortBy: type });
  };

  render() {
    console.log("re", this.state.sortBy);

    return (
      <Container>
        <Divider horizontal />
        <HomePageSearch
          getFilteredTags={this.getFilteredTags}
          sortType={this.sortType}
        />
        <Divider horizontal />
        <QuestionsContainer
          tags={this.state.tags}
          userId={this.props.userId}
          sortBy={this.state.sortBy}
        />
      </Container>
    );
  }
}
