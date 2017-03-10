/*
  SearchBox displays the search box and emits events based on the results
*/

import {Component, EventEmitter, OnInit, ElementRef} from "@angular/core";
import {SearchResult} from "./search-result.model";
import {YouTubeService} from "./youtube.service";
import {Observable} from "rxjs";

@Component({
  outputs: ['loading', 'results'],
  selector: 'search-box',
  template: ` <input type="text" class="form-control" placeholder="Search" autofocus> `,
  providers: [YouTubeService]
})

export class SearchBoxComponent implements OnInit {
  loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtubeService: YouTubeService,
              private el: ElementRef) {
  }

  ngOnInit(): void {
    // convert the `keyup` event into an observable stream
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value) // extract the value of the input
      .filter((text: string) => text.length > 1) // filter out if empty
      .debounceTime(250) // only once every 250ms
      .do(() => this.loading.next(true)) // enable loading
      // search, discarding old events if new input comes in
      .map((query: string) => this.youtubeService.search(query))
      .switch()
      // act on the return of the search
      .subscribe(
        (results: SearchResult[]) => { // on success
          this.loading.next(false);
          this.results.next(results);
        },
        (err: any) => { // on error
          console.log(err);
          this.loading.next(false);
        },
        () => { // on completion
          this.loading.next(false);
        }
      );
  }
}
