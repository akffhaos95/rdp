import React from "react";

const BaseballField = ({ onLocationSelect }) => {
  const handleLocationClick = (location) => {
    onLocationSelect(location);
  };

  return (
    <svg
      viewBox="0 0 200 200"
      width="100%"
      height="100%"
      transform="rotate(45)"
    >
      <rect
        x="50"
        y="50"
        width="100"
        height="100"
        fill="green"
        onClick={() => handleLocationClick("외야 좌")}
      />
      <rect
        x="75"
        y="75"
        width="50"
        height="50"
        fill="darkgreen"
        onClick={() => handleLocationClick("내야 좌")}
      />
      <rect
        x="75"
        y="50"
        width="50"
        height="25"
        fill="green"
        onClick={() => handleLocationClick("외야 중")}
      />
      <rect
        x="75"
        y="125"
        width="50"
        height="25"
        fill="green"
        onClick={() => handleLocationClick("외야 중")}
      />
      <rect
        x="50"
        y="75"
        width="25"
        height="50"
        fill="green"
        onClick={() => handleLocationClick("외야 좌")}
      />
      <rect
        x="125"
        y="75"
        width="25"
        height="50"
        fill="green"
        onClick={() => handleLocationClick("외야 우")}
      />
      <rect
        x="75"
        y="75"
        width="50"
        height="50"
        fill="darkgreen"
        onClick={() => handleLocationClick("내야 중")}
      />
      <rect
        x="125"
        y="50"
        width="25"
        height="25"
        fill="green"
        onClick={() => handleLocationClick("외야 우")}
      />
      <rect
        x="125"
        y="125"
        width="25"
        height="25"
        fill="green"
        onClick={() => handleLocationClick("외야 우")}
      />
      <rect
        x="75"
        y="75"
        width="50"
        height="25"
        fill="darkgreen"
        onClick={() => handleLocationClick("내야 중")}
      />
      <rect
        x="75"
        y="100"
        width="50"
        height="25"
        fill="darkgreen"
        onClick={() => handleLocationClick("내야 중")}
      />
      <rect
        x="75"
        y="75"
        width="25"
        height="50"
        fill="darkgreen"
        onClick={() => handleLocationClick("내야 중")}
      />
      <rect
        x="100"
        y="75"
        width="25"
        height="50"
        fill="darkgreen"
        onClick={() => handleLocationClick("내야 중")}
      />
    </svg>
  );
};

export default BaseballField;
