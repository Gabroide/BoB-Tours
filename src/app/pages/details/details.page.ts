import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';

import { BobToursService } from 'src/app/services/bob-tours.service';
import { FavoritesService } from 'src/app/services/favorites.service';

import { ActionSheetController, AlertController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  tour = null;
  isFavorite: boolean;
  
  region: string;
  tourtype: string;

  showSocial: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    public btService: BobToursService,
    public favService: FavoritesService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tour = _.find(this.btService.tours, ['ID', parseInt(id)]);
    this.isFavorite = this.favService.favIDs.indexOf(parseInt(id)) != -1;
    this.region = _.find(this.btService.regions, { 'ID': this.tour.Region }).Name;
    this.tourtype = _.find(this.btService.tourtypes, { 'ID': this.tour.Tourtype }).Name;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Tour',
      buttons: [
        {
          text: 'Request',
          handler: () => {
            // We implement this later with a Modal Controller.
            window.location.href = "/request";
          }
        },
        {
          text: (this.isFavorite) ? 'Remove from Favorites'
            : 'Add to Favorites',
          role: (this.isFavorite) ? 'destructive' : '',
          handler: () => {
            if (this.isFavorite) {
              this.presentAlert();
            } else {
              this.favService.add(this.tour);
              this.isFavorite = true;
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Remove Favorite?',
      message: 'Do you really want to remove this Favorite?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes',
          handler: () => {
            this.favService.remove(this.tour);
            this.isFavorite = false;
          }
        }
      ]
    });
    await alert.present();
  }

  //User clicked share button
  toggleSocial(){
    this.showSocial = !this.showSocial;
  }

  //User clicked one of the social app buttons
  openSocial(app){
    console.log('User wants toshare this tour via ' + app + '!');
  }
}