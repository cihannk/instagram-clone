import PropTypes from "prop-types";
import Header from "./header";
import Photos from "./photos";
import { useReducer, useEffect } from "react";
import {getUserPhotosByUsername} from "../../services/firebase";

export default function UserProfile ({user}) {
    const reducer = (state, newState) => ({...state, ...newState});
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    };
    const [{profile, photosCollection, followerCount }, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotosByUsername(user.username);
            dispatch({profile: user, photosCollection: photos, followerCount: user.followers.length})
            console.log("user1", user);
        }

        if(user.username){
            getProfileInfoAndPhotos(user.username);
        }
        
    }, [user])
    return( <>
    <Header photosCount= {photosCollection ? photosCollection.length : 0} profile={profile} followerCount={followerCount} setFollowerCount={dispatch} />
    <Photos photos={photosCollection} />
    </>
    )
} 

UserProfile.propTypes = {
    user: PropTypes.shape({
        dateCreated:PropTypes.number.isRequired,
        emailAdress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    })
}