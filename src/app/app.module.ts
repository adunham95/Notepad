import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextareaComponent } from './textarea/textarea.component';
import { FormsModule } from '@angular/forms';
import { PouchDBStorageService} from './services/pouch-dbstorage.service';
@NgModule({
  declarations: [
    AppComponent,
    TextareaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [PouchDBStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
