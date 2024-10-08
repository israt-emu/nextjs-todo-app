import React from "react";

const Spinner = ({color}: {color: string}) => {
  return <svg className={`animate-spin h-5 w-5 mr-3 rounded-full border-4 border-solid ${color} border-r-transparent s motion-reduce:animate-[spin_1.5s_linear_infinite]`} viewBox="0 0 24 24"></svg>;
};

export default Spinner;
