import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string | null;
  results: any[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number = 0, limit: number = 20): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
  }
  getPokemonListByName(name: string) {
    return this.http.get(`${this.baseUrl}/pokemon/${name}`);
  }

}
