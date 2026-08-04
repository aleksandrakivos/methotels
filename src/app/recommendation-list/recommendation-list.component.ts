import { Component } from '@angular/core';

type RecommendationCategory = 'obrok' | 'izlazak' | 'aktivnosti';

interface Recommendation {
  title: string;
  category: RecommendationCategory;
  description: string;
  location: string;
}

const CATEGORY_LABELS: Record<RecommendationCategory, string> = {
  obrok: 'Obrok',
  izlazak: 'Izlazak',
  aktivnosti: 'Aktivnosti',
};

@Component({
  selector: 'app-recommendation-list',
  templateUrl: './recommendation-list.component.html',
})
export class RecommendationListComponent {
  protected readonly categoryLabels = CATEGORY_LABELS;

  protected readonly recommendations: Recommendation[] = [
    {
      title: 'Restoran Kalemegdan',
      category: 'obrok',
      description: 'Tradicionalna kuhinja sa pogledom na grad.',
      location: 'Centar, 5 min hoda',
    },
    {
      title: 'Pekara „Domaća“',
      category: 'obrok',
      description: 'Sveže pecivo i domaći doručak po pristupačnim cenama.',
      location: 'Ulica Kralja Petra, 2 min hoda',
    },
    {
      title: 'Jazz klub „Noćni grad“',
      category: 'izlazak',
      description: 'Živa muzika i kokteli u opuštenoj atmosferi.',
      location: 'Stari grad, 10 min vožnje',
    },
    {
      title: 'Šetnja duž reke',
      category: 'aktivnosti',
      description: 'Uređena staza idealna za jutarnju ili večernju šetnju.',
      location: 'Obala, 3 min hoda',
    },
    {
      title: 'Gradski muzej',
      category: 'aktivnosti',
      description: 'Izložbe lokalne istorije i umetnosti.',
      location: 'Trg republike, 8 min hoda',
    },
  ];
}
