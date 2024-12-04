"use client";

import { Menu } from "antd";

const MenuElement = () => {

    const menuItems = [
        { key: "1", title: "Dashboard", icon: "dashboard" },
        { key: "2", title: "Profile", icon: "profile" },
        { key: "3", title: "Settings", icon: "setting" },
        { key: "4", title: "Logout", icon: "logout" },
    ]

    return (
        <>
            <Menu
            className="!bg-[rgba(0,0,0,0.1)]"
                items={menuItems}
                />
        </>
    )
}

export default MenuElement;