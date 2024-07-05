import { css } from "@emotion/react";
import theme from "./Theme";
const main_component = {
	card: css`
		margin: 15px 15px 15px 15px;
		height: 230px;
		display: flex;
		justify-content: center;
		align-items: center;
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
};
export default main_component;
