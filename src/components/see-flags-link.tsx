import React from "react";
import { useHistory } from "react-router-dom";

const SeeFlagsLink = () => {
  const history = useHistory();

  const onClick = () => {
    history.push("/map");
  };
  return (
    <p
      className=" underline text-primary hover:font-semibold font-poppins cursor-pointer"
      onClick={onClick}
    >
      🏳️ See flags raised around you &rarr;
    </p>
  );
};

export default SeeFlagsLink;
