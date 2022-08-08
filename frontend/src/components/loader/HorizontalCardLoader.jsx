import React from "react";
import ContentLoader from "react-content-loader";

const HorizontalCardLoader = () => {
  const loader = (
    <ContentLoader
      speed={2}
      width={900}
      height={160}
      viewBox="0 0 900 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="266" y="70" rx="3" ry="3" width="279" height="6" />
      <rect x="264" y="28" rx="3" ry="3" width="289" height="8" />
      <rect x="266" y="48" rx="3" ry="3" width="178" height="7" />
      <rect x="3" y="19" rx="8" ry="8" width="227" height="141" />
      <rect x="265" y="107" rx="3" ry="3" width="273" height="8" />
      <rect x="267" y="134" rx="3" ry="3" width="212" height="12" />
      <rect x="489" y="49" rx="3" ry="3" width="41" height="7" />
    </ContentLoader>
  );

  return (
    <div className="rounded-lg custome-shadow p-4 bg-white mx-auto my-3">
      {loader}
    </div>
  );
};

export default HorizontalCardLoader;
