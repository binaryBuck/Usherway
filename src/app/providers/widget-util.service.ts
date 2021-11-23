import { Injectable } from '@angular/core';
import { ToastController, Platform, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WidgetUtilService {

  loading: any = {};

  constructor(private toastController: ToastController, private platform: Platform, private loadingController: LoadingController) { }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: this.platform.is('desktop') ? 'top': 'bottom'
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Click the backdrop to dismiss early...',
      translucent: true
    });
    return await this.loading.present();
  }

  async dismissLoader() {
    //revisit because sometimes it fails
    console.log('printing loading' + JSON.stringify(this.loading));
    await this.loading.dismiss();
  }
}
