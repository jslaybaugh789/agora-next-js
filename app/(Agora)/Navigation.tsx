"use client"
import { FaHouse } from "react-icons/fa6";
import { FaUser, FaSearch, FaGithub} from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function AgoraNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Home", path: "/home", icon: FaHouse },
    { label: "Profile",   path: "/profile", icon: FaUser },
    { label: "Search",  path: "/search",  icon: FaSearch },
    { label: "Login",      path: "/login",      icon: IoLogIn },
    { label: "Github Info", path: '/information', icon: FaGithub}
  ];
  return (
    <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-dark z-2" style={{ width: 120 }} id="agora-navigation">
      {links.map((link) => (
        <ListGroupItem key={link.label} as={Link} href={link.path}
          className={`bg-dark text-center border-0
              ${(pathname.includes(link.label.toLowerCase())) ? "text-primary bg-white" : "text-white bg-dark"}`}>
          {link.icon({ className: "fs-1 text-primary"})}
          <br />
          {link.label}
        </ListGroupItem>
      ))}
    </ListGroup>
);}