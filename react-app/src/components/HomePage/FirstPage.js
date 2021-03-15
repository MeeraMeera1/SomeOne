import React from "react";
// import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
// import { deviceSize } from "../responsive";

import FriendGroup from "../../assets2/friendgroup.svg";
import FirstPageText from "../../assets2/firspagtxt.svg";

const PageContainer = styled.div`
  width: 100%;
  height: 900px;
  background-color: #e4e5c3;
  background-position: 0px -150px;
  background-size: cover;
  align-content: space-between;
`;

const FirstPageTextCon = styled.div`
    width: 90em;
    height: 15em;
    position: relative;
    top: 80px;

    img {
      position: absolute;
      bottom:25px;
    }
`;

const FriendGroupCon = styled.div `
  width: 99em;
  position: absolute;
  bottom: 0;
  left: 0;
  
  img {
    width: 99em;
  }
  

`;

export function FirstPage(props) {
    const { children } = props;

    return (
      <PageContainer>
        <FirstPageTextCon>
          <img src={FirstPageText} alt="text" />
        </FirstPageTextCon>
        <FriendGroupCon>
          <img src={FriendGroup} alt="friends" />
        </FriendGroupCon>
      </PageContainer>
    );
}