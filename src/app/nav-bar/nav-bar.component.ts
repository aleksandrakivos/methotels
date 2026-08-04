import { Component, input, output } from '@angular/core';
import { HomeSection } from '../models/home-section.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  readonly activeSection = input.required<HomeSection>();
  readonly sectionChange = output<HomeSection>();

  protected readonly sections: { id: HomeSection; label: string }[] = [
    { id: 'ponuda', label: 'Ponuda' },
    { id: 'preporuka', label: 'Preporuka' },
    { id: 'o-nama', label: 'O nama' },
  ];

  selectSection(section: HomeSection): void {
    this.sectionChange.emit(section);
  }
}
