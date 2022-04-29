import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BobToursService {

  baseUrl = 'https://bob-tours-app.firebaseio.com';

  constructor(private http: HttpClient) { }

  getRegions(){
    let requestUrl = `${this.baseUrl}/Regions.json`;

    return this.http.get(requestUrl).toPromise();
  }
}
