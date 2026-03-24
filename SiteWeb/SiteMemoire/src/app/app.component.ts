import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Site Memoire';

  timeBetweenPhotoSeconds = 10;

  currentPhotoIndex = -1;

  apiKey = environment.apiKey;

  readonly PhotoPathPrefix = 'assets/tempPics/';

  listOfPhotos =
    [
      this.PhotoPathPrefix + 'WIN_20220312_09_48_30_Pro.jpg',
      this.PhotoPathPrefix + 'WIN_20220312_10_01_49_Pro.jpg',
      this.PhotoPathPrefix + 'WIN_20221030_16_54_54_Pro.jpg',
    ]

  currentPhotoPath = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    //Fonction pour aller chercher les photos
    this.getPhotos();
    //Affiche la première photo
    this.displayNextPhoto();

    //Démarre le timer
    this.startTimer();
  }

  getPhotos(): void {
    //this.httpClient.get("", { key: "value" })
  }

  displayNextPhoto(): void {
    this.currentPhotoIndex++;
    if (this.currentPhotoIndex >= this.listOfPhotos.length)
      this.currentPhotoIndex = 0;
    this.currentPhotoPath = this.listOfPhotos[this.currentPhotoIndex];
  }

  startTimer(): void {
    setTimeout(
      () => {
        this.displayNextPhoto();
        this.startTimer();
      },
      this.timeBetweenPhotoSeconds * 1000
    )
  }
}
