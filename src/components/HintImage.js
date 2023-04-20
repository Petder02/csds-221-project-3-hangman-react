import React from "react";

// Used to display the image (necessary in codesandbox)
const HintImage = ({ src, altText }) => {
  return (
    <img
      className="hint-btn-container hide-img"
      id="hint-image"
      src={src}
      alt={altText}
    />
  );
};

export default HintImage;
