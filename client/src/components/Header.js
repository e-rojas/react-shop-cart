import React from "react";

export default function Header() {
  return (
    <>
      <header id="header">
        <nav className="navbar navbar-expand navbar-light bg-light">
          <a href="/" className="navbar-brand">
            <img
              style={{ width: "50px" }}
              src="https://www.mcdonalds.com/content/dam/ca/nfl/web/logo/McD-squareLogo.png"
              alt="logo"
            />
          </a>
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Menu <span className="sr-only">(current)</span>
              </a>
            </li>

            
          </ul>
        </nav>
      </header>
    </>
  );
}
