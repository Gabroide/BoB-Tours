import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  tours = [
    { ID: 1, Title: 'City Walk' },
    { ID: 2, Title: 'On the trails of Beethoven' },
    { ID: 3, Title: 'Villa Hammerschmidt' },
  ]

  constructor() { }

  ngOnInit() {
  }

}
