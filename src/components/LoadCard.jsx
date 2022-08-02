import "../styles/loadCard.css";
import React from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadCard() {
  return (
    <SkeletonTheme baseColor="#AEAEAE" highlightColor="#DFDFDF">
      <div className="skeleton">
        <Skeleton circle width={25} height={25} className="close" />
        <Skeleton count={3} />

        <div>
          <Skeleton variant="text" width={50} height={20} />
          <Skeleton variant="text" width={50} height={20} />
        </div>

        <Skeleton variant="rectangular" height={50} />
      </div>
    </SkeletonTheme>
  );
}
