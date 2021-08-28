import React, {useEffect} from 'react';
import Header from "../components/header";


function NotFound() {

    useEffect(() => {
            document.title="Not Found- Instagram";
    }, [])

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg ">
                <p className="text-center text-2xl text-black">
                    Not Found
                </p>
            </div>
        </div>
    )
}

export default NotFound
