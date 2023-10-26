import { obtenerUsuariosAdministracion } from "@/actions/get-admin-users";
import UsersTable from "@/components/UsersTable";

export interface User {
   email: string;
   username: string;
   image: string;
   id: string;
   password: string;
}

const Usuarios = async () => {
   const users = await obtenerUsuariosAdministracion();

   return <UsersTable users={users} />;
};

export default Usuarios;
