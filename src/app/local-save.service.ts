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
    let indexedDB = window.indexedDB

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
  }

  getFromLocalStoreageByID(id){
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
          console.log("Could not find note")
        }
        else{
          console.log(getNote.result.note);
        }
      };
      getNote.onerror = function(){
        console.log(getNote)
      };


      // Close the db when the transaction is done
      tx.oncomplete = function() {
        db.close();
      };
    }
  }
}
