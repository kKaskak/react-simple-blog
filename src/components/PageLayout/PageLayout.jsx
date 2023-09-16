import React from "react";
import { Navbar } from "../../components";

const PageLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default PageLayout;
