import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  showTextBox = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  move_to_clients(){
    this.router.navigate(['/clients']); // Asegúrate de que esta ruta esté configurada en el enrutador.
  }

  abrirAcerca() {
    this.showTextBox = !this.showTextBox;
  }

  cerrarAcerca() {
    this.showTextBox = false;
  }
}
