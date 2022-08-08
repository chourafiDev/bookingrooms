import React from "react";
import Cards from "../../../components/admin/Card/Cards";
import Table from "../../../components/admin/Table";
import Badge from "../../../components/admin/Badge";

const LeftSide = () => {
  return (
    <div className="w-2/3">
      <h5 className="mb-5 text-xl">Dashboard</h5>
      <Cards />
      <Table />
      <Badge />
    </div>
  );
};

export default LeftSide;
