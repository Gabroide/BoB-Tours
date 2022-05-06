import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';

import { BobToursService } from './services/bob-tours.service';

import { AboutComponent } from './components/about/about.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Favourites', url: '/favourites', icon: 'star' },
    { title: 'Regions', url: '/regions', icon: 'images' },
    { title: 'Tour-types', url: '/tour-types', icon: 'bus' },
  ];
  
  settings: any = {};

  constructor(
    private btService: BobToursService,
    private popoverCtrl: PopoverController,
    private storage: Storage  
  ) {
    this.btService.initialize();
    this.initializeApp();
  }

  initializeApp(){
    this.loadSettings();
  }

  //Load settings
  loadSettings(){
    this.storage.create().then(() => {
      this.storage.get('settings').then(settings => {
        if(settings == null){
          this.settings.style = 'summer-style';
        } else {
          this.settings == settings;
        }
      });
    });
  }

  //User has changes his/her settings
  updateSettings() {
    this.storage.set('settings', this.settings);
    console.log(this.settings);
  }

  //User clicked on 'About this App'
  async about(){
    const popover = await this.popoverCtrl.create({
      component: AboutComponent,
      translucent: true
    });
    
    await popover.present();
  }
}