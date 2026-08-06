import { Component, computed, input } from '@angular/core';
import { getActiveAmenityLabels, ROOM_TYPE_LABELS, Room } from '../models/room.model';

@Component({
  selector: 'tr[app-room-item]',
  templateUrl: './room-item.component.html',
  host: {
    class:
      'border-b border-neutral-100 last:border-b-0 hover:bg-brand-muted/50',
  },
})
export class RoomItemComponent {
  readonly room = input.required<Room>();

  protected readonly roomTypeLabels = ROOM_TYPE_LABELS;
  protected readonly activeAmenities = computed(() =>
    getActiveAmenityLabels(this.room()).join(', ') || '—',
  );
}
