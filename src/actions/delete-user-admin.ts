export const eliminarUsuario = async (id: string) => {
   const response = await fetch("/api/delete-user", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         id,
      }),
   });

   const result = await response.json();

   return result;
};
