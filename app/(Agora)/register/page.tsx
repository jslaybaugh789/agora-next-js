/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../profile/reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../profile/client";
import { GiGreekTemple } from "react-icons/gi";
export default function Register() {
    const [user, setUser] = useState<any>({});
    const dispatch = useDispatch();
    const signup = async () => {
        const currentUser = await client.signup(user);
        dispatch(setCurrentUser(currentUser));
        redirect("/profile");
    };
    return (
        <div id="agora-login">
            <h1 className="text-primary"><GiGreekTemple className="me-2"/> Register</h1> <hr/>
            <FormControl defaultValue={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="agora-username mb-4 w-50" placeholder="username" />
            <FormControl defaultValue={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="agora-password mb-4 w-50" placeholder="password" type="password"/>
            <select className="form-control mb-2 w-50" id="agora-role" 
                onChange={(e) => setUser({ ...user, role: e.target.value })} >
                <option value="BUYER">Buyer</option>
                <option value="SELLER">Seller</option>
            </select>
            <Button onClick={signup} className="agora-register-btn btn btn-primary mb-4 w-50"> Register </Button><br/>
            <Link href="/login" className="agora-login-link">Log In</Link>
        </div>
    )
}