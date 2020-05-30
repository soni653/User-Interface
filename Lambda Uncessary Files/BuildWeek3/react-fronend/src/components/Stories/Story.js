import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteStory } from "./../actions/storyActions";
import { IoMdCreate } from "react-icons/io";

class Story extends Component {
  
  render() {
    const { story, deleteStory, userId } = this.props;
    return (
      <div>
        onClick={e => {
          this.props.history.push(`/read-story/${story.id}`);
        }}
      >
        <div className="story-image">
        <img src = 'https://unsplash.com/photos/UvGx9p1vYbE' alt= {story.sname} />
          {story.sCountry && <span>{story.sCountry}</span>}
        </div>
        <div>
          <div className="post-title">
            <h3>{story.sName}</h3>
          </div>
          <div className="post-details">
            <div className="user-info">
              <img src={story.avatar} alt={story.username} />
              <span>{story.username}</span>
            </div>
            {userId && (
              <div className="action-btns">
                <div>
                  onClick={e => {
                    e.stopPropagation();
                    deleteStory(story.id);
                  }}
                >
                  x
                </div>
                <div>
                  onClick={e => {
                    e.stopPropagation();
                    this.props.history.push(`/stories/edit/${story.id}`);
                  }}
                >
                  <IoMdCreate />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Story.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sName: PropTypes.string.isRequired,
    sContent: PropTypes.string.isRequired,
    user: PropTypes.number.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.userId
});

export default connect(
  mapStateToProps,
  { deleteStory }
)(Story);