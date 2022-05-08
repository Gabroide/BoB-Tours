import { Component, OnInit } from '@angular/core';

import _ from 'lodash';

import { BobToursService } from 'src/app/services/bob-tours.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.page.html',
  styleUrls: ['./regions.page.scss'],
})
export class RegionsPage implements OnInit {

  //regions: any;

  constructor(private btService: BobToursService) { }

  ngOnInit() {
    /*this.regions = this.btService.regions;
    this.regions.forEach(region => {
      const tours = _.filter(this.btService.tours, ['Region', region.ID]);
      region['Count'] = tours.length;
    });*/
  }

}