import { Component } from '@angular/core';
import { OfferListComponent } from '../offer-list/offer-list.component';

@Component({
  selector: 'app-ponuda-page',
  imports: [OfferListComponent],
  template: `
    <section
      class="border border-neutral-200 bg-white rounded-sm p-3"
      aria-labelledby="ponuda-heading"
    >
      <h2 id="ponuda-heading" class="text-sm font-semibold text-neutral-900 mb-2">
        Ponuda
      </h2>
      <app-offer-list />
    </section>
  `,
})
export class PonudaPageComponent {}
