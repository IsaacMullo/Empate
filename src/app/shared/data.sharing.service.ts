import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//

interface PostIt {
    x: number;
    y: number;
    content: string;
  }
  
@Injectable({
    providedIn: 'root',
  })
  export class DataSharingService {
    // private sharedClientes = new BehaviorSubject<string[]>([]);
    private sharedPostIts = new BehaviorSubject<PostIt[]>([]); //creo que debo comentar esto    
  //  private sharedClientes: string[] = []; //Nuevo  
   
    
    constructor() {}

    
    // getSharedClientes() {
    //   return this.sharedClientes.asObservable();
    // }
    // updateSharedClientes(clientes: string[]) {
    //   this.sharedClientes.next(clientes);
    // }

    getSharedPostIts() {
      return this.sharedPostIts.asObservable();
    }
    updateSharedPostIts(postIts: PostIt[]) {
      this.sharedPostIts.next(postIts);
    }

  
}