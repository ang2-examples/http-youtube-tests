
import {Component} from "@angular/core";
import {SearchResult} from "./search-result.model";

let loadingGif: string = ((<any>window).__karma__) ? '' : require('images/loading.gif');

@Component({
  selector: 'youtube-search',
  template: `
  <div class='container'>
      <div class="page-header">
        <h1>YouTube Search
          <img style="float: right;" *ngIf="loading" src='${loadingGif}' />
        </h1>
      </div>

      <div class="row">
        <div class="input-group input-group-lg col-md-12">
          <search-box
             (loading)="loading = $event"
             (results)="updateResults($event)"
              ></search-box>
        </div>
      </div>

      <div class="row">
        search result here
        <!--<search-result
          *ngFor="let result of results"
          [result]="result">
        </search-result>-->
      </div>
  </div>
  `
})

export class YouTubeSearchComponent {
  results: SearchResult[];

  updateResults(results: SearchResult[]): void {
    this.results = results;
    // console.log("results:", this.results); // uncomment to take a look
  }
}
