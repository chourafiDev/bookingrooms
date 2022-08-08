import React from "react";
import ContentLoader from "react-content-loader";

const VerticatCardLoader = () => {
  const loader = (
    <ContentLoader
      speed={2}
      width={230}
      height={260}
      viewBox="0 0 230 260"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="6" y="211" rx="3" ry="3" width="220" height="4" />
      <rect x="5" y="254" rx="3" ry="3" width="221" height="4" />
      <rect x="6" y="230" rx="3" ry="3" width="135" height="5" />
      <rect x="3" y="19" rx="8" ry="8" width="227" height="141" />
      <rect x="5" y="184" rx="3" ry="3" width="222" height="12" />
      <rect x="184" y="229" rx="3" ry="3" width="41" height="7" />
    </ContentLoader>
  );
  return (
    <>
      <div className="rounded-lg custome-shadow p-4 bg-white mx-auto">
        {loader}{" "}
      </div>
    </>
  );
};

export default VerticatCardLoader;
