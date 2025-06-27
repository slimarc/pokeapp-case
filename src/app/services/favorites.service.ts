import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesKey = 'pokemonFavorites';
  private favorites: string[] = [];

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites() {
    const storedFavorites = localStorage.getItem(this.favoritesKey);
    this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  private saveFavorites() {
    localStorage.setItem(this.favoritesKey, JSON.stringify(this.favorites));
  }

  isFavorite(pokemonName: string): boolean {
    return this.favorites.includes(pokemonName);
  }

  toggleFavorite(pokemonName: string): void {
    const index = this.favorites.indexOf(pokemonName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(pokemonName);
    }
    this.saveFavorites();
  }

  getFavorites(): string[] {
    return [...this.favorites];
  }
}
