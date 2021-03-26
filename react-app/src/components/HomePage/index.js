import React from "react";
import styled from "styled-components";
import { InnerPageContainer, PageContainer } from "../PageContainer";
import { FirstPage } from "./FirstPage";
import { SecondPage } from "./SecondPage";
import { ThirdPage } from "./ThirdPage";



const ContentContainer = styled.div`
  width: 100%;
`;


const HomePage = () => {
  return (
    <PageContainer>
      <FirstPage />
      <InnerPageContainer>
        <ContentContainer>
          <SecondPage />
        </ContentContainer>
      </InnerPageContainer>
      <ContentContainer>
        <ThirdPage />
      </ContentContainer>
    </PageContainer>
  );
}

export default HomePage;
