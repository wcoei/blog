import * as React from "react"
import { ReactNode } from "react"
import { Link } from 'gatsby'
import icon from "../images/icon.png"

type LayoutProps = {
    children: ReactNode
}


const Layout = ({ children }: LayoutProps) => {
    return (
        <main className="global-wrapper">
            <div style={{ textAlign: 'center' }}>
                <h1> <img src={icon} width={36} height={36} /> Yawny Coder (beta)</h1>
                <h6> Sharing thought of coding... </h6>
            </div>
            <div style={{ textAlign: 'left' }}> <Link to={'/'}> Home </Link> </div>
            <hr />
            {children}
            <hr/>
            <div style={{ textAlign: 'center' }}>
                <h6> Powered by Gatsby and Strapi </h6>
            </div>
        </main>
    )
}

export default Layout