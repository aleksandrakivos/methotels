import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-o-nama-page',
  imports: [AboutComponent],
  template: `
    <section
      class="border border-neutral-200 bg-white rounded-sm p-3"
      aria-labelledby="o-nama-heading"
    >
      <h2 id="o-nama-heading" class="text-sm font-semibold text-neutral-900 mb-2">
        O nama
      </h2>
      <app-about />
    </section>
  `,
})
export class ONamaPageComponent {}
