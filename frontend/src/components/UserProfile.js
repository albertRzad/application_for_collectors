import React from 'react'
import { useParams } from 'react-router-dom'
import '../css/UserProfile.css'

import UserSidebar from './UserSidebar'
import NavbarForLoggedUser from './NavbarForLoggedUser'
import Footer from './Footer'
import Profile from './UserProfile/Profile'
import MyCollections from './UserProfile/MyCollections'
import Chat from './UserProfile/Chat'
import MyAuctions from './UserProfile/MyAuctions'
import AccountSettings from './UserProfile/AccountSettings'
import ExploreProfile from './ExploreUserProfile'

const UserProfile = () => {
  const {activepage} = useParams()
    return (
        <>
        <div className='userprofile'>
        <NavbarForLoggedUser/>
        {/* <UserSidebar /> */}
        <div className='userprofilein'>

        <div className='userprofileleft'>
        { <UserSidebar activepage={activepage} /> }
        </div>
        
        { <div className='userprofileright'>
            {activepage === 'accountsettings' && <AccountSettings />}
            {activepage === 'profile' && <Profile />}
            {activepage === 'mycollections' && <MyCollections />}
            {activepage === 'chats' && <Chat />}
            {activepage === 'myauctions' && <ExploreProfile />}
          </div> }
          </div>
        </div>

        <Footer/>

    </>
  );
        
}

export default UserProfile