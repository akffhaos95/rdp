import { css } from "@emotion/react";
import theme from "./Theme";
export const card_component = {
  card: css`
    margin: 15px 15px 15px 15px;
    height: 230px;
    position: relative;
  `,
  card_add: css`
    margin: 15px 15px 15px 15px;
    height: 230px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 45%;
    &:hover {
      opacity: 80%;
    }
    &:active {
      background: ${theme.bg_20};
      // opacity: 45%;
    }
  `,
  card_name:css`
  position:absolute;
  bottom:5px;
  right:5px;
  font-weight:600;
  font-size:22px;
  `
};
export const main_component = {

}
