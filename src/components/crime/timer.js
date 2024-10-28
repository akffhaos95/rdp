import { useEffect, useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import styled, { keyframes } from "styled-components";
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
  animation: ${(props) =>
      props.timer > props.redFlag ? "none" : timerAnimation}
    0.2s infinite;
  font-size: 400px;
  color: ${(props) => (props.redFlag < props.timer ? "black" : "red")};
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
    { label: "1차조사", duration: 20 },
    { label: "1차토론", duration: 10 },
    { label: "2차조사", duration: 20 },
    { label: "밀담", duration: 10 },
    { label: "토론", duration: 30 },
    { label: "최후의 조사", duration: 5 },
    { label: "범인 지목", duration: 20 },
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

  const resetTimer = () => {
    setActiveStep(0);
    setTimer(timetable[0].duration);
    setStart(false);
  };

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
        <TimeText timer={timer} redFlag={redFlag}>
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
