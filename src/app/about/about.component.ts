import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  protected readonly hotelInfo = {
    name: 'MetHotels',
    description:
      'MetHotels je moderan gradski hotel koji spaja udoban smeštaj, ljubaznu uslugu i odličnu lokaciju u centru grada. Idealno mesto za poslovne i turističke boravke.',
    address: 'Tadeuša Košćuška 63, Beograd',
    phone: '+381 11 123 456',
    email: 'info@methotels.rs',
    workingHours: 'Recepcija: 00–24h',
  };
}
