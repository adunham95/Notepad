import { Component, OnInit } from '@angular/core';
import { PouchDBStorageService } from '../services/pouch-dbstorage.service';
@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  note: any;
  constructor( private pouchStorage: PouchDBStorageService) { }

  mainTitle = 'Title';
  mainTextArea = 'Text Area';
  noteID = '';
  noteArray;

  //Returned Item
  returnedTitle = "";
  returnedBody = "";

  ngOnInit() {
    console.log(this.pouchStorage);
    console.log("Getting all notes");
    this.pouchStorage.getAllItems().then((res) =>{
      console.log(res)
    })
  }

    addText() {
      this.pouchStorage.addListItem(this.mainTitle, this.mainTextArea);
    }


    getByID(){
      this.pouchStorage.getItemByID(this.noteID).then((res) =>{
        this.returnedTitle = res.title;
        this.returnedBody = res.mainText;
        this.note = res;
        console.log(this.note);
      })
    }

    updateNote() {
      this.pouchStorage.updateNote(this.note);
    }

    removeByID(){
      this.pouchStorage.deleteItemByID(this.noteID).then((res) =>{
        console.log(res)
      })
    }
}
