export const ROOM_TYPES = ['studio', 'porodicni', 'luksuzni'] as const;

export type RoomType = (typeof ROOM_TYPES)[number];

export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  studio: 'Studio',
  porodicni: 'Porodični',
  luksuzni: 'Luksuzni',
};

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  price: number;
  bedCount: number;
  description: string;
}

export type RoomFormData = Omit<Room, 'id'>;
