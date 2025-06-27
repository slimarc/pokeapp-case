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
  IonProgressBar,
  NavController
} from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
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
export class DetailsPage implements OnInit {
  pokemon: any = null;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private navCtrl: NavController
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

  goBack() {
    this.navCtrl.back();
  }
}
