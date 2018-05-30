import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
@Injectable({
  providedIn: 'root'
})
export class PouchDBStorageService {
  _id: any;
  constructor() { }
// Making of the TODO DB
  dbNotes = new PouchDB('notes'); // , {storage:'persistent'} not working in typescript without updating typings
  dbProjects = new PouchDB('projects'); // , {storage:'persistent'} not working in typescript without updating typings

  //Radon ID Generator
  private idGenerator() {
    return Math.random().toString(36).substr(2, 9);
  }

  async addListItem(title: string, body: string, projectId?: string) {
    try {
      const id = this.idGenerator();
      //If the projectID is empty use the scratch project
      let project: any;
      if(typeof projectId !== "undefined"){
         project = await this.getProjectByID(projectId);
      }
      else{
        project = await this.getProjectByID("12345");
      }
      console.log(project);
      const newNote = {
        _id: id,
        id: id,
        timestamp: new Date(),
        title: title,
        body: body,
        projectTitle: project.name,
        projectID: project.id,
        comments: []
      };

      const response = await this.dbNotes.put(newNote);
      console.log(response);
      project.notes.push(newNote.id);
      await this.updateProject(project);
      return response
    } catch (error) {
      console.warn(error);
      return error
    }
  }

  async getAllNotes() {
    try {
      const response = await this.dbNotes.allDocs({
        include_docs: true,
        attachments: true
      });
      console.log(response);
      return response;
    } catch (error) {
      console.warn(error);
      return error
    }
  }


  async getNoteByID(id: string) {
    try {
      const response = await this.dbNotes.get(id);
      console.log(response);
      return response;
    } catch (error) {
      console.warn(error);
      return error
    }
  }

  //TODO add the ability to removed notes from the
  async deleteNoteByID(id: string) {
    try {
      let itemToDelete: any;
      itemToDelete = await this.dbNotes.get(id);
      const projectID = itemToDelete.projectID;
      const response = await this.dbNotes.remove(itemToDelete);
      const cleanUp = await this.dbNotes.viewCleanup();
      const project = await this.getProjectByID(projectID);
      project.notes = project.notes.filter(id);
      console.log(response);
      console.log(cleanUp);
      return response;
    } catch (error) {
      console.warn(error);
      return error
    }

  }

  async updateNote(note: any) {
    try {
      const response = await this.dbNotes.put({
        _id: note._id,
        _rev: note._rev,
        id: note.id,
        timestamp: new Date(),
        title: note.title,
        body: note.body,
        projectTitle: note.projectTitle,
        projectID: note.projectID,
        comments: note.comments,
      });
      const cleanUp = await this.dbNotes.viewCleanup();
      console.log(cleanUp);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async createProject(name: any, id?: string) {
    console.log(id);
    try {
      if(typeof id == "undefined"){
        id = this.idGenerator();
      }
      const response = await this.dbProjects.put({
        _id: id,
        id: id,
        timestamp: new Date(),
        name: name,
        notes: []
      });
      console.log(response);
      return response
    } catch (error) {
      console.warn(error);
      return error
    }
  }

  async getProjectByID(id: any) {
    try {
      const response = await this.dbProjects.get(id);
      console.log(response);
      return response;
    } catch (error) {
      console.warn(error);
      return error
    }
  }

  async getAllProjects() {
    try {
      const response = await this.dbProjects.allDocs({
        include_docs: true,
        attachments: true
      });
      console.log(response);
      return response;
    } catch (error) {
      console.warn(error);
      return error
    }
  }


  async updateProject(project: any) {
    try {
      const response = await this.dbProjects.put({
        _id: project.id,
        _rev: project._rev,
        id: project.id,
        timestamp: project.timestamp,
        name: project.name,
        notes: project.notes
      });
      console.log(response);
      return response
    } catch (error) {
      console.warn(error);
      return error
    }
  }





}
