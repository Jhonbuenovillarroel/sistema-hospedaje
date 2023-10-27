import { User } from "@/app/panel-administracion/usuarios/page";
import prisma from "@/lib/prisma/prisma";

export const obtenerUsuariosAdministracion = async () => {
   const usersDatabase = await prisma.user.findMany();

   let users: any = [];

   for (let i = 0; i < usersDatabase.length; i++) {
      users.push({
         username: usersDatabase[i].username,
         email: usersDatabase[i].email,
         imageUrl: usersDatabase[i].imageUrl,
         imageName: usersDatabase[i].imageName,
         id: usersDatabase[i].id,
      });
   }

   return users;
};
