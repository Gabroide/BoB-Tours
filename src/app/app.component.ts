import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

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
    private popoverCtrl: PopoverController  
  ) {
    this.btService.initialize();
  }

  updateSettings() {
    console.log(this.settings.notifications);
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