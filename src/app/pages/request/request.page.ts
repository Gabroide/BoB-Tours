import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';

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

  validationForm: FormGroup;

  validationMessages: any;
  
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder
  ) {
    this.tour = navParams.data;
   }

  ngOnInit() {
    //Prepare form validation
    this.prepareFormValidation();

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

  prepareFormValidation() {

    this.validationForm = this.formBuilder.group({
      DesiredDate: ['', Validators.required],
      DesiredTime: new FormControl('', Validators.required),
      Language: new FormControl('english'),
      NeedBus: new FormControl(false),
      FirstName: new FormControl('', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])),
      LastName: new FormControl('', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])),
      Email: new FormControl('', Validators.compose([
        //Validators.email,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validators.required
      ]))
    });

    this.validationMessages = {
      'DesiredDate': [
        {
          type: 'required',
          message: 'Date is required.'
        }
      ],
      'DesiredTime': [
        {
          type: 'required',
          message: 'Time is required.'
        }
      ],
      'FirstName': [
        {
          type: 'required',
          message: 'First name is required.'
        },
        {
          type: 'minlength',
          message: 'First name must be at least 2 chars long.'
        },
        {
          type: 'maxlength',
          message: 'First name cannot be more than 30 chars long.'
        },
      ],
      'LastName': [
        {
          type: 'required',
          message: 'Last name is required.'
        },
        {
          type: 'minlength',
          message: 'Last name must be at least 2 chars long.'
        },
        {
          type: 'maxlength',
          message: 'Last name cannot be more than 30 chars long.'
        },
      ],
      'Email': [
        {
          type: 'required',
          message: 'Email is required.'
        },
        {
          type: 'pattern',
          message: 'Must be a valid email address.'
        },
      ],
    }

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