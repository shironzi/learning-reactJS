import { memo, useEffect, useState } from "react";

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    window.addEventListener("unhandledrejection", (event) => {
      console.error(
        "Unhandled rejection (promise: ",
        event.promise,
        ", reason: ",
        event.reason,
        ")."
      );
      setHasError(true);
    });
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
}

export default memo(ErrorBoundary);
