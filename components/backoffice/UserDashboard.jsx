
import React from "react";

export default function UserDashboard({name}) {

  return (
    <div>
        <h2 className="text-black dark:text-white text-xl font-bold">Welcome User {name}</h2>
    </div>
  );
}
