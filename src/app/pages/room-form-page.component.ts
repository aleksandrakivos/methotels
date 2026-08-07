import { afterNextRender, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Room, RoomFormData } from '../models/room.model';
import { RoomFormComponent } from '../room-form/room-form.component';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-form-page',
  imports: [RoomFormComponent],
  template: `
    <section
      class="border border-neutral-200 bg-white rounded-sm p-3"
      aria-labelledby="room-form-heading"
    >
      <h2 id="room-form-heading" class="text-sm font-semibold text-neutral-900 mb-2">
        {{ editingRoom() ? 'Izmeni smeštaj' : 'Dodaj novi smeštaj' }}
      </h2>
      <app-room-form
        [editingRoom]="editingRoom()"
        (roomSubmitted)="addNewRoom($event)"
        (roomUpdated)="updateRoom($event)"
        (editCancelled)="cancelEdit()"
      />
    </section>
  `,
})
export class RoomFormPageComponent {
  private readonly roomService = inject(RoomService);
  private readonly router = inject(Router);

  protected readonly editingRoom = signal<Room | null>(null);

  constructor() {
    afterNextRender(() => {
      const stateRoom = this.readEditingRoomFromState();
      if (stateRoom) {
        this.editingRoom.set(stateRoom);
      }
    });
  }

  addNewRoom(roomData: RoomFormData): void {
    this.roomService.addRoom(roomData).subscribe(() => {
      this.router.navigate(['/lista-smestaja']);
    });
  }

  updateRoom({ id, data }: { id: string; data: RoomFormData }): void {
    this.roomService.updateRoom(id, data).subscribe(() => {
      this.editingRoom.set(null);
      this.router.navigate(['/lista-smestaja']);
    });
  }

  cancelEdit(): void {
    this.editingRoom.set(null);
    this.router.navigate(['/lista-smestaja']);
  }

  private readEditingRoomFromState(): Room | null {
    if (typeof history === 'undefined') {
      return null;
    }

    const state = history.state as { room?: Room };
    return state?.room ?? null;
  }
}
