import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';

import { MoviesService } from '../../services/movies.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ShortMovieInfo } from '../../models/short-movie-info';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public searchControl: FormControl = new FormControl('');
  public movies$: Observable<ShortMovieInfo[]> = EMPTY;

  constructor(
    private moviesService: MoviesService,
  ) { }

  ngOnInit() {
    this.movies$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTitle: string) => this.moviesService.searchMovies(searchTitle)),
    );
  }

  trackByFn(index, item) {
    return index;
  }
}
