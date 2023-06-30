import {useEffect, useState} from "react";


export default function useLocalPhoto(photoLink) {

    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        async function fetchProfilePic() {
            try {
                const response = await import(`../assets/${photoLink}.jpg`);
                setProfilePic(response.default);
            } catch (error) {
                console.log(error);
                const fallback = await import("../assets/employee.png");
                setProfilePic(fallback.default);
            }
        }

        if (photoLink) {
            fetchProfilePic();
        }
    }, [photoLink]);


    return profilePic;
}