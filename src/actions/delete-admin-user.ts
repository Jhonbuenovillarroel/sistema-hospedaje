import prisma from "@/lib/prisma/prisma";
import fs from "fs";
import path from "path";
// import { deleteFile } from "@/utils/functions";

export const eliminarUsuario = async (id: string, urlImage: string) => {
   try {
      // const users = await prisma.user.findMany();

      // for (let i = 0; i < users.length; i++) {
      //    if (users[i].id === id) {
      //       deleteFile(urlImage, fs, path);
      //    }
      // }

      const userDeleted = await prisma.user.delete({
         where: {
            id: id,
         },
      });

      return { username: userDeleted.username };
   } catch (error) {
      return {
         error: "Ups! Algo salió mal, por favor vuelve a intentarlo",
      };
   }
};
