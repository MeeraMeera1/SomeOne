import React from "react";
import NavBar from "../Navbar";
import { PageContainer } from "../PageContainer";
import { FirstPage } from "./FirstPage";

const HomePage = () => {
  return (
    <PageContainer>
      <FirstPage>
        <NavBar />
      </FirstPage>
    </PageContainer>
  );
}

export default HomePage;
