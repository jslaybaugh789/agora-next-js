import Link from "next/link";
import { Button, FormControl } from "react-bootstrap";
import { GiGreekTemple } from "react-icons/gi";
export default function Register() {
    return (
        <div id="agora-login">
            <h1 className="text-primary"><GiGreekTemple className="me-2"/> Register</h1> <hr/>
            <FormControl //defaultValue={credentials.username}
                //onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                id="agora-username"
                placeholder="username"
                className="mb-2 w-50"/><br />
            <FormControl //defaultValue={credentials.password}
                //onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                id="agora-password"
                placeholder="password" type="password"
                className="mb-2 w-50"/><br />
            <Button /*onClick={signin}*/ id="agora-register-btn" className="w-50" > Register</Button><br/><br/>
            <Link id="agora-login-link" href="/login">Log In</Link>
        </div>
    )
}