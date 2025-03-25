import React, { Component } from "react";
import * as API from "../api/API";
import FileGridList from "./FileGridList";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { addFile, deleteFile, getFiles } from "../actions/index";
import { withRouter } from "react-router-dom";

class FileUpload extends Component {
  state = {
    message: "",
  };

  componentDidMount() {
    this.fetchFiles();
  }

  fetchFiles = () => {
    API.getFiles() // Call API to get files
      .then((res) => {
        if (res.status === 200) {
          res.json().then((filedata) => {
            this.props.getFiles(filedata); // Update Redux store
          });
        } else {
          this.setState({ message: "Error fetching files!" });
        }
      })
      .catch((error) => console.error("Error fetching files:", error));
  };

  handleFileUpload = (event) => {
      const file = event.target.files[0];

      if (!file) {
          this.setState({ message: "No file selected" });
          return;
      }

      const allowedExtensions = ["txt", "jpg", "jpeg", "png", "json"];

      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
          this.setState({ message: "Invalid file type! Allowed types: txt, jpg, png, json." });
          return;
      }

      const payload = new FormData();
      payload.append("file", file);

      API.uploadFile(payload).then((res) => {
          if (res.status === 200) {
              res.json().then((filedata) => {
                  this.props.addFile(filedata);
              });

              this.setState({ message: "File uploaded successfully" });
          } else {
              this.setState({ message: "File upload error" });
          }
      });
  };


  deleteFile = (index, file) => {
    API.deleteFile(file).then((res) => {
      if (res.status === 200) {
        this.props.deleteFile(index);
        this.setState({ message: "File deleted successfully!" });
      } else {
        this.setState({ message: "Error deleting file!" });
      }
    });
  };

  render() {
    return (
      <div className="container-fluid">
        {this.state.message && <div className="text-danger">{this.state.message}</div>}

        <div className="jumbotron">
          <div className="row justify-content-md-center">
            <TextField type="file" name="mypic" onChange={this.handleFileUpload} />
          </div>

          <br />
          <br />

          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-1 "></div>
              <FileGridList deleteFile={this.deleteFile}  />
              <div className="col-sm-1 "></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reducerdata) {
  return { filesdata: reducerdata.filesreducer };
}

function mapDispatchToProps(dispatch) {
  return {
    addFile: (data) => dispatch(addFile(data)),
    deleteFile: (index) => dispatch(deleteFile(index)),
    getFiles: (data) => dispatch(getFiles(data)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileUpload));
