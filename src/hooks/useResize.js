import { useState, useEffect } from "react";

export const useResize = () => {
  const [isPhone, setIsPhone] = useState(
    window.innerWidth < 900 ? true : false
  );

  const handleResize = () => {
    window.innerWidth < 900 ? setIsPhone(true) : setIsPhone(false);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return { isPhone };
};
