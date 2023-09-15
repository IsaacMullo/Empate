import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface PostIt {
  id: string;
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
  // Obtén la lista actual de post-its
  const postItsData = (await this.storage.get('postIts')) || {};

  // Verifica si existe una matriz de post-its para el cliente, si no, crea una nueva
  if (!postItsData[cliente]) {
    postItsData[cliente] = [];
  }

  // Encuentra y actualiza el post-it existente por su ID
  const existingPostItIndex = postItsData[cliente].findIndex(
    (postIt: PostIt) => postIt.id === newPostIt.id
  );
  if (existingPostItIndex !== -1) {
    postItsData[cliente][existingPostItIndex] = newPostIt;
  } else {
    // Si no existe, agrega el nuevo post-it a la matriz de post-its del cliente
    postItsData[cliente].push(newPostIt);
  }

  // Guarda la lista actualizada de post-its
  await this.storage.set('postIts', postItsData);
}

  // Método para obtener todos los post-its asociados a un cliente específico
  async obtenerPostIts(cliente: string): Promise<PostIt[]> {
    // Obtiene la lista de post-its almacenada en el storage
    const postItsData = (await this.storage.get('postIts')) || {};
    
    // Obtiene la matriz de post-its específica para el cliente
    return postItsData[cliente] || [];
  }

  // Método para obtener la lista de clientes
  async obtenerClientes(): Promise<string[]> {
    // Obtiene la lista de post-its almacenada en el storage
    const postItsData = (await this.storage.get('postIts')) || {};
    
    // Obtiene los nombres de los clientes
    return Object.keys(postItsData);
  }
}
