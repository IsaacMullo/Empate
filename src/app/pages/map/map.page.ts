import { Component, OnInit } from '@angular/core';

// No incluyas las importaciones de módulos aquí

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

  constructor() {}

  ngOnInit() {}

  onPostItBlur() {
    // Aquí puedes agregar la lógica para cuando se pierda el foco del post-it
  }

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

  toggleTextBox() {
    this.showTextBox = !this.showTextBox;
    this.inputText = '';
  }

  guardarTexto() {
    const clientName = this.inputText;
    this.showTextBox = false;
    console.log(clientName);
    // Aquí puedes implementar la lógica para guardar el texto (clientName) según tus necesidades.
  }

  cancelar() {
    this.showTextBox = false;
    this.inputText = '';
  }
}
