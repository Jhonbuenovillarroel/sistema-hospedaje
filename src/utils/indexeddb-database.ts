import Dexie, { Table } from "dexie";

export interface Dates {
   id?: number;
   checkIn: string;
   checkOut: string;
   adults: string;
   children: string;
}

export interface Rooms {
   id?: number;
   name: string;
   price: number;
   reserved: boolean;
   roomNumber: number;
   urlImages: string[];
   adults: number;
   children: number;
}

export class MySubClassedDexie extends Dexie {
   // 'friends' is added by dexie when declaring the stores()
   // We just tell the typing system this is the case
   dates!: Table<Dates>;
   rooms!: Table<Rooms>;

   constructor() {
      super("sistemaHospedaje");
      this.version(3).stores({
         dates: "++id, checkIn, checkOut, adults, children",
         rooms: "++id, name, price, urlImages, reserved, roomNumber, adults, children",
      });
   }
}

export const db = new MySubClassedDexie();

export const addDate = async (
   checkIn: string,
   checkOut: string,
   adults: string,
   children: string
) => {
   try {
      const id = await db.dates.add({
         checkIn: checkIn,
         checkOut: checkOut,
         adults: adults,
         children: children,
      });
   } catch (error) {
      console.error(error);
   }
};

export const addRoom = async (
   name: string,
   price: number,
   urlImages: string[],
   reserved: boolean,
   roomNumber: number,
   adults: number,
   children: number
) => {
   try {
      const id = await db.rooms.add({
         name: name,
         price: price,
         urlImages: urlImages,
         reserved,
         roomNumber,
         adults,
         children,
      });
   } catch (error) {
      console.error(error);
   }
};
