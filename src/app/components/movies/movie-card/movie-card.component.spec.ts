import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { MovieCardComponent } from './movie-card.component';
import { ShortMovieInfo } from '../../../models/short-movie-info';
import { MovieComponent } from '../../movie/movie.component';
import { DefaultImagePipe } from '../../../pipes/default-image.pipe';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent; // Компонент
  let fixture: ComponentFixture<MovieCardComponent>; // Окружение для компонента
  let router: Router; // Сервис роутер
  let element: HTMLElement; // HTML элемент нашего компонента

  // Тестовый объект movie
  const movie: ShortMovieInfo = {
    Poster: 'https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    Title: 'The Fast and the Furious',
    Type: 'movie',
    Year: '2001',
    imdbID: 'tt0232500',
  };

  // beforeEach - метод вызываемый перед каждым тестом (it'ом)
  // Тут происходит подготовка модуля и "компиляция" компонента
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([{ path: 'movie/:id', component: MovieComponent }]) ],
      declarations: [ MovieCardComponent, MovieComponent, DefaultImagePipe ],
    })
    .compileComponents();
  }));

  // После того как все компоненты откомпилированы, мы начинаем работу с ними
  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    router = TestBed.get(Router); // Получаем сервис роутер с окружения
    component.movie = movie; // Задаем @Input() movie
    fixture.detectChanges(); // Вызываем изменения в компоненте
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
    const navigateSpy = spyOn(router, 'navigate'); // Подписываемся на метод navigate в сервисе router
    component.openMovie(movie.imdbID);
    expect(navigateSpy).toHaveBeenCalledWith(['movie', movie.imdbID]);
  });

  it('Открыть фильм по клику', () => {
    const openSpy = spyOn(component, 'openMovie');
    // element.querySelector('div').dispatchEvent(new Event('click'));
    const card = fixture.debugElement.query(By.css('div'));
    card.triggerEventHandler('click', null);
    expect(openSpy).toHaveBeenCalledWith('tt0232500');
  });

});
