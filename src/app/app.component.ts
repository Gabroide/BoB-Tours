import { Component } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import{ Router } from '@angular/router';

import { BobToursService } from './services/bob-tours.service';

import { AboutComponent } from './components/about/about.component';
import { ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';

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
    { title: 'Slideshow', url: '/slideshow', icon: 'play' },
  ];
  
  settings: any = {};
  price: any = { lower: 80, upper: 400 };
  
  hits: number = 24;

  constructor(
    private btService: BobToursService,
    private popoverCtrl: PopoverController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private router: Router,
    private localNotifications: LocalNotifications  
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.btService.initialize();
    this.loadSettings();
  }

  // Load settings
  loadSettings() {
    this.storage.create().then(() => {
      this.storage.get('settings').then(settings => {
        if (settings == null) {
          this.settings.style = 'summer-style';
        } else {
          this.settings = settings;
        }
      });
    });
  }

  // User has changed his/her settings.
  updateSettings() {
    this.storage.set('settings', this.settings);
    this.setNotification();
  }

  // User clicked on 'About this app'
  async about() {
    const popover = await this.popoverCtrl.create({
      component: AboutComponent,
      translucent: true
    });
    await popover.present();
  }

  //A week notification is scheduled if notificatuins are activated
  setNotification(){
    if(this.settings.notifications == true){
      this.localNotifications.schedule({
        id: 1,
        title: 'BoB Toursrecommends: ',
        text: 'Fid a tour and enjoy life! Tap here...',
        data: { path: ELocalNotificationTriggerUnit.WEEK }
      });

      this.onNotificationClock();
      //cancels/deactivates notifications
    } else {
      this.localNotifications.cancelAll();
    }
  }

  //User clicked on Notification. The app shows a message. After user clicked the button shows the slideshow
  onNotificationClock(){
    this.localNotifications.on('click').subscribe(notification => {
      let path = notification.data ? notification.data.path : '/';

      this.alertCtrl.create({
        header: notification.Title,
        message: 'Be inspired by the following slideshow and book a tour!',
        buttons: [{
          text:'Good idea!',
          handler: () => this.router.navigateByUrl(path)
        }]
      }).then( alert => alert.present());
    });
  }

  // User has changed price range.
  filterByPrice() {
    this.hits = this.btService.filterTours(this.price);
  }

  ngOnInit() { }

}