import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Site Memoire';

  readonly PhotoPathPrefix = 'assets/tempPics/';
  currentPhotoPath = this.PhotoPathPrefix + 'WIN_20220312_10_01_49_Pro.jpg';
}
