import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../Navbar";
import { PageContainer } from "../PageContainer";

const Background = styled.img`
  height: 100vh;
  width: 100%;
  z-index: -1;
`;

const HomePage = () => {
  const bgs = [
    "https://someone01.s3.amazonaws.com/firstpage.png",
    "https://someone01.s3.amazonaws.com/page2.png",
    "https://someone01.s3.amazonaws.com/thirdpage.png",
  ];

  const [dynamicUrl, setDynamicUrl] = useState(0);

  return (
    <PageContainer>
      <Background src={bgs[dynamicUrl]}>
        <NavBar />
      </Background>
    </PageContainer> 
  );
}

export default HomePage;
