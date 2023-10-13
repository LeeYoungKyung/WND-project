import React, { startTransition, useEffect, useState } from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Main3 = styled.div`
  background: linear-gradient(#4e5e7a 10%, #263340);
  padding: 10px;
  flex: 1;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Star() {
  return (
    <>
      <MainWrapper>
        <MainContent>
          <Main3>Main3</Main3>
        </MainContent>
      </MainWrapper>
    </>
  );
}

export default Star;
