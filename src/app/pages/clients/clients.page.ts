import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DragDropModule]
})
export class ClientsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  } 

  move_to_map(){
    this.router.navigate(['/map'])
  }
//Funcion pa mover las cositas
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

}






 








