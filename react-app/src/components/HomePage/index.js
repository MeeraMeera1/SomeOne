import React from "react";
import styled from "styled-components";
import { PageContainer } from "../PageContainer";
import { FirstPage } from "./FirstPage";

export function HomePage(props) {
    return (
        <PageContainer>
            <FirstPage />
        </PageContainer>
    )
}