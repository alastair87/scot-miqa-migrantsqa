import React, { Component } from "react";
import { Dropdown, Container } from "semantic-ui-react";
import { getQuestions, getQuestionsTags } from "../api/questions";

export default class HomePageSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterTags: [],
      questions: [],
      selectedTags: []
    };
  }

  componentDidMount() {
    getQuestions().then(res => {
      this.setState({
        questions: res
      });
    });
    getQuestionsTags().then(res => {
      this.setState({
        filterTags: res
      });
    });
  }

  handleSelectedTags = (e, data) => {
    const selectedOptionTags = data.value;
    this.props.getFilteredTags(selectedOptionTags);
  };

  render() {
    const { filterTags } = this.state;
    const options = filterTags.map((tag, index) => ({
      key: index,
      text: tag,
      value: tag
    }));

    return (
      <Container>
        <Dropdown
          text="Filter Posts"
          icon="filter"
          floating
          labeled
          button
          className="icon"
        />
        <Dropdown
          text="Filter tags"
          multiple
          icon="filter"
          button
          floating
          className="icon"
          multiple
          selection
          style={{ backgroundColor: "grey" }}
          onChange={this.handleSelectedTags}
          options={options}
        />
      </Container>
    );
  }
}
