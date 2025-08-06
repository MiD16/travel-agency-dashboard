// @ts-nocheck

import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import React from "react";
import { Link } from "react-router";
import NavItems from "./NavItems";

const MobileSidebar = () => {
  const toggleSidebar = () => sidebar.toggle();
  let sidebar: SidebarComponent;

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            className="size-[30px]"
          />
          <h1>Tourvisto</h1>
        </Link>

        <button onClick={toggleSidebar} className="cursor-pointer">
          <img src="/assets/icons/menu.svg" alt="Menu" className="size-7" />
        </button>
      </header>

      <SidebarComponent
        width={270}
        ref={(s) => (sidebar = s)}
        created={() => sidebar.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="over"
      >
        <NavItems handleClick={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
