import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

//
import { DataService } from '../../shared/data.service';
import { DataSharingService } from '../../shared/data.sharing.service';
//

interface PostIt {
  x: number;
  y: number;
  content: string;
}


@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DragDropModule]
})
export class ClientsPage implements OnInit {
  postIts: PostIt[] = [];
  clientes: string[] = []; //


  constructor(private router: Router, private dataService: DataService, private dataSharingService: DataSharingService) { } //private dataSharingService: DataSharingService

  ngOnInit() {
  //      // Suscríbete a los cambios en la lista de clientes compartidos
  // this.dataSharingService.getSharedClientes().subscribe((clientes) => {
  //   this.clientes = clientes;
  // });


      // Suscríbete a los cambios en la lista de post-its compartidos
      this.dataSharingService.getSharedPostIts().subscribe((postIts) => {
        this.postIts = postIts;
      });
  } 

  move_to_map(){
    this.router.navigate(['/map'])
  }
//Funcion pa mover las cositas
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

}





 








