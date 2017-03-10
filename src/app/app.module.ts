import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SimpleHTTPComponent } from './components/simple-http-request';

import { youTubeServiceInjectables } from "./components/youtube-search/youtube.service";
import { YouTubeSearchComponent } from "./components/youtube-search/youtube-search.component"
import { SearchBoxComponent } from "./components/youtube-search/search-box.component"

@NgModule({
  declarations: [
    AppComponent,
    SimpleHTTPComponent,

    YouTubeSearchComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    youTubeServiceInjectables
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
