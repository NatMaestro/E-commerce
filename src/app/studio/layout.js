// studio/layout.js
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Studio Layout</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2024 Your Company</p>
      </footer>
    </div>
  );
};

export default Layout;
