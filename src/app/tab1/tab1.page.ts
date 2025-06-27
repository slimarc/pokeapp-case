import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  LoadingController,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonSpinner
} from '@ionic/angular/standalone';
import { PokemonService } from "../services/pokemon.service";
import { RouterLink } from "@angular/router";
import { addIcons } from 'ionicons';
import { arrowBackCircle, arrowForwardCircle, heart, heartOutline } from 'ionicons/icons';
import {FavoritesService} from "../services/favorites.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonSpinner,
    RouterLink
  ],
})
export class Tab1Page implements OnInit {
  pokemonId: number = 1;
  currentPokemon: any = null;
  isLoading: boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private loadingCtrl: LoadingController,
    public favoritesService: FavoritesService
  ) {
    addIcons({ arrowBackCircle, arrowForwardCircle, heart, heartOutline });
  }

  ngOnInit() {
    this.loadPokemon();
  }

  async loadPokemon() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.pokemonService.getPokemonListByName(this.pokemonId.toString()).subscribe({
      next: (response) => {
        this.currentPokemon = response;
        this.isLoading = false;
        loading.dismiss();
      },
      error: (err) => {
        console.error('Failed to load Pokémon:', err);
        this.isLoading = false;
        loading.dismiss();
      }
    });
  }

  nextPokemon() {
    this.pokemonId++;
    this.loadPokemon();
  }

  previousPokemon() {
    if (this.pokemonId > 1) {
      this.pokemonId--;
      this.loadPokemon();
    }
  }

}
