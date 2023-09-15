import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

//
import { DataService } from '../../shared/data.service';
import { DataSharingService } from '../../shared/data.sharing.service';


//Interface
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
  nombreCliente: string = ''; // Propiedad para capturar el nombre del cliente
  postIts: PostIt[]=[];
  showPostIt: boolean = false;
  postItX: number = 0;
  postItY: number = 0;
  postItContent: string = '';

  showTextBox = false;
  inputText: string= ''; // nuevoCliente 
  clientes: string[] = []; //Lista o arrays de clientes.  


  constructor(private dataService: DataService,private dataSharingService: DataSharingService) { } //
  
  ngOnInit() {
  }

  onPostItBlur() {
  }

  createPostIt(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // this.postItX = target.offsetLeft;
    // this.postItY = target.offsetTop + target.offsetHeight;
    // this.showPostIt = true;
    // this.postItContent = ''; 
    // const newPostIt: PostIt = {
    //   x: this.postItX,
    //   y: this.postItY,
    //   content: this.postItContent,  
    const x = event.clientX - target.getBoundingClientRect().left;
    const y = event.clientY - target.getBoundingClientRect().top;
    const newPostIt: PostIt = {
      x: x,
      y: y,
      content: '',
    };
    this.postIts.push(newPostIt);
  }
  
  toggleTextBox() {
    this.showTextBox = !this.showTextBox;
    this.inputText = '';
  }

  guardarTexto() {  //Guardar Cliente
    this.showTextBox = false; 
    const inputText = this.inputText;
    
    // const nuevoCliente = {
    //   nombre: inputText,
    // };
    
    this.clientes.push(inputText);
    
    
    // this.postIts.push(newPostIt); // Agrega el nuevo post-it.
    
    //modificazao
    // this.dataSharingService.updateSharedClientes(this.clientes);
     // Actualiza la lista de post-its compartidos
    this.dataSharingService.updateSharedPostIts(this.postIts); 
    
    this.dataService.savePostIts(this.postIts); 
     // Restaura el valor de inputText
    
  
  }

  cancelar() {
    this.showTextBox = false;
    this.inputText = '';
  }
}