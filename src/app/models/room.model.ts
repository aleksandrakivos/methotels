export const ROOM_TYPES = ['studio', 'porodicni', 'luksuzni'] as const;

export type RoomType = (typeof ROOM_TYPES)[number];

export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  studio: 'Studio',
  porodicni: 'Porodični',
  luksuzni: 'Luksuzni',
};

export const AMENITY_LABELS = {
  bazen: 'Bazen',
  miniBar: 'Mini bar',
  sauna: 'Sauna',
  konferencijskaSala: 'Konferencijska sala',
  vecera: 'Večera',
} as const;

export type RoomAmenity = keyof typeof AMENITY_LABELS;

export interface RoomAmenities {
  bazen: boolean;
  miniBar: boolean;
  sauna: boolean;
  konferencijskaSala: boolean;
  vecera: boolean;
}

export interface Room extends RoomAmenities {
  id: string;
  name: string;
  type: RoomType;
  price: number;
  bedCount: number;
  numberOfNights: number;
  totalPrice: number;
  description: string;
}

export function getActiveAmenityLabels(room: RoomAmenities): string[] {
  return (Object.keys(AMENITY_LABELS) as RoomAmenity[])
    .filter((key) => room[key])
    .map((key) => AMENITY_LABELS[key]);
}

export type RoomFormData = Omit<Room, 'id'>;

export type RoomBookingInput = RoomAmenities & {
  pricePerNight: number;
};
