"use client";
import { ReactNode } from "react";
import AgoraNavigation from "./Navigation";
import './styles.css';
export default function AgoraLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
    <div className="d-flex" id="agora">
        <div>
            <AgoraNavigation />
        </div>
        <div className="flex-fill ps-3 wd-main-content-offset">{children}</div>
    </div>
);}
