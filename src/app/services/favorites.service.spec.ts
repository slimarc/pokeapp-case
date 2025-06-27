import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let store: { [key: string]: string } = {};
  const mockLocalStorage = {
    getItem: (key: string): string | null => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };

  beforeEach(() => {
    store = {};
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);

    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a pokemon to favorites when toggled for the first time', () => {
    const pokemonName = 'pikachu';
    expect(service.isFavorite(pokemonName)).toBeFalse();
    service.toggleFavorite(pokemonName);
    expect(service.isFavorite(pokemonName)).toBeTrue();
  });

  it('should remove a pokemon from favorites when toggled for the second time', () => {
    const pokemonName = 'charmander';
    service.toggleFavorite(pokemonName);
    expect(service.isFavorite(pokemonName)).toBeTrue();
    service.toggleFavorite(pokemonName);
    expect(service.isFavorite(pokemonName)).toBeFalse();
  });

  it('should correctly load favorites from localStorage on initialization', () => {
    store['pokemonFavorites'] = JSON.stringify(['bulbasaur']);
    service.loadFavorites();
    expect(service.isFavorite('bulbasaur')).toBeTrue();
    expect(service.isFavorite('pikachu')).toBeFalse();
  });
});
