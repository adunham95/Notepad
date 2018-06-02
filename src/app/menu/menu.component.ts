import {Component, Input, OnInit} from '@angular/core';
import { PouchDBStorageService } from '../services/pouch-dbstorage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private pouchStorage: PouchDBStorageService) { }

  @Input() projectArray;

  mainTitle = '';
  mainTextArea = '';
  selectedProject;
  noteID = '';


  //Projects
  projectName ='';

  //Returned Item
  returnedTitle = "";
  returnedBody = "";

  addMenu;

  ngOnInit() {
    this.addMenu =document.querySelector(".menu");
  }


  addText() {
    this.pouchStorage.addListItem(this.mainTitle, this.mainTextArea, this.selectedProject).then( (res)=>{
        this.mainTitle = "";
        this.mainTextArea = "";
      this.addMenu.classList.toggle("hidden")
      }
    );
  }

  addProject() {
    this.pouchStorage.createProject(this.projectName).then((res)=>{
      this.projectName = "";
      this.addMenu.classList.toggle("hidden")
    });
  }

  showAddMenu(){
    console.log("Toggleing Menu Menu");
    this.addMenu.classList.toggle("hidden")
  }
}
