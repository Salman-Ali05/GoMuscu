import React from 'react';


const Nav = () => {
    return (
        <div>
            <nav>
                <div className="nav-left">
                    <div className="nav--items"><h1 style={{ fontSize: "30px" }}>GOMUSCU ADMIN</h1></div>
                </div>

                <div className="nav-right">
                    <div className="nav--items"><a href="/admin">ACCEUIL</a></div>
                    <div className="nav--items"><a href="/api/admin/createDumbell">CREATE</a></div>
                    <div className="nav--items"><a href="/logout">LOGOUT</a></div>
                </div>
            </nav>
        </div>
    )

}

export default Nav