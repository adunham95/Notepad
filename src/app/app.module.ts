import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextareaComponent } from './textarea/textarea.component';
import { FormsModule } from '@angular/forms';
import { PouchDBStorageService} from './services/pouch-dbstorage.service';
import { MenuComponent } from './menu/menu.component';
import { TaskComponent } from './task/task.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    TextareaComponent,
    MenuComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [PouchDBStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
