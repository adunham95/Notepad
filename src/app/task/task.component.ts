import {Component, Input, OnInit} from '@angular/core';
import { PouchDBStorageService } from '../services/pouch-dbstorage.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private pouchStorage: PouchDBStorageService) { }

  @Input() note: any;

  ngOnInit() {
  }

  toggleEdit(id){
    document.getElementById(id + "edit").classList.toggle("hidden");
    document.getElementById(id + "show").classList.toggle("hidden");
    document.getElementById(id + "updateButton").classList.toggle("hidden");
  }

  updateNote(id, newTitle, newBody) {
    let updatedNote;
    this.pouchStorage.getNoteByID(id).then((res)=>{
      updatedNote = res;
      updatedNote.title = newTitle;
      updatedNote.body = newBody;
      console.log(updatedNote);
      this.pouchStorage.updateNote(updatedNote);
    });
  }

  removeByID(id){
    this.pouchStorage.deleteNoteByID(id).then((res) =>{
      console.log(res);
    })
  }

  addComment(comment, id){
    const newComment = {
      comment: comment,
      timestamp: new Date()
    };
    let noteWithComment;
    this.pouchStorage.getNoteByID(id).then((res)=>{
      noteWithComment = res;
      if (noteWithComment.comments === ""){
        noteWithComment.comments = [];
        noteWithComment.comments.push(newComment);
      }
      else { noteWithComment.comments.push(newComment); }
      console.log(noteWithComment);
      this.pouchStorage.updateNote(noteWithComment);
    });
  }

}
