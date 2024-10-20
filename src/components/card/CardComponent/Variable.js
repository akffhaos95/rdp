import "react-circular-progressbar/dist/styles.css";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";

const Variable = ({ vc, scale }) => {
  const percentage = 66;

  return (
    <div style={{ width: scale * 1.6, margin: "4%" }}>
      <CircularProgressbarWithChildren
        counterClockwise
        color={"#66eada"}
        value={66}
      >
        <img
          style={{ width: scale * 2, marginTop: -scale / 8 }}
          src={`variableLogo.png`}
          alt="doge"
        />
        <div
          style={{
            fontFamily: "CookieRun Regular",
            fontSize: scale / 4,
            color: "white",
            marginTop: -scale / 4,
          }}
        >
          <strong>{vc}%</strong>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default Variable;
