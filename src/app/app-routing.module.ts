import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'clients',
    loadChildren: () => import('./pages/clients/clients.module').then( m => m.ClientsPageModule)
  },
  {
    path: 'map/:cliente', // El nombre del cliente se pasa como parámetro
    loadChildren: () => import('./pages/map/map.module').then(m => m.MapPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcome', // Esto redirecciona a la página de bienvenida al cargar la aplicación.
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
