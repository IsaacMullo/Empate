import { Component, OnInit } from '@angular/core';
import { SaveService } from 'src/app/services/save.service'; // Asegúrate de que la ruta sea correcta

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

  showTextBox = false;
  inputText = '';

  constructor(private saveService: SaveService) {} // Inyecta el servicio en el constructor

  createPostIt(event: Event) {
    const target = event.target as HTMLElement;
    this.postItX = target.offsetLeft;
    this.postItY = target.offsetTop + target.offsetHeight;
    this.showPostIt = true;
    this.postItContent = '';
    const newPostIt: PostIt = {
      x: this.postItX,
      y: this.postItY,
      content: this.postItContent,
    };
    this.postIts.push(newPostIt);
  }

  ngOnInit() {}

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

    // Ahora, usa el servicio para guardar el texto (clientName)
    this.saveService.guardarPostIt(clientName, this.postItContent);
  }

  // Resto de métodos...
  cancelar() {
    this.showTextBox = false;
    this.inputText = '';
  }
}
