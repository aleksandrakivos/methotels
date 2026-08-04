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
