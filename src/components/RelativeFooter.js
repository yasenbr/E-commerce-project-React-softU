import React from "react";
import "../css/Footer.css";

export const RelativeFooter = () => {
  return (
    <div className="mx-auto" style={{ maxWidth: 1220 }}>
      <footer className="page-footer font-small footer-relative">
        <div className="footer-copyright text-center py-3">
          © 2021 Copyright:
          <a href="/home"> E-Commerce</a>
        </div>
      </footer>
    </div>
  );
};
