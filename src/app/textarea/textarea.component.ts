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
  title = '';

  ngOnInit() {
    console.log(this.title);
    console.log(this.pouchStorage);
  }

    addText() {
      this.pouchStorage.addListItem(this.title);
    }
}
