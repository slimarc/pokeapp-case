import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        PokemonService
      ]
    });

    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch pokemon details by name', () => {
    const mockPokemon = { id: 25, name: 'pikachu', height: 4 };
    const pokemonName = 'pikachu';

    service.getPokemonListByName(pokemonName).subscribe(data => {
      expect(data).toEqual(mockPokemon);
    });

    const req = httpTestingController.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockPokemon);
  });
});
