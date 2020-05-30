import React, { Component } from "react";
import { connect } from "react-redux";
import {

} from "./../actions/storyActions";


const cloudinaryBaseUrl =
"https://loving-fermi-80a7bc.netlify.app/"


class StoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.story ? props.story.id : "",
      sName: props.story ? props.story.sName : "",
      sContent: props.story ? props.story.sContent : "",
      user: null || 3,
      sCountry: props.story && props.story.sCountry ? props.story.sCountry : "",
      sImageUrl: props.story ? props.story.sImageUrl : null,
      imageUploading: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.getStory(id);
    } else {
      this.setState({ sName: "", sContent: "", sCountry: "" });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { story } = nextProps;

    this.setState({
      id: story ? story.id : "",
      sName: story ? story.sName : "",
      sImageUrl: story ? story.sImageUrl : "",
      sContent: story ? story.sContent : "",
      user: null || 3,
      sCountry: story && story.sCountry ? story.sCountry : ""
    });
  }

  handleImage = evt => {
    const file = evt.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    //formData.append("upload_preset", uploadPresetName);

    this.setState({ imageUploading: true });
    fetch(cloudinaryBaseUrl, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.secure_url) {
          this.setState({ ...this.state, sImageUrl: data.secure_url });
        }
      })
      .catch(err => console.error(err))
      .finally(() => this.setState({ imageUploading: false }));
  };

  change = evt => {
    evt.preventDefault();
    this.setState({ [evt.target.name]: evt.target.value });
  };

  submit = evt => {
    evt.preventDefault();
    const { editing } = this.props;
    const newStory = {
      sName: this.state.sName,
      sContent: this.state.sContent,
      user: null || 3,
      sCountry: this.state.sCountry,
      
    };
    const storyToUpdate = {
      id: this.state.id,
      sName: this.state.sName,
      sContent: this.state.sContent,
      user: null || 3,
      sCountry: this.state.sCountry,
      
    };

    console.log("To Update", storyToUpdate);

    if (editing) {
      this.props.updateStory(storyToUpdate);
      this.props.history.push("/");
      this.setState({
        id: "",
        sName: "",
        sContent: "",
        user: null || 3,
        sCountry: ""
      });
      this.props.currentStory(null);
    } else {
      this.props.addStory(newStory);
      this.props.history.push("/");
      this.setState({
        id: "",
        sName: "",
        sContent: "",
        user: null || 3,
        sCountry: ""
      });
    }
  };

  render() {
    const { sName, sCountry, sImageUrl, imageUploading } = this.state;
    const { editing } = this.props;
    const formTitle = editing ? "Edit Story" : "Add Story";

    return (
      <div>
        <div method="post" onSubmit={this.submit}>
          <h2>{formTitle}</h2>
          <div>
            <input
              autoFocus
              type="text"
              name="sName"
              value={sName}
              onChange={this.change}
              placeholder="Story title"
            />
          </div>
          <div>
            <input
              type="text"
              name="sCountry"
              value={sCountry}
              onChange={this.change}
              placeholder="Country"
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            </div>
          <div
            onClick={e => {
              this.fileUpload.click();
            }}
          >
          </div>

          <div>
            {editing ? (
              <button type="submit" className="btn">
                Update Story
              </button>
            ) : (
              <button type="submit" className="btn">
                Add Story
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.userId
});

export default connect(
  mapStateToProps,
  {  }
)(StoryForm);