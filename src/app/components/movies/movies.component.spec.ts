import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MoviesComponent } from './movies.component';
import { MoviesService } from '../../services/movies.service';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let service: MoviesService;

  const moviesServiceStub = {
    searchMovies: (title: string) => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesComponent ],
      providers: [{ provide: MoviesService, useValue: moviesServiceStub }],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(MoviesService);
  });

  it('Должен быть создан', () => {
    expect(component).toBeTruthy();
  });

  it('Должен начать поиск фильмов для строки "Fast and the"', fakeAsync(() => {
    const searchString = 'Fast and the';
    const searchSpy = spyOn(service, 'searchMovies');
    component.movies$.subscribe();
    component.searchControl.patchValue(searchString);
    tick();
    expect(searchSpy).toHaveBeenCalledWith(searchString);
  }));
});
