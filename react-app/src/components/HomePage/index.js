import React from "react";
import styled from "styled-components";
import NavBar from "../Navbar";
import { InnerPageContainer, PageContainer } from "../PageContainer";
import { FirstPage } from "./FirstPage";
// import { SecondPage } from "./SecondPage";
import { deviceSize } from "../responsive";

const ContentContainer = styled.div`
  width: 100%;
  max-width: ${deviceSize.laptop}px;
  display: flex;
  flex-direction: column;
  padding: 1em;
`;


const HomePage = () => {
  return (
    <PageContainer>
      <FirstPage>
        <NavBar />
      </FirstPage>
      <InnerPageContainer>
        <ContentContainer>
          {/* <SecondPage /> */}
        </ContentContainer>
      </InnerPageContainer>
    </PageContainer> 
  );
}

export default HomePage;
