import { afterNextRender, Component, inject, signal } from '@angular/core';
import { Room, RoomFormData } from '../models/room.model';
import { RoomFormComponent } from '../room-form/room-form.component';
import { RoomListComponent } from '../room-list/room-list.component';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-home',
  imports: [RoomFormComponent, RoomListComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly roomService = inject(RoomService);

  protected readonly rooms = signal<Room[]>([]);

  constructor() {
    afterNextRender(() => {
      this.roomService.getRooms().subscribe((rooms) => {
        this.rooms.set(rooms);
      });
    });
  }

  addNewRoom(roomData: RoomFormData): void {
    this.roomService.addRoom(roomData).subscribe((room) => {
      this.rooms.update((list) => [...list, room]);
    });
  }
}
