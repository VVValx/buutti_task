import React from "react";
import { IconContext } from "react-icons";

function Icon({ icon, className }) {
  return (
    <IconContext.Provider
      value={{ className, style: { verticalAlign: "middle" } }}
    >
      {icon}
    </IconContext.Provider>
  );
}

export default Icon;
