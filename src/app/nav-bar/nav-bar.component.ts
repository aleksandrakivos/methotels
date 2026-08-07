import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  protected readonly links: NavLink[] = [
    { path: '/ponuda', label: 'Ponuda' },
    { path: '/preporuka', label: 'Preporuka' },
    { path: '/o-nama', label: 'O nama' },
    { path: '/forma', label: 'Forma za unos soba' },
    { path: '/lista-smestaja', label: 'Lista smeštaja' },
  ];
}
