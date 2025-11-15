import React from "react";
import "./StarBorder.css";

const StarBorder = ({
  as: Component = "button",
  className = "",
  color = "yellow",
  speed = "5s",
  thickness = 1,
  children,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...rest.style,
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{ animationDuration: speed }}
      ></div>
      <div
        className="border-gradient-top"
        style={{ animationDuration: speed }}
      ></div>
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
