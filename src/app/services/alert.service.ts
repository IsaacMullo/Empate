import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  async mostrarMensajeInicial() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Si la plantilla es nueva antes de crear post-its, por favor presione el botón "Guardar" para crear al cliente.',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
