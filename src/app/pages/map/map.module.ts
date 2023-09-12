import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SaveService } from 'src/app/services/save.service';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule
  ],
  declarations: [
    MapPage  // Asegúrate de declarar MapPage aquí
  ],
  providers: [
    SaveService
  ]
})
export class MapPageModule {}
