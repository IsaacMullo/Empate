import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DragDropModule} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DragDropModule]
})
export class MapPage implements OnInit {
  showPostIt: boolean = false;
  postItX: number = 0;
  postItY: number = 0;
  postItContent: string = '';

  constructor() { }

  ngOnInit() {
  }

  onPostItBlur() {
    // Puedes guardar el contenido del post-it en la base de datos o hacer otras acciones aquí
  }

  
  createPostIt(event: Event) {
    const target = event.target as HTMLElement;
    this.postItX = target.offsetLeft;
    this.postItY = target.offsetTop + target.offsetHeight;
    this.showPostIt = true;
    this.postItContent = ''; // Reiniciar el contenido del post-it
  }

}
