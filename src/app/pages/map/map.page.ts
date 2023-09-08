import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
interface PostIt {
  x: number;
  y: number;
  content: string;
}

export class MapPage implements OnInit {
  postIts: PostIt[]=[];
  showPostIt: boolean = false;
  postItX: number = 0;
  postItY: number = 0;
  postItContent: string = '';

  showTextBox = false;
  clientsName = '';

  constructor() { 
  }
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
    this.clientsName = '';
  }

  guardarTexto() {
    const clientName = this.clientsName
    this.showTextBox = false;
    console.log(clientName)
  }

  cancelar() {
    this.showTextBox = false;
    this.clientsName = '';
  }
}
