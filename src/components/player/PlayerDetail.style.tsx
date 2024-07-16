import styled, { keyframes } from "styled-components";
import theme from "../../style/Theme";

// 애니메이션 정의
export const fadeInFromRight = keyframes`
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const fadeInFromLeft = keyframes`
  to {
    opacity: 1;
    left: 0;
  }
`;

export const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`;

// 페인트 효과 정의
export const splatterEffect = keyframes`
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
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // min-width: 100%;
  // max-width: 1326px;
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

  .edit {
    //선수 수정버튼
    position: absolute;
    right: 0px;
    color: ${theme.main};
    height: fit-content;
    &:active {
      color: ${theme.white_80};
      background: ${theme.main};
    }
  }
  .img_btn {
    color: ${theme.white_80};
    background: ${theme.main};
    margin: 0px 10px;
    height: fit-content;
    width: fit-content;
    input {
      opacity: 0;
      position: absolute;
    }
  }
  form {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
  opacity: 0;
  transform: translateX(0%);
  animation: ${fadeInFromLeft} 2s forwards;
  //   margin-right: auto;
  display: block;
`;

export const InfoContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  width: 100%;
`;

export const Number = styled.div`
  font-size: 4em;
  font-weight: bold;
  color: #ff0000;
  opacity: 0;
  animation: ${fadeInFromRight} 2s forwards;
  text-align: right;
  margin-bottom: 10px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
`;

export const Name = styled.div`
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

export const Stats = styled.div`
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
