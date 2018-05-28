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

  item="";

  ngOnInit() {
    console.log(this.pouchStorage);
    this.getAll()
  }


  getAll(){
    console.log("Getting all notes");
    this.pouchStorage.getAllItems().then((res) =>{
      console.log(res);
      this.noteArray = res.rows
    })
  }

    addText() {
      this.pouchStorage.addListItem(this.mainTitle, this.mainTextArea);
      this.mainTitle = "";
      this.mainTextArea = "";
      this.getAll()
    }


    getByID(id){
      this.pouchStorage.getItemByID(id).then((res) =>{
        this.returnedTitle = res.title;
        this.returnedBody = res.body;
        this.note = res;
        console.log(this.note);
      })
    }

    updateNote() {
      console.log(this.note);
      this.pouchStorage.updateNote(this.note);
      this.getAll()
    }

    addComment(comment, id){
      const newComment = {
        comment: comment,
        timestamp: new Date()
      };
      let noteWithComment;
      this.pouchStorage.getItemByID(id).then((res)=>{
        noteWithComment = res;
        noteWithComment.comments.push(newComment);
        console.log(noteWithComment);
        this.pouchStorage.updateNote(noteWithComment);
        this.getAll();
      });
    }


    removeByID(id){
      this.pouchStorage.deleteItemByID(id).then((res) =>{
        console.log(res);
        this.getAll()
      })
    }
}
