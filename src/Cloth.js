import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import final from "./final.mp4";
import t from "./img/t.png";
import o from "./img/o.png";
import d from "./img/d.png";
import a from "./img/a.png";
import y from "./img/y.png";
import c from "./img/c.png";
import l from "./img/l.png";
import h from "./img/h.png";

import cloth from "./img/cloth.png";
import cloth2 from "./img/cloth2.png";
import cloth3 from "./img/cloth3.png";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-left: 10px;
  padding-right: 10px;
  overflow-x: hidden;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
`;

const Main2 = styled.div`
  display: flex;
  background-color: #4e5e7a;
  flex: 1;
  width: 100%;
  align-items: center;
  overflow: hidden;
`;

const bounceUpDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space between;
  align-items: center;
  width: 100%;
  overflow: hidden;
  flex-direction: column;
  height: 200px;
  position: relative;
  animation: ${bounceUpDown} 2s ease-in-out infinite;
`;

const First = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Second = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 170%;
  margin: 0;
  z-index: 1;
`;

const Message = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
  border-radius: 5px;
  z-index: 2;
`;

function Cloth() {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [showDelayedContent, setShowDelayedContent] = useState(false);

  const getScrollPosition = () => {
    return window.scrollY;
  };

  useEffect(() => {
    function handleScroll() {
      const scrollY = getScrollPosition();
      console.log(scrollY);
      setScrollY(scrollY);

      if (scrollY >= 450 && scrollY <= 900) {
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

    videoRef.current.onplay = () => setIsPlaying(true);
    videoRef.current.onpause = () => setIsPlaying(false);

    window.addEventListener("scroll", handleScroll);

    const getWeatherByCurrentLocation = async (lat, lon) => {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5b58f4b916657c538913b1c2b8086c8e`;
      let response = await fetch(url);
      let data = await response.json();
      console.log("날씨", data);
      setWeatherData(data);
    };

    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("위치", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });

    const delayDuration = 2000;
    setTimeout(() => {
      setShowDelayedContent(true);
    }, delayDuration);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isPlaying]);

  const kelvin_to_celsius = kelvin => kelvin - 273.15;
  const temperature = kelvin_to_celsius(weatherData?.main?.temp);
  let cloths = "";

  if (temperature >= 0 && temperature <= 4) {
    cloths = "패딩, 두꺼운 코트, 목도리, 기모 옷";
  } else if (temperature >= 5 && temperature <= 8) {
    cloths = "코트, 히트텍";
  } else if (temperature >= 0 && temperature <= 23) {
    cloths = (
      <div style={{ display: "flex" }}>
        <img
          style={{ marginLeft: "100px", marginTop: "150px" }}
          height="300px"
          src={cloth3}
          alt="Cloth 3"
        />
        <img
          style={{ marginLeft: "75px", marginBottom: "800px" }}
          height="450px"
          src={cloth}
          alt="Cloth 1"
        />

        <img height="300px" src={cloth2} alt="Cloth 2" />
      </div>
    );
  }
  //  else if (temperature >= 20 && temperature <= 22) {
  //   cloths = "얇은 가디건, 긴팔 티셔츠, 면 바지";
  // }
  else if (temperature >= 23 && temperature <= 27) {
    cloths = "민소매나 반팔";
  }

  return (
    <MainWrapper>
      <MainContent>
        <Main2>
          <Container>
            <First>
              <img src={t} alt="알파벳 T" />
              <img src={o} alt="알파벳 O" />
              <img src={d} alt="알파벳 D" />
              <img src={a} alt="알파벳 A" />
              <img src={y} alt="알파벳 Y" />
            </First>
            <Second>
              <img src={c} alt="알파벳 C" />
              <img src={l} alt="알파벳 L" />
              <img src={o} alt="알파벳 o" />
              <img src={t} alt="알파벳 t" />
              <img src={h} alt="알파벳 H" />
            </Second>
          </Container>

          <VideoWrapper>
            <video
              ref={videoRef}
              src={final}
              muted
              autoPlay
              width="100%"
              style={{ margin: 0 }}
            />
            {showDelayedContent && scrollY >= 450 && scrollY <= 900 && (
              <Message>{cloths}</Message>
            )}
          </VideoWrapper>
        </Main2>
      </MainContent>
    </MainWrapper>
  );
}

export default Cloth;
