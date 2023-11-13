import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import '../css/UserSidebar.css'
import { useState } from 'react';

export default function UserSidebar() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location = "/home";
  };

  return (
<div className="usersidebar">
    <nav className='sidebar-menu'>
        <ul>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          <li>
            <a href="/home"><span> <i class="fa fa-fw fa-user"></i> Profile</span></a>
          </li>
          <li>
            <a href="/accountsettings"> <span><i class="fa fa-fw fa-cogs"> </i> Account Settings</span></a>
          </li>
          <li>
            <a href="/myCollections"><span> <i class="fa fa-fw fa-archive"></i> My Collections</span></a>
          </li>
          <li>
            <a href="/myCollections"><span> <i class="fa fa-fw fa-comments"></i> Chats</span></a>
          </li>
          <li>
            <a href="/myCollections"><span> <i class="fa fa-fw fa-cart-arrow-down"></i> My Auctions</span></a>
            </li>
        </ul>
        </nav>
        <button class="logout" onClick={handleLogout}>Logout</button>
        </div>
      
  );
 
}
