import React, { memo } from "react";

function Loading() {
  return (
    <div className="loading-container">
      <img src="/loading-paws.gif" alt="Loading" className="loading-image" />
    </div>
  );
}

export default memo(Loading);
