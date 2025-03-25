import React, {Component} from 'react';
import '../FileUpload.css';
import {  withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import "react-table/react-table.css";

class FileGridList extends Component {



    state = { index:'', file:'' , downloadLink:''}

    openModal(index, file, downloadLink) {
        this.setState({ index:index,  file: file, downloadLink:downloadLink})
    }


    style = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };



    render(){


    return (

        <div className="col-sm-6">

            <table className="table table-striped table-condensed table-hover table-bordered">
                    <thead>
                    <tr className="justify-content-md-left">

                        <th>Type</th>
                        <th>Name</th>
                    </tr>
                    </thead>

                    <tbody>

                    {this.props.filedata.files.map((file, index) => {

                        var downloadlink= 'http://localhost:8080/files/'+file.filename+'?filepath='+file.filepath

                        return (
                                <tr className="justify-content-md-center">

                                    <td>
                                        <div className="row justify-content-md-left">
                                            <div className="col-md-1">
                                                <span className="fa fa-file"></span>:
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        <a href={downloadlink} className="link-title " >
                                                {file.filename}
                                          </a>
                                    </td>
                                    <td>
                                        <button className="btn btn-primary" type="submit"
                                                onClick={() => this.props.deleteFile(index, file)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                     //   }
                    })}
                    </tbody>
                </table>
        </div>


        );
    }


}



function mapStateToProps(reducerdata) {

    const filedata = reducerdata.filesreducer;

    return {filedata};
}


export default withRouter(connect(mapStateToProps)(FileGridList));


