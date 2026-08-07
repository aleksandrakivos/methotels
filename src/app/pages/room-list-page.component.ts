import { afterNextRender, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../models/room.model';
import { RoomListComponent } from '../room-list/room-list.component';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-list-page',
  imports: [RoomListComponent],
  template: `
    <section
      class="border border-neutral-200 bg-white rounded-sm p-3"
      aria-labelledby="room-list-heading"
    >
      <h2 id="room-list-heading" class="text-sm font-semibold text-neutral-900 mb-2">
        Lista smeštaja
      </h2>
      <app-room-list
        [rooms]="rooms()"
        (editRoom)="startEdit($event)"
        (deleteRoom)="deleteRoom($event)"
      />
    </section>
  `,
})
export class RoomListPageComponent {
  private readonly roomService = inject(RoomService);
  private readonly router = inject(Router);

  protected readonly rooms = signal<Room[]>([]);

  constructor() {
    afterNextRender(() => {
      this.loadRooms();
    });
  }

  startEdit(room: Room): void {
    this.router.navigate(['/forma'], { state: { room } });
  }

  deleteRoom(room: Room): void {
    if (!confirm(`Da li ste sigurni da želite da obrišete "${room.name}"?`)) {
      return;
    }

    this.roomService.deleteRoom(room.id).subscribe(() => {
      this.rooms.update((list) => list.filter((item) => item.id !== room.id));
    });
  }

  private loadRooms(): void {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms.set(rooms);
    });
  }
}
