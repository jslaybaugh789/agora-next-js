'use client';
import { GiGreekTemple } from "react-icons/gi";
import { redirect } from "next/dist/client/components/navigation";
import { Button, FormControl } from "react-bootstrap";
export default function Profile() {
    const profile = {
        username: "user",
        password: "password",
        firstName: "First",
        lastName: "Last",
        dob: "1/1/1990",
        email: "firstlast@domain.com"
    }
    return (
        <div id="agora-profile">
            <h1 className="text-primary"><GiGreekTemple className="me-2"/> Profile</h1> <hr/>
            <FormControl id="agora-username" className="mb-2 w-50"
                defaultValue={profile.username}
                /*onChange={(e) => setProfile({ ...profile, username: e.target.value }) } *//>
            <FormControl id="agora-password" className="mb-2 w-50"
                defaultValue={profile.password}
                /*onChange={(e) => setProfile({ ...profile, password: e.target.value }) } *//>
            <FormControl id="agora-firstname" className="mb-2 w-50"
                defaultValue={profile.firstName}
                /*onChange={(e) => setProfile({ ...profile, firstName: e.target.value }) } *//>
            <FormControl id="agora-lastname" className="mb-2 w-50"
                defaultValue={profile.lastName}
                /*onChange={(e) => setProfile({ ...profile, lastName: e.target.value }) } *//>
            <FormControl id="agora-dob" className="mb-2 w-50" type="date"
                defaultValue={profile.dob}
                /*onChange={(e) => setProfile({ ...profile, dob: e.target.value })} *//>
            <FormControl id="agora-email" className="mb-2 w-50"
                defaultValue={profile.email}
                /*onChange={(e) => setProfile({ ...profile, email: e.target.value })} *//>
            <select className="form-control mb-2 w-50" id="agora-role" 
                /*onChange={(e) => setProfile({ ...profile, role: e.target.value })} */>
                <option value="BUYER">Buyer</option>
                <option value="SELLER">Seller</option>
            </select>
            <Button /*onClick={signout}*/ className="w-50 mb-2" id="agora-save-profile-btn">
                Save Changes
            </Button> <br/>
            <Button /*onClick={signout}*/ className="w-50 mb-2 btn-danger" id="agora-signout-btn">
                Sign Out
            </Button>
        </div>
    )
}
