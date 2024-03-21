import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const order = await db.order.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: true,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch an Order",
        error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const existingOrder = await db.order.findUnique({
      where: {
        id,
      },
    });
    if (!existingOrder) {
      return NextResponse.json(
        {
          data: null,
          message: "Order Not Found",
        },
        { status: 404 }
      );
    }
    const deletedOrder = await db.order.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedOrder);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Delete an Order",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params: { id } }) {
  try {
    const { orderStatus } = await request.json();
    if (!isValidOrderStatus(orderStatus)) {
      return NextResponse.json(
        {
          message: "Invalid Order Status",
        },
        { status: 400 }
      );
    }

    const existingOrder = await db.order.findUnique({
      where: { id },
      include: { orderItems: { include: { product: true } } },
    });
    if (!existingOrder) {
      return NextResponse.json(
        {
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    const updatedOrder = await db.order.update({
      where: { id },
      data: { orderStatus },
    });

    if (orderStatus === 'DELIVERED') {
      const productsToUpdate = existingOrder.orderItems.map(item => ({
        id: item.productId,
        quantity: item.quantity,
      }));

      const products = await db.product.findMany({
        where: { id: { in: productsToUpdate.map(p => p.id) } },
      });

      await Promise.all(
        products.map(async (product, index) => {
          const updatedProductStock = product.productStock - productsToUpdate[index].quantity;
          await db.product.update({
            where: { id: product.id },
            data: { productStock: updatedProductStock },
          });
        })
      );
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Update Order",
        error,
      },
      { status: 500 }
    );
  }
}



function isValidOrderStatus(status) {
  // Add your validation logic here
  return true; // For now, consider all statuses as valid
}
