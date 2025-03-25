import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import FileUpload from "./FileUpload";


class NewerHomePage extends Component {

    render() {
        return (
            <div>
                <Route exact path="/" render={() => (

                    <FileUpload/>
                )}/>

            </div>

        );

    }
}

export default withRouter(NewerHomePage);