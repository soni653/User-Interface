import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Story from "./Story";
import { fetchStories } from "./../actions/storyActions";

class StoriesList extends Component {
  componentDidMount() {
    this.props.fetchStories(this.props.userId);
  }
  render() {
    const { stories } = this.props;

    return (
      <div>
        {stories.map(story => (
          <Story {...this.props} key={story.id} story={story} />
        ))}
        </div>
    );
  }
}

StoriesList.propTypes = {
  stories: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  userId: state.userId,
  username: state.username,
  stories: state.stories,
  error: state.error
});

export default connect(
  mapStateToProps,
  { fetchStories }
)(StoriesList);