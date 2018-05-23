import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalSaveService {

  constructor() { }

  saveToLocalStorage(data){
    // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
    let open = indexedDB.open("Notes", 1);

// Create the schema
    open.onupgradeneeded = function() {
      let db = open.result;
      let store = db.createObjectStore("NotesStore", {keyPath: "id"});
      let index = store.createIndex("NoteIndex", ["note.content", "note.date"]);
    };

    open.onsuccess = function() {
      // Start a new transaction
      let db = open.result;
      let tx = db.transaction("NotesStore", "readwrite");
      let store = tx.objectStore("NotesStore");
      let index = store.index("NoteIndex");

      //Id generator
      const id = new Date();

      // Save the Date
      const date = new Date();

      // Add some data
      store.put({id: id, note: {content: data, date: date }});

      // // Query the data
      // let getJohn = store.get(12345);
      // let getBob = index.get(["Smith", "Bob"]);

      // getJohn.onsuccess = function() {
      //   console.log(getJohn.result.name.first);  // => "John"
      // };
      //
      // getBob.onsuccess = function() {
      //   console.log(getBob.result.name.first);   // => "Bob"
      // };

      // Close the db when the transaction is done
      tx.oncomplete = function() {
        db.close();
      };
    }
  }
}
