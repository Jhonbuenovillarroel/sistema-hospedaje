import sdk from "api";
import { NextResponse, NextRequest } from "next/server";

const sdkIstance = sdk("@desarrolladores/v1.0#4yywlhyzl6p2");

export async function POST(request: NextRequest) {
   const ip = request.ip;
   const body = await request.json();
   const { accessToken } = body;

   try {
      sdkIstance.auth(accessToken);
      sdkIstance.server(
         "https://apisandbox.vnforappstest.com/api.ecommerce/v2"
      );
      const response = await sdkIstance.postEcommerceTokenSessionMerchantid(
         {
            channel: "web",
            amount: 30,
         },
         { merchantId: "456879852" }
      );

      return NextResponse.json({ sessionKey: response.data });
   } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
   }
}
