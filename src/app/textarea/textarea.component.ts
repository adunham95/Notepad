import { Component, OnInit } from '@angular/core';
import {LocalSaveService} from '../local-save.service'

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  constructor(private localSave: LocalSaveService) { }

  mainTextArea = 'initial value';
  noteID = "";

  ngOnInit() {
  }

  saveText(){
    console.log("Inside Save Text");
    let text = this.mainTextArea;
    console.log(text);
    this.localSave.saveToLocalStorage(text)
  }

  getByID(){
    this.localSave.getFromLocalStoreageByID(this.noteID);
  }

}
