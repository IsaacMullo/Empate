import { Component, OnInit } from '@angular/core';
import { SaveService } from 'src/app/services/save.service';
import { ActivatedRoute } from '@angular/router';

interface PostIt {
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
    private route: ActivatedRoute
  ) {}

  // Función para manejar cambios en el texto del post-it
  onPostItContentChange(event: CustomEvent) {
    // Obtén el contenido del post-it del evento
    this.postItContent = event.detail.value as string;
  }

  createPostIt(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const offsetX = event.clientX - target.getBoundingClientRect().left;
    const offsetY = event.clientY - target.getBoundingClientRect().top;
  
    this.postItX = offsetX;
    this.postItY = offsetY;
    this.showPostIt = true;
  
    const newPostIt: PostIt = {
      x: this.postItX,
      y: this.postItY,
      content: this.postItContent,
    };
  
    // Guarda el nuevo post-it utilizando el servicio y el nombre del cliente como clave
    if (this.clienteSeleccionado) {
      this.saveService.guardarPostIt(this.clienteSeleccionado, newPostIt)
        .then(() => {
          // Actualiza la lista de post-its después de guardar
          this.obtenerPostIts(this.clienteSeleccionado);
        })
        .catch(error => {
          console.error('Error al guardar el post-it:', error);
        });
    }
  }

  ngOnInit() {
    // Recupera el nombre del cliente seleccionado del estado de la ruta
    const cliente = this.route.snapshot.paramMap.get('cliente');

    if (cliente) {
      // Almacena el nombre del cliente seleccionado
      this.clienteSeleccionado = cliente;

      // Utiliza el servicio para obtener los post-its asociados a ese cliente
      this.obtenerPostIts(cliente);
    }
  }

  async obtenerPostIts(cliente: string) {
    // Utiliza el servicio para obtener los post-its asociados al cliente seleccionado
    this.postIts = await this.saveService.obtenerPostIts(cliente);
  }

  // Resto de métodos...
  onPostItBlur() {
    // Aquí puedes agregar la lógica para cuando se pierda el foco del post-it
  }

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
