
export const ADDFILE = 'ADDFILE';
export const DELETE_FILE = 'DELETE_FILE';
export const GET_FILES = 'GET_FILES';
export const GET_FILELOG = 'GET_FILELOG';



export function getFileLog(filelogdata) {

    return {
        type : GET_FILELOG,
        payload : filelogdata
    }
};


export function getFiles(filedata) {

    return {
        type : GET_FILES,
        payload : filedata
    }
};


export function addFile(filedata) {

    return {
        type : ADDFILE,
        payload : filedata
    }
};

export function deleteFile(index) {

    return {
        type : DELETE_FILE,
        payload : index
    }
};


