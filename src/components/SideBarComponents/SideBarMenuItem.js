import React from 'react';

const CustomSideBarMenuItem = ({ icon, children , isToggled}) => {
  return (
    <li className={`sc-cfxfcM hQSxZz ${!isToggled ? 'toggled' : ''}`}>
      <div className="sc-Nxspf gmeTLe" style={isToggled ? {} : { paddingLeft: '5px' }} tabindex="0" role="button">
      <div className="icon-container" >
          {icon}
        </div>
        <span className="item-content">
          {children}
        </span>
      </div>
    </li>
  );
};

export default CustomSideBarMenuItem;
