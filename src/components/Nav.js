import React from 'react';


const Nav = () => {
    return (
        <div>
            <nav>
                <div class="nav-left">
                    <div class="nav--items"><h1 style={{ fontSize: "30px" }}>GOMUSCU</h1></div>
                </div>

                <div class="nav-right">
                    <div class="nav--items"><a href="/">ACCEUIL</a></div>
                    <div class="nav--items"><a href="#">POPULER</a></div>
                    <div class="nav--items"><a href="#">PROTEIN SNACKS</a></div>
                    <div class="nav--items"><a href="#">WHEY</a></div>
                    <div class="nav--items"><a href="/user/connect">CONNECT</a></div>
                </div>
            </nav>
        </div>
    )

}

export default Nav