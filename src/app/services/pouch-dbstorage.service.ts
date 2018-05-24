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

  async addListItem(text: string) {
    try {
      const response = await this.db.put({
        _id: '1',
        title: 'Heroes',
        boxText: text
      });
    } catch (error) {
      console.log(error);
    }
  }
}
