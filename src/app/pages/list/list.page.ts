import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';

import { BobToursService } from 'src/app/services/bob-tours.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  tours: any;
  selection: any;

  constructor(
    private btService: BobToursService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.selection = this.activatedRoute.snapshot.params;
    let category = this.selection.Category;
    let criteria = this.selection.Criteria;
    this.tours = _.filter(
      this.btService.tours,
      [category, criteria]
    );
  }
  
  // User typed a search term into the Searchbar
  search(ev) {

    let searchText = ev.detail.value;

    // 1st filter by category & criteria
    this.tours = _.filter(this.btService.tours,
      [this.selection.Category,
      this.selection.Criteria]);

    // 2nd filter by searchText (if not empty)                     
    if (searchText != '') {
      this.tours = this.tours.filter((tour) => {
        return (tour.Title.toLowerCase()
          .indexOf(searchText.toLowerCase()) > -1);
      });
    }
  }
}