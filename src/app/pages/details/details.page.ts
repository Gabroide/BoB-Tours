import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';

import { BobToursService } from 'src/app/services/bob-tours.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  tour = null;

  isFavorite: boolean;

  constructor(private activatedRoute: ActivatedRoute, private btService: BobToursService, public favService: FavoritesService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.tour = _.find(this.btService.tours, ['ID', parseInt(id)]);
    this.isFavorite = this.favService.favIDs.indexOf(parseInt(id)) != -1;
  }

}