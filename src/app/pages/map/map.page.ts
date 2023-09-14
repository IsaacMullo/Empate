import { Component, OnInit } from '@angular/core';
import { SaveService } from 'src/app/services/save.service';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid'; // Importa la librería UUID
import { AlertService } from 'src/app/services/alert.service';

interface PostIt {
  id: string; // Añade un campo de ID único para cada post-it
  x: number;
  y: number;
  content: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  postIts: PostIt[] = [];
  showPostIt: boolean = false;
  postItX: number = 0;
  postItY: number = 0;
  postItContent: string = '';
  clienteSeleccionado: string = '';

  showTextBox = false;
  inputText = '';

  constructor(
    private saveService: SaveService,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) {}

  // Función para manejar cambios en el texto del post-it
  onPostItContentChange(event: CustomEvent, postId: string) {
    // Busca el post-it por ID y actualiza su contenido
    const postItToUpdate = this.postIts.find((postIt) => postIt.id === postId);
    if (postItToUpdate) {
      postItToUpdate.content = event.detail.value as string;
    }
  }

  // Dentro de la función createPostIt
  // Dentro de la función createPostIt
createPostIt(event: MouseEvent) {
  const newPostIt: PostIt = {
    id: uuidv4(),
    x: 0, // Inicialmente, establece las coordenadas en 0
    y: 0,
    content: '', // Inicialmente, el contenido está vacío
  };

  // Agrega el nuevo post-it a la matriz de post-its
  this.postIts.push(newPostIt);

  // Guarda el nuevo post-it utilizando el servicio y el nombre del cliente como clave
  if (this.clienteSeleccionado) {
    this.saveService.guardarPostIt(this.clienteSeleccionado, newPostIt)
      .then(() => {
        // No necesitas obtener los post-its después de crear uno nuevo,
        // ya que ahora estás actualizando directamente la matriz postIts.

        // Obtén el índice del post-it recién agregado
        const newPostItIndex = this.postIts.findIndex((postIt) => postIt.id === newPostIt.id);
        if (newPostItIndex !== -1) {
          // Actualiza las coordenadas x e y con las coordenadas finales
          const postItElement = document.getElementById(newPostIt.id);
          if (postItElement) {
            const { left, top } = postItElement.getBoundingClientRect();
            this.postIts[newPostItIndex].x = left;
            this.postIts[newPostItIndex].y = top;
          }
        }
      })
      .catch(error => {
        console.error('Error al guardar el post-it:', error);
      });
  }
} 

// Dentro de la función onPostItBlur
onPostItBlur(postId: string) {
  // Busca el post-it por ID y actualiza su contenido
  const postItToUpdate = this.postIts.find((postIt) => postIt.id === postId);
  if (postItToUpdate) {
    // Actualiza el contenido del post-it en el servicio
    this.saveService.guardarPostIt(this.clienteSeleccionado, postItToUpdate);

    // También actualiza las coordenadas x e y con las coordenadas finales
    const postItElement = document.getElementById(postId);
    if (postItElement) {
      const { left, top } = postItElement.getBoundingClientRect();
      postItToUpdate.x = left;
      postItToUpdate.y = top;
    }
  }
}

async ngOnInit() {
  // Recupera el nombre del cliente seleccionado del estado de la ruta
  this.alertService.mostrarMensajeInicial();
  
  const cliente = this.route.snapshot.paramMap.get('cliente');
  console.log('Cliente seleccionado:', cliente);

  if (cliente) {
    // Almacena el nombre del cliente seleccionado
    this.clienteSeleccionado = cliente;

    // Utiliza el servicio para obtener los post-its asociados a ese cliente
    const postIts = await this.saveService.obtenerPostIts(cliente);

    console.log('Post-its cargados:', postIts);

    // Ajusta las coordenadas de posición de los post-its cargados
    this.postIts = postIts.map(postIt => ({
      ...postIt,
      x: postIt.x, // Utiliza la posición guardada previamente
      y: postIt.y, // Utiliza la posición guardada previamente
    }));
  }
}


async obtenerPostIts(cliente: string) {
  // Utiliza el servicio para obtener los post-its asociados al cliente seleccionado
  const postIts = await this.saveService.obtenerPostIts(cliente);

  // Inicializa las coordenadas x e y si no están definidas en los post-its
  this.postIts = postIts.map(postIt => {
    return {
      ...postIt,
      x: postIt.x || 0,
      y: postIt.y || 0,
    };
  });
}

  // Resto de métodos...
  toggleTextBox() {
    this.showTextBox = !this.showTextBox;
    this.inputText = '';
  }

  guardarTexto() {
    const clientName = this.inputText;
    this.showTextBox = false;
    console.log(clientName);

    // Verifica que se haya ingresado un nombre de cliente
    if (clientName.trim() !== '') {
      // Actualiza el cliente seleccionado
      this.clienteSeleccionado = clientName;
      
      // Utiliza el servicio para obtener los post-its asociados a ese cliente (si existen)
      this.obtenerPostIts(clientName);
    } else {
      // Maneja el caso en el que no se ingresó un nombre de cliente
      console.error('Por favor, ingrese un nombre de cliente.');
    }
  }

  cancelar() {
    this.showTextBox = false;
    this.inputText = '';
  }
}
