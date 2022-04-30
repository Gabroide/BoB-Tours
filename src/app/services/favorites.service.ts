import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  public favIDs: Array<number>;
  public favTours: Array<any>;

  constructor() { }

  initialize(tours){
    this.favTours = [];
    this.favIDs = JSON.parse(window.localStorage.getItem('favoritesIDs'));

    if(this.favIDs == null){
      this.favIDs = [];
    } else {
      tours.forEach(tour => {
        if(this.favIDs.indexOf(tour.ID) != -1){
          tours.favTours.push(tour);
        }
      });
    }
  }

  add(tour){
    this.favIDs.push(tour.ID);
    this.favTours.push(tour);

    window.localStorage.setItem('FavoritesISd', JSON.stringify(this.favIDs));
  }

  remove(tour){
    let removeIndex: number = this.favIDs.indexOf(tour.ID);

    if(removeIndex != -1){
      this.favIDs.splice(removeIndex, 1);
      this.favTours.slice(removeIndex, 1);

      window.localStorage.setItem('FavoriteIDs', JSON.stringify(this.favIDs));
    }
  }
}
