import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  currentView = 'map';

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController, 
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.calcRoute();
  }

  //Calcylate a route
  async calcRoute() {
    const loading = await this.loadingCtrl.create({
      message: 'Calculate route ...',
      spinner: 'crescent'
    });

    await loading.present();

    const geo = await this.geolocation.getCurrentPosition();

    console.log(geo.coords.latitude, geo.coords.longitude);

    loading.dismiss();
  }

  //User changed a segment
  currentViewChanged(ev){
    console.log(ev.detail.value);
    console.log(this.currentView);
  }

  close(){
    this.modalCtrl.dismiss();
  }
}