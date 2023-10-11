import React from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Main1 = styled.div`
  background-color: #80b3ff;
  padding: 10px;
  flex: 1;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main2 = styled.div`
  background-color: #5c748e;
  padding: 10px;
  flex: 1;
  min-height: 100vh;
  width: 100%; /* 가로 폭을 100%로 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main3 = styled.div`
  background-color: #263340;
  padding: 10px;
  flex: 1;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Main() {
  return (
    <MainWrapper>
      <MainContent>
        {/* 순서대로 날씨 옷추천 별자리 */}
        <Main1>Main 1</Main1>
        <Main2>Main 2</Main2>
        <Main3>Main 3</Main3>
      </MainContent>
    </MainWrapper>
  );
}

export default Main;
