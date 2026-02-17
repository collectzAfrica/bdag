import React, { useState, useEffect } from "react";

const Counter = ({ number, time }) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < number) {
        setCount((prevCount) => prevCount + 1);
      } else {
        clearInterval(interval); // Stop counting when it reaches 50
      }
    }, time); // Change the interval as needed (in milliseconds)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [count]);

  return (
    <div>
      <h1 className="font-extrabold text-2xl text-center">{count}k+</h1>
    </div>
  );
};

export default Counter;
