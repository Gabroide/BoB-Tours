import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import _ from 'lodash';

import { TourTypesPage } from '../pages/tour-types/tour-types.page';

@Injectable({
  providedIn: 'root'
})
export class BobToursService {

  public regions: any;
  public tourtypes: any;

  baseUrl = 'https://bob-tours-app.firebaseio.com';

  constructor(private http: HttpClient) { }

  initialize(){
    this.getRegions()
    .then(data => this.regions = data);

    this.getTourTypes()
    .then(data => this.tourtypes = _.sortBy(data, 'Name'));
  }

  getRegions(){
    let requestUrl = `${this.baseUrl}/Regions.json`;

    return this.http.get(requestUrl).toPromise();
  }

  getTourTypes(){
    let requestUrl =`${this.baseUrl}/Tourtypes.json`;

    return this.http.get(requestUrl).toPromise();
  }
}