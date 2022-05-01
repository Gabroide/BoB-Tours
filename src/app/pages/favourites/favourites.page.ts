import { Component, OnInit } from '@angular/core';

import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  /* tours = [
    { ID: 1, Title: 'City walk' },
    { ID: 2, Title: 'On the trails of Beethoven' },
    { ID: 3, Title: 'Villa Hammerschmidt' }
  ]; */

  constructor(public favService: FavoritesService) { }

  ngOnInit() {
  }

}