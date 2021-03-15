import React from "react";
import styled from "styled-components";

import LogoI from "../../assets2/logo.svg"
import { Link } from "react-router-dom";

const BrandLogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.div`
  width: 2em;
  height: 2em;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Logo = () => {
    return (
        <BrandLogoContainer>
            <Link to="/">
                <LogoImage>
                    <img src={LogoI} alt="logo" />
                </LogoImage>
            </Link>
        </BrandLogoContainer>
    )
}

export default Logo;