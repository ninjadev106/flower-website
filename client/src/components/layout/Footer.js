import React from "react";

export default function Footer() {
  return (
    <footer
      id="sticky-footer"
      className="py-4 bg-dark text-white-50"
      style={{ position: "fixed", bottom: 0, width: "100%" }}
    >
      <div className="container text-center">
        <small>Copyright &copy; Your Website</small>
      </div>
    </footer>
  );
}
