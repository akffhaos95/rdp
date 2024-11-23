/* eslint-disable react/react-in-jsx-scope */

import { Step, StepLabel, Stepper } from "@mui/material";
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";

import alert from "../../asset/audio/timer_converted.mp3";
import theme from "../../style/Theme";

const timerAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
`;

const TimeText = styled.span`
  display: inline-block;
  animation: ${(props) => (!props.redFlag ? "none" : timerAnimation)} 0.3s
    infinite;
  font-size: 400px;
  color: ${(props) => (!props.redFlag ? "black" : "red")};
`;

const ControlBtn = styled.button`
  width: 140px;
  height: 65px;
  border-radius: 20px;
  border: none;
  outline: none;
  margin: 10px;
  font-size: 30px;
  background: ${theme.blue[30]};
`;
const Timer = () => {
  const timetable = [
    { label: "1차 조사", duration: 900 },
    { label: "1차 회의", duration: 900 },
    { label: "2차 조사", duration: 1200 },
    { label: "밀담", duration: 1200 },
    { label: "2차 회의", duration: 1800 },
    { label: "최후의 조사", duration: 600 },
    { label: "범인 지목", duration: 600 },
  ];

  const redFlag = 5;
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(timetable[0].duration);
  const [activeStep, setActiveStep] = useState(0);

  const handleSteps = (index) => {
    setActiveStep(index);
    setStart(false);
    setTimer(timetable[index].duration);
  };

  useEffect(() => {
    if (timer > 0 && start) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && activeStep < timetable.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
      setStart(false);
      setTimer(timetable[activeStep + 1].duration);
    }
  }, [timer, start, activeStep]);

  useEffect(() => {
    if (!start) return;

    if (timer === 0) {
      audio.play().catch((error) => console.error("Audio play failed:", error));
    }

    return () => {
      if (timer !== 0) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [start, timer, redFlag]);

  const resetTimer = () => {
    setActiveStep(0);
    setTimer(timetable[0].duration);
    setStart(false);
  };
  const audio = new Audio(alert);
  return (
    <div style={{ padding: 40 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {timetable.map((step, index) => (
          <Step
            key={step.label}
            onClick={() => handleSteps(index)}
            style={{ cursor: "pointer" }}
          >
            <StepLabel sx={{ "& .MuiStepLabel-label": { fontSize: "1.2rem" } }}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TimeText redFlag={redFlag >= timer && start}>
          {String(Math.floor(timer / 60)).padStart(2, "0")}:
          {String(timer % 60).padStart(2, "0")}
        </TimeText>
        <div>
          <ControlBtn onClick={() => setStart(!start)}>
            {start ? "PAUSE" : "START"}
          </ControlBtn>
          <ControlBtn onClick={resetTimer}>RESET</ControlBtn>
        </div>
      </div>
    </div>
  );
};

export default Timer;
