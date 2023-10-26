import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   const sdk = require("api")("@desarrolladores/v1.0#10n5t8yl1b2cewc");

   sdk.auth(
      "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwTWR3R0R6RjQ1YS1SbWs3bkhwc2lNYUJweFJQRjNzekEtNW1HWFllMThvIn0.eyJleHAiOjE2OTUzMzUyMjcsImlhdCI6MTY5NTMzMTYyNywianRpIjoiZDE3OWVlMmQtY2QzMC00ZDFiLTkzYzAtMTZmYjgwMzlkYmEzIiwiaXNzIjoiaHR0cHM6Ly9hY2Nlc3MuaW50dm50LmNvbS9hdXRoL3JlYWxtcy9vbmxpbmUtYXBpcyIsInN1YiI6IjQyNjg5NzZlLWVhOWEtNDI0Yi04YWEwLTY5ZWYwMjA5NTJkZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwcC1tdWx0aXJlZ2lvbiIsInNlc3Npb25fc3RhdGUiOiI4ZDljOWMwMi1lZDMyLTQ0MzAtOGEwZi03YWU4NzgzM2UxYzYiLCJhY3IiOiIxIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImdyb3VwcyI6W10sInVzZXJuYW1lIjoiaW50ZWdyYWNpb25lc0BuaXViaXouY29tLnBlIn0.HySHplUAyHJXzmOF9t598ZExBgN9wO0_7m5LQMYaB2DlSgENTPzjBDCbHRX1rQQJeGO-JWePazAXAEfEVI27oKXKu_On0FJt9OjmPC03UUQs8qwpw_F8cPlVuQiwFgmotaIqzbmd04F1cxuaWxVuc1YG1n_roCZALLcV6Cr1SXhWr_NeI9-URJWzxhX0-bWZTl4qaY952X_vKJ5hQbH7WyMW58EDhp6mtyEyJTrtUTnv3mSoXkS49TqdFYTtDINPhV-idh3I2lsU3OZmGl5vK_nMMscKn1krHBlL7bj2PEcq1HTEaBbIVbxafjs57zj2jY_fuY296dgQTeXIfK0I5Q"
   );
   sdk.server("https://apisandbox.vnforappstest.com/api.confirmation/v1");
   sdk.postConfirmationProductMerchantid(
      {
         channel: "web",
         captureType: "manual",
         order: {
            currency: "PEN",
            transactionId: "990172014359425",
            amount: 30,
            purchaseNumber: "512236",
            authorizedAmount: 30,
         },
      },
      {
         product: "ecommerce",
         merchantId: "456879852",
      }
   )
      .then(({ data }: { data: Response }) => console.log(data))
      .catch((err: Error) => console.error(err));

   return NextResponse.json({ message: "Hols" });
}
