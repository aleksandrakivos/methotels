import { Component } from '@angular/core';

interface Offer {
  title: string;
  description: string;
  price: string;
  badge: string;
  includes: string[];
  validUntil: string;
}

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
})
export class OfferListComponent {
  protected readonly intro =
    'Pripremili smo posebne pakete za vikend izlete, poslovne boravke i porodične odmore. Sve cene su po sobi, osim gde je drugačije naznačeno. Za rezervaciju i detalje kontaktirajte recepciju.';

  protected readonly offers: Offer[] = [
    {
      title: 'Vikend paket',
      description: 'Dva noćenja sa doručkom i kasnim checkout-om do 14h.',
      price: 'od 120 EUR',
      badge: 'Najpopularnije',
      includes: ['Doručak za dve osobe', 'Kasni checkout', 'Besplatan Wi-Fi'],
      validUntil: '31.12.2026.',
    },
    {
      title: 'Spa & wellness',
      description: 'Noćenje sa jednim tretmanom u spa centru i pristupom sauni.',
      price: 'od 95 EUR',
      badge: 'Opuštanje',
      includes: ['60 min masaža', 'Pristup sauni i bazenu', 'Herbalni čaj u sobi'],
      validUntil: '30.09.2026.',
    },
    {
      title: 'Porodični boravak',
      description: 'Soba za četiri osobe, dečiji meni i besplatan parking.',
      price: 'od 150 EUR',
      badge: 'Za porodice',
      includes: ['Dečiji meni', 'Parking u garaži', 'Igraonica 16–20h'],
      validUntil: '31.08.2026.',
    },
    {
      title: 'Poslovni paket',
      description: 'Idealno za službena putovanja — brzi internet i radni kutak u sobi.',
      price: 'od 85 EUR',
      badge: 'Biznis',
      includes: ['Brzi Wi-Fi', 'Radni sto u sobi', 'Rani doručak od 06:30h'],
      validUntil: '31.12.2026.',
    },
    {
      title: 'Romantični vikend',
      description: 'Noćenje za dvoje sa večerom u restoranu i kasnim doručkom u sobi.',
      price: 'od 140 EUR',
      badge: 'Za parove',
      includes: ['Večera za dvoje', 'Doručak u sobi', 'Dekoracija sobe'],
      validUntil: '14.02.2027.',
    },
    {
      title: 'Dug boravak',
      description: 'Popust za boravke duže od 7 noći — pogodno za projekte i sezonske radnike.',
      price: 'od 65 EUR / noć',
      badge: 'Popust',
      includes: ['Nedeljno čišćenje', 'Korišćenje vešeraja', 'Fleksibilan check-in'],
      validUntil: '31.12.2026.',
    },
  ];

  protected readonly benefits = [
    'Besplatno otkazivanje do 48h pre dolaska',
    'Najbolja cena zagarantovana na zvaničnom sajtu',
    'Mogućnost plaćanja na recepciji ili karticom online',
  ];
}
