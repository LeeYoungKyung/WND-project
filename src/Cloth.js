import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import final from "./final.mp4";
import t from "./img/t.png";
import o from "./img/o.png";
import d from "./img/d.png";
import a from "./img/a.png";
import y from "./img/y.png";

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

const Main2 = styled.div`
  display: flex;
  background-color: #4e5e7a;
  padding: 10px;
  flex: 1;
  /* min-height: 100vh; */
  width: 100%;
  align-items: center;
  justify-content: flex-end;

  img {
    width: 200px;
    height: auto;
  }
  video {
    right: 0px;
  }
`;

function Cloth() {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    function getScrollPosition() {
      return window.scrollY;
    }

    function handleScroll() {
      const scrollY = getScrollPosition();
      if (scrollY >= 200 && scrollY <= 750) {
        if (!isPlaying) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      } else {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    }

    videoRef.current.onPlay = () => setIsPlaying(true);
    videoRef.current.onPause = () => setIsPlaying(false);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isPlaying]);

  return (
    <MainWrapper>
      <MainContent>
        <Main2>
          <img src={t} alt="알파벳 T" />
          <img src={o} alt="알파벳 O" />
          <img src={d} alt="알파벳 D" />
          <img src={a} alt="알파벳 A" />
          <img src={y} alt="알파벳 Y" />
          <video
            ref={videoRef}
            src={final}
            muted
            autoPlay
            width="70%"
            style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
          ></video>
        </Main2>
      </MainContent>
    </MainWrapper>
  );
}

export default Cloth;
