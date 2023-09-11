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
    private sharedPostIts = new BehaviorSubject<PostIt[]>([]);
  
    getSharedPostIts() {
      return this.sharedPostIts.asObservable();
    }
  
    updateSharedPostIts(postIts: PostIt[]) {
      this.sharedPostIts.next(postIts);
    }
  }