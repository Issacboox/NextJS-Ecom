import FormHeader from "@/components/backoffice/FormHeader";
import NewProductForm from "@/components/backoffice/NewProductForm";
import { getData } from "@/lib/getData";
import React from "react";
import { UnitName } from "@prisma/client";
export default async function NewProduct() {
  //Categories and Farmers
  const categoriesData = await getData("categories");
  const usersData = (await getData("users")) ?? [];
  // Example loading state
  if (!categoriesData || !usersData) {
    return <div>Loading...</div>;
  }
  const farmersData = usersData?.filter((user) => user.role === "FARMER") ?? [];
  const farmers = farmersData.map((farmer) => {
    return {
      id: farmer.id,
      title: farmer.name,
    };
  });

  const unitName = [
    {
      id:"1",
      title:"Kilograms"
    },
    {
      id:"2",
      title:"Liter"
    },
    {
      id:"3",
      title:"Pack"
    },
  ]
  // console.log(farmers);
  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });
  return (
    <div>
      <FormHeader title="New Product" />
      <NewProductForm categories={categories} unitName={unitName}  farmers={farmers} />
    </div>
  );
}
