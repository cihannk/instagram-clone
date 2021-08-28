import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from "../services/firebase";

export default function SuggestedProfile({profileDocId, username, profileId, userId, loggedInUserDocId}) {
    const [followed, setfollowed] = useState(false);

    async function handleFollowUser() {
        
        // firebase: create 2 services (functions)
        // update the following array of the logged in user
        // update the followers array of the user who has been followed

        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)
        await updateFollowedUserFollowers(profileDocId, userId, false) 
        setfollowed(true);
    }

    return !followed ? 
    (<div className="flex flex-row items-center justify-between">
        <div className="flex items-center justify-between">
            <img className="rounded-full w-8 flex mr-3" src={`/images/avatars/${username}.jpg`} alt={`${username}'s profile photo`} />
            <Link to={`/p/${username}`}>
                <p className="font-bold text-sm">{username}</p>
            </Link>
        </div>
        <div className="group hover:bg-blue-500 p-1 rounded-full">
            <button className="text-xs font-bold text-blue-medium group-hover:text-white" type="button" onClick={handleFollowUser}>Follow</button>
        </div>
    </div>
    ):
    (null)
}

SuggestedProfile.propTypes = {
    profileDocId:PropTypes.string.isRequired,
    username:PropTypes.string.isRequired,
    profileId:PropTypes.string.isRequired,
    userId:PropTypes.string.isRequired,
    loggedInUserDocId:PropTypes.string.isRequired
}