import React, { Component } from "react";
import { connect } from "react-redux";
import { getStory, fetchStories } from "./../actions/storyActions";

class SingleStory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sName: props.story ? props.story.sName : "",
      sContent: props.story ? props.story.sContent : "",
      sCountry: props.story ? props.story.sCountry : ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStories();
    this.props.getStory(id);
    this.setState({
      sName: this.props.story ? this.props.story.sName : "",
      sContent: this.props.story ? this.props.story.sContent : "",
      sCountry: this.props.story ? this.props.story.sCountry : ""
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sName: nextProps.story ? nextProps.story.sName : "",
      sContent: nextProps.story ? nextProps.story.sContent : "",
      sCountry: nextProps.story ? nextProps.story.sCountry : ""
    });
  }

  render() {
    const { sName, sContent } = this.state;

    return (
      <div>
        <div>{sName}</div>
        <div dangerouslySetInnerHTML={{ __html: sContent }} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  if (props.match.params.id) {
    return {
      story: state.stories.stories.find(
        st => st.id === Number(props.match.params.id)
      )
    };
  }
  return {
    story: state.stories.stories.find(
      st => st.id === state.stories.currentStory
    )
  };
};

export default connect(
  mapStateToProps,
  { getStory, fetchStories }
)(SingleStory);