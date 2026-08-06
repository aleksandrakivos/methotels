import { Component, input, output } from '@angular/core';
import { Room } from '../models/room.model';
import { RoomItemComponent } from '../room-item/room-item.component';

@Component({
  selector: 'app-room-list',
  imports: [RoomItemComponent],
  templateUrl: './room-list.component.html',
})
export class RoomListComponent {
  readonly rooms = input.required<Room[]>();
  readonly editRoom = output<Room>();
  readonly deleteRoom = output<Room>();
}
