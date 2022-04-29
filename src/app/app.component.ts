import { Component } from '@angular/core';
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
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
