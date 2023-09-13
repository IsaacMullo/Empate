import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface PostIt {
  x: number;
  y: number;
  content: string;
}

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

  // Método para guardar un post-it completo con posición y contenido
  async guardarPostIt(cliente: string, newPostIt: PostIt) {
    // Obtén la lista actual de post-its asociados al cliente
    const postIts = (await this.obtenerPostIts(cliente)) || [];
  
    // Agrega el nuevo post-it a la lista
    postIts.push(newPostIt);
  
    // Guarda la lista actualizada de post-its asociados al cliente
    await this.storage.set(cliente, postIts);
  }  

  // Método para obtener todos los post-its asociados a un cliente específico
  async obtenerPostIts(cliente: string): Promise<PostIt[]> {
    return (await this.storage.get(cliente)) || [];
  }

  // Método para obtener la lista de clientes
  async obtenerClientes(): Promise<string[]> {
    const keys = await this.storage.keys(); // Obtén todas las claves (nombres de clientes)
    return keys || [];
  }
}
