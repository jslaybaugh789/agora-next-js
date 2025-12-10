/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { GiGreekTemple } from "react-icons/gi";
import * as client from "./client";
import { setCurrentUser } from "./reducer";
import { redirect } from "next/dist/client/components/navigation";
import { Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../store";
export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.profilesReducer);
    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        redirect("/login");
    };
    const fetchProfile = () => {
        if (!currentUser) return redirect("/login");
        setProfile(currentUser);
    };
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProfile();
    }, []);
    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };
    return (
        <div id="agora-profile">
            <h1 className="text-primary"><GiGreekTemple className="me-2"/> Profile</h1> <hr/>
            {profile && (<div>
            <FormControl id="agora-username" className="mb-2 w-50"
                defaultValue={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value }) } />
            <FormControl id="agora-password" className="mb-2 w-50"
                defaultValue={profile.password}
                onChange={(e) => setProfile({ ...profile, password: e.target.value }) } />
            <FormControl id="agora-firstname" className="mb-2 w-50"
                defaultValue={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value }) } />
            <FormControl id="agora-lastname" className="mb-2 w-50"
                defaultValue={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value }) } />
            <FormControl id="agora-dob" className="mb-2 w-50" type="date"
                defaultValue={profile.dob}
                onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
            <FormControl id="agora-email" className="mb-2 w-50"
                defaultValue={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            <FormControl id="agora-phone" className="mb-2 w-50"
                defaultValue={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            <select className="form-control mb-2 w-50" id="agora-role" 
                onChange={(e) => setProfile({ ...profile, role: e.target.value })} >
                <option value="BUYER">Buyer</option>
                <option value="SELLER">Seller</option>
            </select>
            <Button onClick={updateProfile} className="w-50 mb-2" id="agora-save-profile-btn">
                Save Changes
            </Button> <br/>
            <Button onClick={signout} className="w-50 mb-2 btn-danger" id="agora-signout-btn">
                Sign Out
            </Button></div>)}
        </div>
    )
}
