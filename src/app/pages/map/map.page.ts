import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  currentView = 'map';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
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