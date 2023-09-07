import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
//
interface PostIt {
  x: number;
  y: number;
  content: string;
}


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DragDropModule]
})

export class MapPage implements OnInit {
  postIts: PostIt[]=[];
  showPostIt: boolean = false;
  postItX: number = 0;
  postItY: number = 0;
  postItContent: string = '';

  showTextBox = false;
  inputText = '';

  constructor() { }

  ngOnInit() {
  }

  onPostItBlur() {
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
    // Aquí puedes realizar la lógica para guardar el texto ingresado
    this.showTextBox = false;
  }

  cancelar() {
    this.showTextBox = false;
    this.inputText = '';
  }
}






