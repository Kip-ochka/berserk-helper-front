import { ReactNode, useEffect, useState } from "react";

export const AppLoader = ({ children }: { children: ReactNode }) => {
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    Promise.all([]).finally(() => {
      setIsLoading(false);
    });
  }, []);
  return <>{loading ? null : children}</>;
};
