import OrderCard from "@/components/Order/OrderCard";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  // Fetch All Orders
  const orders = await getData("orders");
  // Get the user Id
  const session = await getServerSession(authOptions);
  if (!session) return;
  const role = session?.user?.role;
  const userId = session?.user?.id;
  console.log(userId);

  if (orders.length === 0 || !orders) {
    return <p className="text-black dark:text-white">No Orders Yet</p>;
  }
  // Filter By User Id
  const userOrders = orders.filter((order) => order.userId === userId);
  const filteredOrders = orders.filter(order => order.orderStatus === "DELIVERED" || order.orderStatus === "CANCELED");
  // console.log(userOrders);
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Order History
            </h1>
            
          </div>

          <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
            {filteredOrders.map((order, i) => {
              return <OrderCard key={i} order={order} role={role} />;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
