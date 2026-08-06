import { afterNextRender, Component, inject, signal } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { HomeSection } from '../models/home-section.model';
import { Room, RoomFormData } from '../models/room.model';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { OfferListComponent } from '../offer-list/offer-list.component';
import { RecommendationListComponent } from '../recommendation-list/recommendation-list.component';
import { RoomFormComponent } from '../room-form/room-form.component';
import { RoomListComponent } from '../room-list/room-list.component';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-home',
  imports: [
    NavBarComponent,
    OfferListComponent,
    RecommendationListComponent,
    AboutComponent,
    RoomFormComponent,
    RoomListComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly roomService = inject(RoomService);

  protected readonly activeSection = signal<HomeSection>('ponuda');
  protected readonly rooms = signal<Room[]>([]);
  protected readonly editingRoom = signal<Room | null>(null);

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

  startEdit(room: Room): void {
    this.editingRoom.set(room);
  }

  cancelEdit(): void {
    this.editingRoom.set(null);
  }

  updateRoom({ id, data }: { id: string; data: RoomFormData }): void {
    this.roomService.updateRoom(id, data).subscribe((room) => {
      this.rooms.update((list) => list.map((item) => (item.id === id ? room : item)));
      this.editingRoom.set(null);
    });
  }

  deleteRoom(room: Room): void {
    if (!confirm(`Da li ste sigurni da želite da obrišete "${room.name}"?`)) {
      return;
    }

    this.roomService.deleteRoom(room.id).subscribe(() => {
      this.rooms.update((list) => list.filter((item) => item.id !== room.id));
      if (this.editingRoom()?.id === room.id) {
        this.editingRoom.set(null);
      }
    });
  }
}
