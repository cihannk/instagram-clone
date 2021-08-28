import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";

import {isUserFollowingProfile, toggleFollow} from "../../services/firebase";

export default function Header({photosCount, profile: {
    docId: profileDocId, userId: profileUserId, fullName, following = [] ,followers= [],
    username: profileUsername
}, followerCount, setFollowerCount}) {
    const { user } = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profileUsername

    const handleToggleFollow = async ()=> {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount -1 : followerCount +1
        });
        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
        console.log("followerCount", followerCount);

        return null
    }
    
    useEffect(() => {

        console.log("followersCount",followerCount);
        const isLoggedInUserFollowingProfile = async () =>{
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(isFollowing);
        }
        if (user.username && profileUserId) {
            console.log("user", user)
            isLoggedInUserFollowingProfile();
        }
    }, [user.username, profileUserId])

    return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <div className="container flex justify-center">
            {user.username && (<img className="rounded-full h-40 w-40" alt={`${profileUsername} profile picture`} src={`/images/avatars/${profileUsername}.jpg`}/>)}
        </div>
        <div className="flex items-center justify-center flex-col col-span-2">
            <div className="container flex items-center">
                <p className="text-2xl mr-4">{profileUsername}</p>
                {activeBtnFollow && (<button type="button" className="bg-blue-medium text-sm font-bold rounded text-white w-20 h-8" onClick={handleToggleFollow} onKeyDown={(e)=>{
                    if(e.key == "Enter")handleToggleFollow();
                }}>{isFollowingProfile ? "Unfollow" : "Follow"}</button>)}
            </div>
            <div className="container flex mt-4">
                {followers === undefined || following === undefined ? (<Skeleton count={1} width={677} height={24} />) : (
                <>
                    <p className="mr-10 ">
                        <span className="font-bold">{photosCount}</span>{" "}photos
                    </p>
                    <p className="mr-10 ">
                        <span className="font-bold">{followerCount}</span>{" "}{followers.length === 1 ? "follower": "followers"}
                    </p>
                    <p className="mr-10 ">
                        <span className="font-bold">{following.length}</span>{" "}following
                    </p>
                </>)
                }
            </div>
            <div className="container mt-4 ">
                <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName }</p>
            </div>
        </div>
    </div>
    );
}
Header.propTypes = {
    photosCount:PropTypes.number.isRequired,
    profile:PropTypes.shape({
        following: PropTypes.array.isRequired,
        followers: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
    }).isRequired
    ,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired
}