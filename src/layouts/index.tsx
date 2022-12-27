import React from "react";

import Header from "./Header";

const Layout: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}): JSX.Element => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
