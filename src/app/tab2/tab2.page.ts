import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
  IonChip,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar
} from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSpinner,
    IonChip,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonProgressBar
  ]
})
export class Tab2Page implements OnInit {
  pokemon: any = null;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.loadPokemonDetails();
  }

  loadPokemonDetails() {
    this.isLoading = true;
    const pokemonName = this.route.snapshot.paramMap.get('name');

    if (pokemonName) {
      this.pokemonService.getPokemonListByName(pokemonName).subscribe({
        next: (response) => {
          this.pokemon = response;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load pokemon details:', err);
          this.isLoading = false;
        }
      });
    }
  }
}
