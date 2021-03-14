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
`;

const FirstPageTextCon = styled.div`
    width: 200px;
    height: 200px;
`;

const FriendGroupCon = styled.div ``;

export function FirstPage(props) {
    const { children } = props;

    return (
      <PageContainer>
        <FirstPageTextCon>
          <img src={FirstPageText} alt="text" />
        </FirstPageTextCon>
        <img src={FriendGroup} alt="friends" />
      </PageContainer>
    );
}