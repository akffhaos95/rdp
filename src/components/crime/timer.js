import { useEffect, useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";

const Timer = () => {
  const timetable = [
    //타임테이블 안에 순서랑 시간 추가 또는 수정하면 (10 == 10초, 10분 = 600 ) 타이머 시간에 알아서 반영됨
    { label: "1차조사", duration: 20 },
    { label: "1차토론", duration: 10 },
    { label: "2차조사", duration: 20 },
    { label: "밀담", duration: 10 },
    { label: "토론", duration: 30 },
    { label: "최후의 조사", duration: 5 },
    { label: "범인 지목", duration: 20 },
  ];
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
    <div style={{ padding: 20, display: "block" }}>
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
      <span style={{ fontSize: 250 }}>
        {Math.floor(timer / 60)
          .toString()
          .padStart(2, 0)}
        :
        {Math.floor(timer > 60 ? timer % 60 : timer)
          .toString()
          .padStart(2, 0)}
      </span>
      <button onClick={() => setStart(!start)}>
        {start ? "pause" : "start"}
      </button>
      <button onClick={resetTimer}>reset</button>
    </div>
  );
};

export default Timer;
