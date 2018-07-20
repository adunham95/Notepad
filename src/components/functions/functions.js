import PouchDB from "pouchdb";

let notePadDB = new PouchDB("notePad");

export function putNote(data, update=false) {
  console.log(data);
  notePadDB.put(data);
  getSingleProject(data._id).then(function (doc) {
      console.log(doc);
  })
}

export function getSingleProject(id) {
    return notePadDB.get(id)
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
        attachments: true,
        descending: true
    })
}

export function noteWatcher(){
     return notePadDB.changes({since: 'now',live: true, include_docs: true})
}

export function noteCancel() {
    return notePadDB.changes.cancel();
}

export function getRandomID(length) {
    let id = Date.now() +"-" + Math.random().toString(36).substr(2, 2+length);
    return id;
}

export function saveToLocalStorage(key,data) {
    console.log("Saved to local storage");
    window.localStorage.setItem(key, data);
}

export function firstRun(){
    let data= {
        version: "0.1.2",
        releaseNotes: "Added basic comment system"
    };
    if(window.localStorage.getItem("version") < data.version){
        console.log("Version Behind");
        saveToLocalStorage("version", data.version);
        let note = {
            _id: getRandomID(5),
            type: "note",
            name: data.version + " Release Notes",
            description: data.releaseNotes,
            created: Date.now(),
            project: "updates",
            comments: [],
            editable: false
        };
        console.log(note);
        putNote(note);
    }
    else if(window.localStorage.getItem("version") === null){
        saveToLocalStorage("version", data.version);
        let note = {
            _id: getRandomID(5),
            type: "note",
            name: data.version + " Release Notes",
            description: data.releaseNotes,
            created: Date.now(),
            project: "updates",
            comments: [],
            editable: false
        };
        console.log(note);
        putNote(note);
    }
    else{
        console.log("You are on the current version");
    }

    notePadDB.get("scratch").then(function (doc) {
        console.log(doc);
    }).catch(function (err) {
        console.log(err);
        if(err.status === 404){
            let project = {
                _id: "scratch",
                type: "project",
                name: "Scratch",
                description: "Default project for notes",
                created: Date.now(),
            };
            putNote(project);
        }

    });

    notePadDB.get("updates").then(function (doc) {
        console.log(doc);
    }).catch(function (err) {
        console.log(err);
        if(err.status === 404){
            let project = {
                _id: "updates",
                type: "project",
                name: "Release Notes",
                description: "Group for release notes",
                created: Date.now(),
                editable: false,
            };
            putNote(project);
        }

    });

}
