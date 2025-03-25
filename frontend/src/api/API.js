const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
};




export const getFiles = () => {
  return fetch(`${api}/files/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};
export const uploadFile = (payload) =>
    fetch(`${api}/files/upload`, {
        method: 'POST',
        body: payload,
        credentials:'include'
    }).then(res => {

        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });


export const deleteFile = (file) =>
    fetch(`${api}/files/delete`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(file),
        credentials:'include'
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });


