import React from 'react';
import { Navbar, NavbarBrand } from 'shards-react';

export default function (props) {
  return (
    <div className="main-navbar">
      <Navbar
        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
        type="light"
      >
        <NavbarBrand
          className="w-100 ml-0"
          href="#"
          style={{ lineHeight: '25px', position: 'relative' }}
        >
          <div className="d-table m-auto">
            {
              <span
                className="d-none d-md-inline ml-1"
                style={{ position: 'absolute', left: '10%' }}
              >
                Secret Notes
              </span>
            }
          </div>
        </NavbarBrand>
        <a className="toggle-sidebar d-sm-inline d-md-none d-lg-none" onClick={props.toggleOpen}>
          <i className="material-icons">&#xE5C4;</i>
        </a>
      </Navbar>
    </div>
  );
}
