import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
@Injectable({
  providedIn: 'root'
})
export class PouchDBStorageService {
  _id: any;
  constructor() { }
// Making of the TODO DB
  db = new PouchDB('todo'); // , {storage:'persistent'} not working in typescript without updating typings

  //Radon ID Generator
  private idGenerator() {
    return Math.random().toString(36).substr(2, 9);
  }

  async addListItem(title: string, body: string) {
    try {
      const id = this.idGenerator();
      const response = await this.db.put({
        _id: id,
        id: id,
        title: title,
        mainText: body,
      });
      console.log(response);
      return response
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async getAllItems() {
    try {
      const response = await this.db.allDocs({
        include_docs: true,
        attachments: true
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error
    }
  }


  async getItemByID(id: string) {
    try {
      const response = await this.db.get(id);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error
    }
  }


  async deleteItemByID(id: string) {
    try {
      const itemToDelete = await this.db.get(id);
      const response = await this.db.remove(itemToDelete);
      const cleanUp = await this.db.viewCleanup();
      console.log(response);
      console.log(cleanUp);
      return response;
    } catch (error) {
      console.log(error);
      return error
    }

  }

  async updateNote(note: any) {
    try {
      const response = await this.db.put({
        _id: note._id,
        _rev: note._rev,
        id: note.id,
        title: note.title,
        mainText: note.mainText,
      });
      const cleanUp = await this.db.viewCleanup();
      console.log(cleanUp);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error
    }



  }
}
