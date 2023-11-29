import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaHome, FaCalendarAlt, FaClock, FaCog, FaBars } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';
import gt from '../../imgs/logo_transparent_background_edit.png'
import { set } from 'date-fns';

const NewSideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const companyLogo = document.querySelector('a.sidebar-btn');
    if (collapsed) {
      companyLogo.style.backgroundColor = 'transparent';
    } else {
      companyLogo.style.background = 'rgba(255, 255, 255, 0.05)';
    }
  }, [collapsed]);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <ProSidebar collapsed={collapsed}>
        <SidebarHeader>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '24px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 14,
                    letterSpacing: '1px',
                }}
            >
                {!collapsed && <span
                    style={{
                        opacity: collapsed ? 0 : 1,
                        transition: 'opacity 0.3s ease',
                        overflow: 'hidden', // to prevent unwanted wrapping
                        whiteSpace: 'nowrap', // to prevent the text from breaking onto the next line
                    }}
                >
                    Coach's Box
                </span>}
                <FaBars 
                    className='burger-icon' 
                    size='25px' 
                    onClick={() => setCollapsed(!collapsed)} 
                    style={{
                        transform: `rotate(${collapsed ? "90deg" : "0deg"})`,
                        transition: 'transform 0.3s ease'
                    }}
                />
            </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaHome />} onClick={() => {
              navigate('/')
              setCollapsed(true)
              }}
              >
                Home
                </MenuItem>
            <MenuItem icon={<FaCalendarAlt />} onClick={() =>{
              navigate('/schedule')
              setCollapsed(true)
            }}
            >
              Schedule
              </MenuItem>
            <MenuItem icon={<FaClock />} onClick={() =>{
              navigate('/hours-worked')
              setCollapsed(true)
            }}
            >
              Hours Worked
              </MenuItem>
            <MenuItem icon={<FaCog />} onClick={() =>{
              navigate('/settings')
              setCollapsed(true)
            }}
            >
              Settings
              </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter style={{ textAlign: 'center' }}>
            <div
                className="sidebar-btn-wrapper"
                style={{ padding: '20px 24px' }}
            >
                <a
                    href="https://www.graytecknologies.com"
                    target="_blank"
                    className="sidebar-btn sidebar-footer-link"
                    rel="noopener noreferrer"
                    // className='sidebar-footer-link'
                >
                    <img src={gt} alt="logo" />
                    <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {!collapsed ? 'GrayTecknologies LLC' : ''}
                        {/* GrayTecknologies */}
                    </span>
                </a>
            </div>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default NewSideBar;
