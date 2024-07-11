// PlayerDetail.tsx

import styled, { keyframes } from "styled-components";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import BoyIcon from "@mui/icons-material/Boy";
import React from "react";
import { useMediaQuery } from "@mui/material";
interface Player {
  name: string;
  number: string;
  photoURL: string;
  stats: { label: string; value: string }[];
}

// 애니메이션 정의
const fadeInFromRight = keyframes`
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInFromLeft = keyframes`
  to {
    opacity: 1;
    left: 0;
  }
`;

const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`;

// 페인트 효과 정의
const splatterEffect = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// styled-components 정의
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100%;

  max-width: 1326px;
  overflow: hidden;
  height: 100%;
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  position: relative;
  background:
    linear-gradient(135deg, #f0f0f0 25%, transparent 25%) -50px 0/ 100px 100px,
    linear-gradient(225deg, #f0f0f0 25%, transparent 25%) -50px 0/ 100px 100px,
    linear-gradient(315deg, #f0f0f0 25%, transparent 25%),
    linear-gradient(45deg, #f0f0f0 25%, transparent 25%);
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("path-to-paint-splatter-image.png") center center no-repeat;
    opacity: 0;
    animation: ${splatterEffect} 2s forwards;
  }
`;

const PhotoContainer = styled.div`
  flex: 0 0 auto;
  width: 300px;
  height: 350px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 20px;
`;

const Photo = styled.img`
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
  opacity: 0;
  transform: translateX(0%);
  animation: ${fadeInFromLeft} 2s forwards;
  margin-right: auto;
`;

const InfoContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  width: 100%;
`;

const Number = styled.div`
  font-size: 4em;
  font-weight: bold;
  color: #ff0000;
  opacity: 0;
  animation: ${fadeInFromRight} 2s forwards;
  text-align: right;
  margin-bottom: 10px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
`;

const Name = styled.div`
  font-size: 2em;
  font-weight: bold;
  color: #000000;
  background: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
  opacity: 0;
  animation: ${fadeInFromRight} 2s forwards;
  animation-delay: 1s;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
`;

const Stats = styled.div`
  width: 100%;
  margin-top: 20px;
  text-align: left;
  opacity: 0;
  animation: ${fadeIn} 2s forwards;
  animation-delay: 2s;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
  }

  .stat-label {
    font-size: 1em;
  }

  .stat-value {
    font-size: 2em;
    font-weight: bold;
  }
`;

// PlayerDetail 컴포넌트
const PlayerDetail: React.FC<{ player: Player }> = ({ player }) => {
  const stats = player?.stats ?? []; // stats가 undefined일 경우 빈 배열 사용
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  return (
    <Card>
      {/* <PhotoContainer> */}
      {player.photoURL ? (
        <Photo
          src={player.photoURL}
          alt={player.name}
          style={
            isMobile ? { width: 170, height: 220 } : { width: 250, height: 330 }
          }
        />
      ) : (
        <div
          style={{
            position: "relative",
            display: "block",
            background: "white",
            height: "380px",
            marginRight: "auto",
          }}
        >
          <SportsBaseballIcon style={{ fontSize: 250, color: "black" }} />
          <BoyIcon
            style={{
              fontSize: 250,
              marginRight: "auto",
              position: "absolute",
              left: 0,
              top: 150,
            }}
          />
        </div>
      )}
      {/* </PhotoContainer> */}
      <InfoContainer>
        <Number>{player.number}</Number>
        <Name>{player.name}</Name>
        <Stats>
          <ul>
            {stats.map((stat, index) => (
              <li key={index}>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
              </li>
            ))}
          </ul>
        </Stats>
      </InfoContainer>
    </Card>
  );
};

export default PlayerDetail;
