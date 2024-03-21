import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const sales = await db.sale.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(sales);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Orders",
        error,
      },
      { status: 500 }
    );
  }
}
// export async function GET(request) {
//   const { saleId } = request.params;

//   try {
//     const sale = await db.sale.findUnique({
//       where: {
//         _id: saleId,
//       },
//       include: {
//         order: orderId, // Include the associated order
//       },
//     });

//     return NextResponse.json(sale);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       {
//         message: "Failed to Fetch Sale",
//         error,
//       },
//       { status: 500 }
//     );
//   }
// }