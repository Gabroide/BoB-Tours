import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  request: any = { Language: 'english'};
  tour: any = {};

  day_after_tomorrow: string;
  two_years_later: string;

  isBusTrip: boolean;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private toastCtrl: ToastController
  ) {
    this.tour = navParams.data;
   }

  ngOnInit() {
    // Start date at the earliest the day after tomorrow
    let today = new Date();
    let day_after_tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 2);
    
    this.day_after_tomorrow = day_after_tomorrow.toISOString().slice(0, 10);

    // End date - at latest in two years
    let two_years_later = new Date(day_after_tomorrow.getTime()+1000*60*60*24*365*2);

    this.two_years_later = two_years_later.toISOString().slice(0, 10);

    //Detect if this tour is a bus trip
    this.isBusTrip = this.tour.Tourtype == 'BU';
  }

  //User clicked 'Send request'
  send(){
    this.confirm();
    console.log('Requested tour for', this.request.Date, this.request.Time);

    console.log('by ', this.request.FirstName, this.request.LastName, this.request.Email);

    this.cancel();
  }

  //User clicked 'Cancel'
  cancel(){
    this.modalCtrl.dismiss();
  }

  //Confirmation after endig the request
  async confirm(){
    const toast = await this.toastCtrl.create({
      message: 'Thank you for your request! <br> We will answer you shortly.',
      duration: 3500
    });

    toast.present();
  }
}