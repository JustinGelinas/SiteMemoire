import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

declare var google: any;

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
  clientId = environment.clientId;
  accessToken = ''; // Ce jeton doit être obtenu via une connexion utilisateur (Google Auth)

  driveId = '14hvtSKfW4mzg9-BbCySafLJNAFUUeZc2';

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
    // On charge le script d'authentification Google
    this.loadGoogleScript();

    //Affiche la première photo
    this.displayNextPhoto();

    //Démarre le timer
    this.startTimer();
  }

  loadGoogleScript(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: this.clientId,
        scope: 'https://www.googleapis.com/auth/drive.readonly',
        callback: (response: any) => {
          if (response.access_token) {
            this.accessToken = response.access_token;
            this.getPhotos();
          }
        },
      });
      // Note: Cela ouvrira une popup. Les navigateurs peuvent bloquer ceci s'il n'y a pas d'interaction utilisateur (clic).
      client.requestAccessToken();
    };
    document.body.appendChild(script);
  }

  async getPhotos(): Promise<void> {
    // On prépare l'en-tête Authorization avec le jeton d'accès
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    var result = await firstValueFrom(this.httpClient.get("https://www.googleapis.com/drive/v3/drives/14hvtSKfW4mzg9-BbCySafLJNAFUUeZc2?fields=user,storageQuota", { headers: headers }));
    console.log(result);
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
