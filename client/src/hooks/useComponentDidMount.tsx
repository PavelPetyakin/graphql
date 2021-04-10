import { useEffect, useState } from "react";

const useComponentDidMount = () => {
  const [ isMounted, setIsMounted ] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
};

export { useComponentDidMount };
