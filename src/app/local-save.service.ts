import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalSaveService {

  constructor() { }

  private idGenerator() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  saveToLocalStorage(content, name){
    // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
    let indexedDB = window.indexedDB;

    // Open (or create) the database
    let open = indexedDB.open("Notes", 1.1);

      // Create the schema
    open.onupgradeneeded = function() {
      let db = open.result;
      let store = db.createObjectStore("NotesStore", {keyPath: "id"});
      let index = store.createIndex("NoteIndex", [ "note.id", "note.title","note.content", "note.date"]);
    };

    //Id generator
    let id = this.idGenerator();


    open.onsuccess = function() {
      // Start a new transaction
      let db = open.result;
      let tx = db.transaction("NotesStore", "readwrite");
      let store = tx.objectStore("NotesStore");
      let index = store.index("NoteIndex");

      // Save the Date
      const date = new Date();
      let noteObject = {
        id: id,
        name: name,
        content: content,
        date: date
      };
      console.log(noteObject);

      // Add some data
      store.put(
        {
          id: noteObject.id,
          note:
            {
              id: noteObject.id,
              name: noteObject.name,
              content: noteObject.content,
              date: noteObject.date
            }
        }
        );

      // Close the db when the transaction is done
      tx.oncomplete = function() {
        db.close();
      };
    }

    open.onerror = function(e){
      console.log("Error: " + e)
    };
  }


  getAllFromLocalStorage(){
    console.log("Get All From Local Storage");
    // Open (or create) the database
    let open = indexedDB.open("Notes", 1);

    let response ={
      data: ""
    };

    return Promise.resolve(() => {
      return open.onsuccess = function() {
      // Start a new transaction
      let db = open.result;
      let tx = db.transaction("NotesStore", "readwrite");
      let store = tx.objectStore("NotesStore");
      let index = store.index("NoteIndex");

      // // Query the data
      let getNote = store.getAll();

      getNote.onsuccess = function() {
        if(typeof getNote.result === "undefined"){
          console.log("Could not find note");
          response.data = "Could not find note";
          return {
            code: "404",
            status: "Could not find note"
          }
        }
        else{
          console.log(getNote.result);
          response.data = getNote.result;
          return {
            code: "200",
            status: "Found Note",
            note: getNote.result
          }
        }
      };
      getNote.onerror = function(e){
        console.log("Error: " + e);
        response.data = "Error" + e;
        return {
          error: 550,
          status: "Error" + e
        }
      };

      // Close the db when the transaction is done
      tx.oncomplete = function() {
        db.close();
      };

        return getNote;
    };
    }
    )


  }

  getFromLocalStorageByID(id){
    // Open (or create) the database
    let open = indexedDB.open("Notes", 1);

    open.onsuccess = function() {
      // Start a new transaction
      let db = open.result;
      let tx = db.transaction("NotesStore", "readwrite");
      let store = tx.objectStore("NotesStore");
      let index = store.index("NoteIndex");

      // // Query the data
      let getNote = store.get(id);

      getNote.onsuccess = function() {
        if(typeof getNote.result === "undefined"){
          console.log("Could not find note");

          return {
            code: "404",
            status: "Could not find note"
          }
        }
        else{
          console.log(getNote.result.note);
          return {
            code: "200",
            status: "Found Note",
            note: getNote.result.note
          }

        }
      };
      getNote.onerror = function(e){
        console.log("Error: " + e);
        return {
          error: 550,
          status: "Error" + e
        }
      };


      // Close the db when the transaction is done
      tx.oncomplete = function() {
        db.close();
      };
    }
  }



  deleteFromLocalStorageByID(id){
    // Open (or create) the database
    let open = indexedDB.open("Notes", 1);

    open.onsuccess = function() {
      // Start a new transaction
      let db = open.result;
      let tx = db.transaction("NotesStore", "readwrite");
      let store = tx.objectStore("NotesStore");
      let index = store.index("NoteIndex");

      // // Query the data
      let deleteNote = store.delete(id);

      deleteNote.onsuccess = function() {
        console.log(deleteNote);
        // if(typeof deleteNote.result === "undefined"){
        //   console.log("Could not find note")
        // }
        // else{
        //   console.log(deleteNote.result.note);
        // }
      };
      deleteNote.onerror = function(e){
        console.log("Error: " + e)
      };


      // Close the db when the transaction is done
      tx.oncomplete = function() {
        db.close();
      };
    }
  }
}
