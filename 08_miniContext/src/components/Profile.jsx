import React, {useContext} from 'react'
import UserContext from '../Context/UserContext'

function Profile() {

    const {user} = useContext(UserContext)
    
    if(!user) return <div>Please log in to see your profile.</div>

    return <div>Welcome {user.username}</div>
}

export default Profile