import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
/// Import OpenAIApi and CreateCompletionRequest

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
  // const [music, setMusic] = useState({ title: "", singer: "" });

  // // OpenAI API 호출
  // const fetchOpenApi = useCallback(() => {
  //   const configuration = new Configuration({
  //     apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Fix the API key reference
  //   });

  //   const testPrompt = "recommend me one female indie song";

  //   const api = new OpenAIApi(configuration);

  //   api
  //     .createCompletion(
  //       CreateCompletionRequest.fromObject({
  //         model: "text-davinci-003",
  //         prompt: testPrompt,
  //         temperature: 0,
  //         max_tokens: 150,
  //       })
  //     )
  //     .then(res => {
  //       const { choices } = res.data;
  //       const [title, singer] = choices[0].text.split(" by ");

  //       setMusic({ title, singer });
  //     });
  // }, []);

  // useEffect(() => {
  //   fetchOpenApi(); // 컴포넌트가 마운트될 때 호출
  // }, []);

  // const { title, singer } = music;
  return (
    <MainWrapper>
      <MainContent>
        <Main3>
          {/* <div className="App">
            {title} - {singer} 
  </div>*/}
        </Main3>
      </MainContent>
    </MainWrapper>
  );
}

export default Star;
