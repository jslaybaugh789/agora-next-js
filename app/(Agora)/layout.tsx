"use client";
import { ReactNode } from "react";
import AgoraNavigation from "./Navigation";
import './styles.css';
import { Provider } from "react-redux";
import store from "./store";
import Session from "./profile/session";
export default function AgoraLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
    <Provider store={store}>
        <Session>
            <div className="d-flex" id="agora">
                <div>
                    <AgoraNavigation />
                </div>
                <div className="flex-fill ps-3 wd-main-content-offset">{children}</div>
            </div>
        </Session>
    </Provider>
);}
