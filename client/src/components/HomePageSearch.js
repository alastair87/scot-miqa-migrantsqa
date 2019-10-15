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
          inline
          text="Filter tags"
          multiple
          floating
          className="icon"
          multiple
          selection
          onChange={this.handleSelectedTags}
          options={options}
        />
        {"  |   "}
        <Dropdown
          inline
          text="sort by"
          icon="sort"
          floating
          labeled
          button
          className="icon"
        />
      </Container>
    );
  }
}
