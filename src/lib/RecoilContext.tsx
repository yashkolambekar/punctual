"use client";

import { RecoilRoot } from "recoil"

const RecoilContext = ({children} : {children: React.ReactNode}) => {
    return (
        <RecoilRoot>
        {children}
        </RecoilRoot>
    )
}

export default RecoilContext;