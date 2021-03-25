import React from "react";
import styled from "styled-components";
import { InnerPageContainer, PageContainer } from "../PageContainer";
import { FirstPage } from "./FirstPage";
// import { SecondPage } from "./SecondPage";



const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
`;


const HomePage = () => {
  return (
    <PageContainer>
      <FirstPage />
      <InnerPageContainer>
        <ContentContainer>
          {/* <SecondPage /> */}
        </ContentContainer>
      </InnerPageContainer>
    </PageContainer> 
  );
}

export default HomePage;
