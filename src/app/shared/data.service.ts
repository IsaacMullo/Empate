import { Injectable } from '@angular/core';

//Borrar a partir de aca xd 
import { Platform } from '@ionic/angular';

//

interface PostIt {
    x: number;
    y: number;
    content: string;
  }

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private platform: Platform) { //private platform: Platform
  
  }
//Funcion pa guardar Postits
savePostIts(postIts: PostIt[]) {
    if (this.platform.is('cordova')) {
      // Si estás ejecutando en un dispositivo (Cordova), puedes usar otro tipo de almacenamiento, como SQLite.
      // Aquí puedes implementar la lógica correspondiente.
    } else {
      // Si estás en un navegador, usa localStorage.
      localStorage.setItem('postIts', JSON.stringify(postIts));
    }
    
  }




}