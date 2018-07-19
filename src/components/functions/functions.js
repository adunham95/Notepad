import PouchDB from "pouchdb";

let notePadDB = new PouchDB("notePad");

export function saveToLocalStorage(data, update=false) {
  console.log(data);
  notePadDB.put(data);
  getSingleProject(data._id)
}

export function getSingleProject(id) {
    notePadDB.get(id).then(function (doc) {
        console.log(doc);
    })
}

export function deleteSingleNote(id) {
    notePadDB.get(id).then(function (doc) {
        return notePadDB.remove(doc)
    }).then(function (res) {
        console.log(res)
    }).catch(function (err) {
        console.log(err)
    })
}

export function getAllNotes() {
    return notePadDB.allDocs({
        include_docs: true,
        attachments: true
    })
}

export function noteWatcher(){
     return notePadDB.changes({since: 'now',live: true, include_docs: true})
}

export function getRandomID(length) {
    let id = Math.random().toString(36).substr(2, 2+length);
    return id;
}
