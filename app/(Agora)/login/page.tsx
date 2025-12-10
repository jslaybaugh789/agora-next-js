/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { redirect } from "next/navigation";
import * as client from "../profile/client";
import Link from "next/link";
import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { GiGreekTemple } from "react-icons/gi";
import { setCurrentUser } from "../profile/reducer";
import { useDispatch } from "react-redux";
export default function Login() {
    const [credentials, setCredentials] = useState<any>({});
    const dispatch = useDispatch();
    const signin = async () => {
        const user =  await client.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user));
        redirect("/profile");
    };
    return (
        <div id="agora-login">
            <h1 className="text-primary"><GiGreekTemple className="me-2"/> Log In</h1> <hr/>
            <FormControl defaultValue={credentials.username}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                id="agora-username"
                placeholder="username"
                className="mb-2 w-50"/><br />
            <FormControl defaultValue={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                id="agora-password"
                placeholder="password" type="password"
                className="mb-2 w-50"/><br />
            <Button onClick={signin} id="agora-login-btn" className="w-50" > Log In </Button><br/><br/>
            <Link id="agora-register-link" href="/register">Register</Link>
        </div>
    )
}