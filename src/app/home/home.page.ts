import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Network } from '@capacitor/network';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, 
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonButton,
    CommonModule
  ],
  standalone: true
})
export class HomePage {
  location: any = null;
  imageUrl?: string;
  networkStatus: any;

  async getLocation() {
    try {
      const pos = await Geolocation.getCurrentPosition();
      this.location = pos.coords;
    } catch (error) {
      console.error('Error al obtener ubicación', error);
    }
  }

  async takePicture() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
      this.imageUrl = photo.webPath;
    } catch (error) {
      console.error('Error al tomar foto', error);
    }
  }

  async checkNetwork() {
    try {
      const status = await Network.getStatus();
      this.networkStatus = status;
    } catch (error) {
      console.error('Error al verificar red', error);
    }
  }
}
