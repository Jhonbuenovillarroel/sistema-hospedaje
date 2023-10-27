import sdk from "api";
import { NextResponse, NextRequest } from "next/server";

const sdkAccessToken = sdk("@desarrolladores/v1.0#4p6py23kzwz7baq");
const sdkSessionToken = sdk("@desarrolladores/v1.0#4yywlhyzl6p2");

export async function GET(req: NextRequest) {
   try {
      sdkAccessToken.auth("integraciones@niubiz.com.pe", "_7z3@8fF");
      const response = await sdkAccessToken.getV1Security({
         accept: "text/plain",
      });

      const accessToken = response.data;

      try {
         sdkSessionToken.auth(accessToken);
         sdkSessionToken.server(
            "https://apisandbox.vnforappstest.com/api.ecommerce/v2"
         );
         const response =
            await sdkSessionToken.postEcommerceTokenSessionMerchantid(
               {
                  channel: "web",
                  amount: 30,
               },
               { merchantId: "456879852" }
            );

         return NextResponse.json({ sessionKey: response.data, accessToken });
      } catch (error) {
         return NextResponse.json({ error }, { status: 500 });
      }
   } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
   }
}
