import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ponuda',
    pathMatch: 'full',
  },
  {
    path: 'ponuda',
    loadComponent: () =>
      import('./pages/ponuda-page.component').then((m) => m.PonudaPageComponent),
    title: 'Ponuda — MetHotels',
  },
  {
    path: 'preporuka',
    loadComponent: () =>
      import('./pages/preporuka-page.component').then((m) => m.PreporukaPageComponent),
    title: 'Preporuka — MetHotels',
  },
  {
    path: 'o-nama',
    loadComponent: () =>
      import('./pages/o-nama-page.component').then((m) => m.ONamaPageComponent),
    title: 'O nama — MetHotels',
  },
  {
    path: 'forma',
    loadComponent: () =>
      import('./pages/room-form-page.component').then((m) => m.RoomFormPageComponent),
    title: 'Forma za unos soba — MetHotels',
  },
  {
    path: 'lista-smestaja',
    loadComponent: () =>
      import('./pages/room-list-page.component').then((m) => m.RoomListPageComponent),
    title: 'Lista smeštaja — MetHotels',
  },
  {
    path: '**',
    redirectTo: 'ponuda',
  },
];
