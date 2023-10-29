export async function getAccessToken() {
   console.log(process.env.NODE_ENV);
   const response = await fetch(
      process.env.NODE_ENV === "development"
         ? "https://apisandbox.vnforappstest.com/api.security/v1/security"
         : "https://apiprod.vnforapps.com/api.security/v1/security",
      {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(
               "integraciones@niubiz.com.pe:_7z3@8fF"
            )}`,
         },
      }
   );

   const result: string = await response.text();

   return result;
}

export async function getSessionToken({
   accessToken,
   amount,
   merchantId,
}: {
   accessToken: string;
   amount: number;
   merchantId: string;
}) {
   const response = await fetch(
      process.env.NODE_ENV === "development"
         ? `https://apisandbox.vnforappstest.com/api.ecommerce/v2/ecommerce/token/session/${merchantId}`
         : `https://apiprod.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/${merchantId}`,
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
         },
         body: JSON.stringify({
            channel: "web",
            amount: amount,
            // antifraud: {
            //    MDD15: "Valor MDD 15",
            //    MDD20: "Valor MDD 20",
            //    MDD33: "Valor MDD 33",
            // },
         }),
      }
   );

   const result = await response.json();

   const expirationTime = new Date(result.expirationTime);

   const horaExpiracion = expirationTime.getHours();
   const minutosExpiracion = expirationTime.getMinutes();
   const segundosExpiracion = expirationTime.getSeconds();

   console.log(
      `La sesión expirará a las ${horaExpiracion}:${minutosExpiracion}:${segundosExpiracion}`
   );

   return result;
}
