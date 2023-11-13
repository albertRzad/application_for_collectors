import React from 'react'
import { useParams } from 'react-router-dom'

import UserSidebar from './UserSidebar'
import AccountSettings from './UserProfile/AccountSettings'
import ChangePassword from './UserProfile/ChangePassword'
import UserAddress from './UserProfile/UserAddress'
import LegalNotice from './UserProfile/LegalNotice'

const UserProfile = () => {

    return (
        <>
      <UserSidebar />
    </>
  );
        
        

}

export default UserProfile