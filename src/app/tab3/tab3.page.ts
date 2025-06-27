import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonSpinner,
  IonText
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonSpinner,
    IonText
  ]
})
export class Tab3Page implements OnInit {
  favoritePokemons: any[] = [];
  isLoading: boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.loadFavoritePokemons();
  }

  ionViewWillEnter() {
    this.loadFavoritePokemons();
  }

  loadFavoritePokemons() {
    this.isLoading = true;
    const favoriteNames = this.favoritesService.getFavorites();

    if (favoriteNames.length === 0) {
      this.favoritePokemons = [];
      this.isLoading = false;
      return;
    }

    const pokemonRequests = favoriteNames.map(name =>
      this.pokemonService.getPokemonListByName(name)
    );

    forkJoin(pokemonRequests).subscribe({
      next: (pokemons) => {
        this.favoritePokemons = pokemons;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Falha ao carregar pokemons favoritos', err);
        this.isLoading = false;
      }
    });
  }
}
