import { Component, OnInit } from '@angular/core';
import {LocalSaveService} from '../local-save.service'

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  constructor(private localSave: LocalSaveService) { }

  mainTitle = "Title";
  mainTextArea = "Text Area";
  noteID = "";

  ngOnInit() {
  }

  saveText(){
    console.log("Inside Save Text");
    let text = this.mainTextArea;
    let title = this.mainTitle;
    console.log(text);
    this.localSave.saveToLocalStorage(text, title)
  }

  getByID(){
    this.localSave.getFromLocalStoreageByID(this.noteID);
  }

}
