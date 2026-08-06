import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room, RoomFormData, RoomBookingInput } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/rooms';

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  addRoom(data: RoomFormData): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, data);
  }

  updateRoom(id: string, data: RoomFormData): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${id}`, data);
  }

  deleteRoom(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPrice(numberOfNights: number, booking: RoomBookingInput): number {
    const amenityTotal =
      (booking.bazen ? 25 : 0) +
      (booking.miniBar ? 15 : 0) +
      (booking.sauna ? 20 : 0) +
      (booking.konferencijskaSala ? 50 : 0) +
      (booking.vecera ? 30 : 0);

    return (booking.pricePerNight + amenityTotal) * numberOfNights;
  }
}
