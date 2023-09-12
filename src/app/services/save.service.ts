import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class SaveService {
  constructor(private storage: Storage) {
    // Llama a la función para inicializar la base de datos en el constructor
    this.initStorage();
  }

  // Función para inicializar la base de datos
  private async initStorage() {
    await this.storage.create(); // Crea la base de datos
  }

  // Métodos para guardar y obtener post-its
  async guardarPostIt(cliente: string, contenido: string) {
    // Obtén la lista actual de post-its para el cliente
    const postIts = (await this.obtenerPostIt(cliente)) || [];

    // Agrega el nuevo post-it a la lista
    postIts.push({ contenido });

    // Guarda la lista actualizada de post-its
    await this.storage.set(`postIts_${cliente}`, postIts);
  }

  async obtenerPostIt(cliente: string): Promise<any[]> {
    return await this.storage.get(`postIts_${cliente}`) || [];
  }
}
