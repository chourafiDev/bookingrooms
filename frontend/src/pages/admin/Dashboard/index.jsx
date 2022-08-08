import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Layout from "../../../components/admin/Layout";

const index = () => {
  return (
    <Layout>
      <div className="flex gap-8 p-6 bg-blue/5 mt-12">
        <LeftSide />
        <RightSide />
      </div>
    </Layout>
  );
};

export default index;
