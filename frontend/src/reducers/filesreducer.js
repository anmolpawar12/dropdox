import {ADDFILE} from "../actions/index";
import {DELETE_FILE} from "../actions/index";
import {GET_FILES} from "../actions/index";
const initialState = {

    files :[]
};

const filedata = (state = initialState, action) => {

    switch (action.type) {


        case ADDFILE :
            return {
                files:[
                    ...state.files,
                    action.payload
                ]
            }
        case GET_FILES :
            return {
                files:action.payload

            }
        case DELETE_FILE :
            return {
                files:[
                    ...state.files.slice(0, action.payload),
                    ...state.files.slice(action.payload + 1)
                ]
            }

        default :
            return state;

    }
};

export default filedata;