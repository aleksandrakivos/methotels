import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  protected readonly hotelInfo = {
    name: 'MetHotels',
    tagline: 'Vaš dom u srcu Beograda',
    description:
      'MetHotels je moderan gradski hotel koji spaja udoban smeštaj, ljubaznu uslugu i odličnu lokaciju u centru grada. Idealno mesto za poslovne i turističke boravke.',
    longDescription:
      'Osnovan 2010. godine, MetHotels je iz malog porodičnog apartmana prerasao u prepoznatljiv gradski hotel sa 48 soba i apartmana. Naš tim svakodnevno brine o tome da se gosti osećaju kao kod kuće — od brzog check-in-a do personalizovanih preporuka za restorane i događaje u gradu.',
    address: 'Tadeuša Košćuška 63, Beograd',
    phone: '+381 11 123 456',
    email: 'info@methotels.rs',
    workingHours: 'Recepcija: 00–24h',
    founded: '2010.',
    rooms: '48 soba i apartmana',
    rating: '4.8 / 5 (preko 1.200 recenzija)',
    parking: 'Podzemna garaža — 80 mesta (rezervacija unapred)',
    checkIn: '14:00',
    checkOut: '11:00',
  };

  protected readonly highlights = [
    { label: 'Lokacija', value: '5 min hoda do Knez Mihailove' },
    { label: 'Wi-Fi', value: 'Besplatan u celom hotelu' },
    { label: 'Doručak', value: 'Švedski sto 07–10h' },
    { label: 'Transfer', value: 'Organizujemo prevoz od/do aerodroma' },
  ];

  protected readonly amenities = [
    'Spa i wellness centar',
    'Konferencijska sala (do 60 osoba)',
    'Restoran i lobby bar',
    'Room service 00–24h',
    'Pranje i hemijsko čišćenje',
    'Čuvanje prtljaga',
    'Bicikli za iznajmljivanje',
    'Pet-friendly sobe (na upit)',
  ];

  protected readonly values = [
    {
      title: 'Gost na prvom mestu',
      description: 'Svaki gost dobija personalizovanu dobrodošlicu i podršku tokom celog boravka.',
    },
    {
      title: 'Održivost',
      description: 'Koristimo eko sredstva za čišćenje i podstičemo ponovnu upotrebu peškira po želji gosta.',
    },
    {
      title: 'Lokalni duh',
      description: 'U ponudi su domaći proizvodi, lokalna vina i preporuke koje nećete naći u vodiču.',
    },
  ];
}
