// Custom components
import React from "react";

function OptionField(props) {
  const {
    id,
    extra,
    value,
    state,
    disabled,
  } = props;
console.log(value)
  return (
    <div className={`${extra}`}>
      
    </div>
  );
}

export default OptionField;
