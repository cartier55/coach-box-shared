import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Link, NavLink } from 'react-router-dom';
// import HourGlassIcon from '../../imgs/hourglass-bottom.svg';
import HourGlassIcon from '../../imgs/hourglass_icon'
import GearIcon from '../../imgs/gear_icon'
import GearWide from '../../imgs/gear_wide'
import GearFill from '../../imgs/gear_fill'
import GlobeIcon from '../../imgs/globe'
import GridIcon from '../../imgs/grid'
import '../../stylez/SideBar.css'
import CustomSideBarMenuItem from '../SideBarComponents/SideBarMenuItem';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333" toggled={true}>
        <CDBSidebarHeader prefix={<i 
            className="fa fa-bars fa-large stink" 
            onClick={() => setIsSidebarOpen(prevState => !prevState)}
            ></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Coach's Box
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/schedule" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Schedule</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink exact to="/schedule-maker" activeClassName="activeClicked">
                <CustomSideBarMenuItem isToggled={isSidebarOpen} icon={<GridIcon/>}>Schedule Maker</CustomSideBarMenuItem>
            </NavLink> */}
            {/* <NavLink exact to="/vacations" activeClassName="activeClicked">
                <CustomSideBarMenuItem isToggled={isSidebarOpen} icon={<GlobeIcon/>}>Vacations</CustomSideBarMenuItem>
            </NavLink> */}
            <NavLink exact to="/hours-worked" activeClassName="activeClicked">
                <CustomSideBarMenuItem isToggled={isSidebarOpen} icon={<HourGlassIcon/>}>Hours Worked</CustomSideBarMenuItem>
            </NavLink>

            <NavLink exact to="/settings" activeClassName="activeClicked">
                <CustomSideBarMenuItem isToggled={isSidebarOpen} icon={<GearWide/>}>Settings</CustomSideBarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            <Link to="https://www.graytecknologies.com/" className='sidebar-footer-link'> 
                {isSidebarOpen ? 'GrayTecknologies LLC' : 'GT'}
            </Link>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;