import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./post";

export default function Timeline() {
    // we need to get the users photos of the logged in user's photos
    const { photos } = usePhotos();
    // console.log("photos", photos);
    // on loading photo's we need to use react skeleton
    // if we have photos, render them (create a post component)
    // if the user has no photos, tell them to create some photos

    return (
    <div className="container col-span-2">
        {!photos ? (
            <>
                <Skeleton className="mb-4" count={4} width={640} height={500} />
            </>
        ): photos?.length>0 ?
        (photos.map((photo) => <Post key={photo.docId} content= {photo} /> ))
        :(<p className="text-center text-2xl">Follow people to see photos.</p>)}
    </div>
    )
}
