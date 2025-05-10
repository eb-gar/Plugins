import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Network } from '@capacitor/network';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
})

export class HomePage {
  location: any = null;
  imageUrl: string | undefined;
  networkStatus: any;

  async getLocation() {
    try {
      const pos = await Geolocation.getCurrentPosition();
      this.location = pos.coords;
    } catch (err) {
      console.error('Error al obtener ubicación', err);
    }
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
      this.imageUrl = image.webPath;
    } catch (err) {
      console.error('Error al tomar la foto', err);
    }
  }

  async checkNetwork() {
    try {
      const status = await Network.getStatus();
      this.networkStatus = status;
      console.log('Estado de red:', status);
    } catch (err) {
      console.error('Error al obtener estado de red', err);
    }
  }
}