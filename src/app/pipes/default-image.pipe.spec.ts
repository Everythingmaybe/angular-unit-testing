import { DefaultImagePipe, defaultSrc } from './default-image.pipe';

describe('DefaultImagePipe', () => {
  let pipe: DefaultImagePipe;
  beforeEach(() => {
    pipe = new DefaultImagePipe();
  });

  it('Должен быть создан', () => {
    expect(pipe).toBeTruthy();
  });

  it('Должен вернуть картинку по умолчанию для пустого src', () => {
    expect(pipe.transform('')).toEqual(defaultSrc);
  });

  it('Должен вернуть картинку по умолчанию для src === N/A', () => {
    expect(pipe.transform('N/A')).toEqual(defaultSrc);
  });

  it('Должен вернуть переданное src картинки', () => {
    const src = 'https://m.media-amazon.com/images/M/MV5BODRmY2NhNDItOWViNi00OTIyLTk3YjYtYzY0YTFlMDg1YzQ0L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg';
    expect(pipe.transform(src)).toEqual(src);
  });
});
