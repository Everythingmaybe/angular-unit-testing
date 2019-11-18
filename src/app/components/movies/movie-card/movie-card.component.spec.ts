import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardComponent } from './movie-card.component';
import { ShortMovieInfo } from '../../../models/short-movie-info';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MovieComponent } from '../../movie/movie.component';
import {DefaultImagePipe} from "../../../pipes/default-image.pipe";

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let router: Router;
  let element: HTMLElement;

  // Test movie
  const movie: ShortMovieInfo = {
    Poster: "https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    Title: "The Fast and the Furious",
    Type: "movie",
    Year: "2001",
    imdbID: "tt0232500",
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([{ path: 'movie/:id', component: MovieComponent }]) ],
      declarations: [ MovieCardComponent, MovieComponent, DefaultImagePipe ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    router = TestBed.get(Router);
    component.movie = movie;
    fixture.detectChanges();
  });

  it('Должен быть создан', () => {
    expect(component).toBeTruthy();
  });

  it('Должен иметь название', () => {
    const title = element.querySelector('h4');
    expect(title.textContent).toContain(movie.Title);
  });

  it('Должен иметь постер', () => {
    const poster = element.querySelector('img');
    expect(poster.getAttribute('src')).toContain(movie.Poster);
  });

  it('Должен иметь тип', () => {
    const type = element.querySelector('.type');
    expect(type.textContent).toContain(movie.Type);
  });

  it('Должен иметь год выпуска', () => {
    const year = element.querySelector('.year');
    expect(year.textContent).toContain(String(movie.Year));
  });

  it('Должен переходить к фильму', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.openMovie(movie.imdbID);
    expect(navigateSpy).toHaveBeenCalledWith(['movie', movie.imdbID]);
  });


});
