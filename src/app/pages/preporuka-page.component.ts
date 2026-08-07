import { Component } from '@angular/core';
import { RecommendationListComponent } from '../recommendation-list/recommendation-list.component';

@Component({
  selector: 'app-preporuka-page',
  imports: [RecommendationListComponent],
  template: `
    <section
      class="border border-neutral-200 bg-white rounded-sm p-3"
      aria-labelledby="preporuka-heading"
    >
      <h2 id="preporuka-heading" class="text-sm font-semibold text-neutral-900 mb-2">
        Preporuka
      </h2>
      <app-recommendation-list />
    </section>
  `,
})
export class PreporukaPageComponent {}
