// En clients.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveService } from 'src/app/services/save.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
  clientes: string[] = []; // Almacena la lista de clientes

  constructor(private router: Router, private saveService: SaveService) {}

  ngOnInit() {
    // Obtén la lista de clientes al cargar la página
    this.obtenerClientes();
  }

  async obtenerClientes() {
    // Utiliza el servicio para obtener la lista de clientes
    this.clientes = await this.saveService.obtenerClientes();
  }  

  verCliente(cliente: string) {
    // Navega a la página 'map.page' y pasa el nombre del cliente como parámetro de ruta
    this.router.navigate(['/map'], {
      state: { cliente },
    });
  }

  move_to_map() {
    this.router.navigate(['/map']);
  }

  // Puedes agregar otros métodos según sea necesario
}
