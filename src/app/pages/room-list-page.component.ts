import { afterNextRender, Component, inject, signal } from '@angular/core';
import { Room, RoomFormData } from '../models/room.model';
import { RoomFormComponent } from '../room-form/room-form.component';
import { RoomListComponent } from '../room-list/room-list.component';
import { RoomService } from '../services/room.service';

type SmestajTab = 'lista' | 'forma';

@Component({
  selector: 'app-room-list-page',
  imports: [RoomListComponent, RoomFormComponent],
  template: `
    <section
      class="border border-neutral-200 bg-white rounded-sm p-3"
      aria-labelledby="smestaj-heading"
    >
      <h2 id="smestaj-heading" class="text-sm font-semibold text-neutral-900 mb-3">
        Lista smeštaja
      </h2>

      <div
        role="tablist"
        aria-label="Sekcije smeštaja"
        class="flex gap-1 border-b border-neutral-200 mb-3"
      >
        <button
          type="button"
          role="tab"
          id="tab-lista"
          aria-controls="panel-lista"
          [attr.aria-selected]="activeTab() === 'lista'"
          [tabIndex]="activeTab() === 'lista' ? 0 : -1"
          class="px-3 py-1.5 text-sm font-medium rounded-t-sm focus:outline-none focus:ring-1 focus:ring-brand focus:ring-offset-1"
          [class]="
            activeTab() === 'lista'
              ? 'bg-brand-muted text-neutral-900 border border-b-0 border-neutral-200 -mb-px'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
          "
          (click)="selectTab('lista')"
        >
          Tabela smeštaja
        </button>
        <button
          type="button"
          role="tab"
          id="tab-forma"
          aria-controls="panel-forma"
          [attr.aria-selected]="activeTab() === 'forma'"
          [tabIndex]="activeTab() === 'forma' ? 0 : -1"
          class="px-3 py-1.5 text-sm font-medium rounded-t-sm focus:outline-none focus:ring-1 focus:ring-brand focus:ring-offset-1"
          [class]="
            activeTab() === 'forma'
              ? 'bg-brand-muted text-neutral-900 border border-b-0 border-neutral-200 -mb-px'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
          "
          (click)="selectTab('forma')"
        >
          Forma za unos
        </button>
      </div>

      @if (activeTab() === 'lista') {
        <div
          role="tabpanel"
          id="panel-lista"
          aria-labelledby="tab-lista"
          tabindex="0"
        >
          <app-room-list
            [rooms]="rooms()"
            (editRoom)="startEdit($event)"
            (deleteRoom)="deleteRoom($event)"
          />
        </div>
      } @else {
        <div
          role="tabpanel"
          id="panel-forma"
          aria-labelledby="tab-forma"
          tabindex="0"
        >
          <h3 class="text-sm font-medium text-neutral-900 mb-2">
            {{ editingRoom() ? 'Izmeni smeštaj' : 'Dodaj novi smeštaj' }}
          </h3>
          <app-room-form
            [editingRoom]="editingRoom()"
            [addSuccess]="addSuccess()"
            [updateSuccess]="updateSuccess()"
            (roomSubmitted)="addNewRoom($event)"
            (roomUpdated)="updateRoom($event)"
            (editCancelled)="cancelEdit()"
          />
        </div>
      }
    </section>
  `,
})
export class RoomListPageComponent {
  private readonly roomService = inject(RoomService);

  protected readonly rooms = signal<Room[]>([]);
  protected readonly activeTab = signal<SmestajTab>('lista');
  protected readonly editingRoom = signal<Room | null>(null);
  protected readonly addSuccess = signal(false);
  protected readonly updateSuccess = signal(false);

  constructor() {
    afterNextRender(() => {
      this.loadRooms();
    });
  }

  protected selectTab(tab: SmestajTab): void {
    this.activeTab.set(tab);
    this.clearFormFeedback();
    if (tab === 'lista') {
      this.editingRoom.set(null);
    }
  }

  startEdit(room: Room): void {
    this.clearFormFeedback();
    this.editingRoom.set(room);
    this.activeTab.set('forma');
  }

  deleteRoom(room: Room): void {
    if (!confirm(`Da li ste sigurni da želite da obrišete "${room.name}"?`)) {
      return;
    }

    this.roomService.deleteRoom(room.id).subscribe(() => {
      this.rooms.update((list) => list.filter((item) => item.id !== room.id));
    });
  }

  addNewRoom(roomData: RoomFormData): void {
    this.clearFormFeedback();
    this.roomService.addRoom(roomData).subscribe(() => {
      this.addSuccess.set(true);
      this.loadRooms();
    });
  }

  updateRoom({ id, data }: { id: string; data: RoomFormData }): void {
    this.clearFormFeedback();
    this.roomService.updateRoom(id, data).subscribe((updatedRoom) => {
      this.editingRoom.set(updatedRoom);
      this.updateSuccess.set(true);
      this.loadRooms();
    });
  }

  cancelEdit(): void {
    this.clearFormFeedback();
    this.editingRoom.set(null);
    this.activeTab.set('lista');
  }

  private clearFormFeedback(): void {
    this.addSuccess.set(false);
    this.updateSuccess.set(false);
  }

  private loadRooms(): void {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms.set(rooms);
    });
  }
}
