import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import _ from 'lodash';

import { TourTypesPage } from '../pages/tour-types/tour-types.page';

import { FavoritesService } from './favorites.service';

@Injectable({
  providedIn: 'root'
})
export class BobToursService {

  public regions: any;
  public tourtypes: any;
  public tours: any;

  baseUrl = 'https://bob-tours-app.firebaseio.com/';

  constructor(private http: HttpClient, public favService: FavoritesService) { }

  initialize() {
    this.getRegions()
      .then(data => this.regions = data);
    this.getTourtypes()
      .then(data => this.tourtypes = _.sortBy(data, 'Name'));
    this.getTours()
      .then(data => {
        this.tours = _.sortBy(data, 'Title');
        this.favService.initialize(this.tours);
      });
  }

  getRegions() {
    let requestUrl = `${this.baseUrl}/Regions.json`;
    return this.http.get(requestUrl).toPromise();
  }

  getTourtypes() {
    let requestUrl = `${this.baseUrl}/Tourtypes.json`;
    return this.http.get(requestUrl).toPromise();
  }

  getTours() {
    let requestUrl = `${this.baseUrl}/Tours.json`;
    return this.http.get(requestUrl).toPromise();
  }

}