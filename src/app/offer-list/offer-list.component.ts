import { Component } from '@angular/core';

interface Offer {
  title: string;
  description: string;
  price: string;
}

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
})
export class OfferListComponent {
  protected readonly offers: Offer[] = [
    {
      title: 'Vikend paket',
      description: 'Dva noćenja sa doručkom i kasnim checkout-om do 14h.',
      price: 'od 120 EUR',
    },
    {
      title: 'Spa & wellness',
      description: 'Noćenje sa jednim tretmanom u spa centru i pristupom sauni.',
      price: 'od 95 EUR',
    },
    {
      title: 'Porodični boravak',
      description: 'Soba za četiri osobe, dečiji meni i besplatan parking.',
      price: 'od 150 EUR',
    },
  ];
}
