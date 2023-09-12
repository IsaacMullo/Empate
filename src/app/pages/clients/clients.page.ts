import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  } 

  move_to_map(){
    this.router.navigate(['/map']);
  }

  // Función para mover elementos en la lista
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
