import Header from "../components/Header";
import Tabs from "../components/Tabs";
import {menuItems} from "../data/menuItems";
import MenuItem from "../components/MenuItem";
import React from "react";

const MenuPage: React.FC = () => {
    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
            <Header/>
            <Tabs/>
            <div className="p-4 space-y-4">
                {menuItems.map((item, index) => (
                    <MenuItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
}

export default MenuPage;