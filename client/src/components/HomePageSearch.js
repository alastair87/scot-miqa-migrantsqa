import React, { Component } from "react";
import { Dropdown, Grid } from "semantic-ui-react";
import { getQuestions, getQuestionsTags } from "../api/questions";
import { SortTypeMenu } from "./SortTypeMenu";
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
      <React.Fragment>
        <Grid columns={2} divided centered>
          <Grid.Column textAlign="center">
            <Dropdown
              inline
              text="Filter tags"
              multiple
              floating
              multiple
              selection
              onChange={this.handleSelectedTags}
              options={options}
            />
          </Grid.Column>
          <Grid.Column textAlign="center">
            {" "}
            <SortTypeMenu sortType={this.props.sortType}></SortTypeMenu>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}
