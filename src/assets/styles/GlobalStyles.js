import { createGlobalStyle } from "styled-components";
import { COLORS } from "../../constants/COLORS";
const { DARKPURPLE, LIGHTPURPLE, WHITE, BLACK, LIGHTGRAY } = COLORS;

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        background-color: ${DARKPURPLE};
    }

    /* MyWallet logo: */
    h1 {    
        margin-bottom: 24px;

        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        font-weight: 400;
        color: ${WHITE};
        line-height: 50px;
    }

    /* Login or Register messages: */
    h2 {
        margin-top: 36px;

        font-family: 'Raleway', sans-serif;
        font-size: 15px;
        font-weight: 700;
        color: ${WHITE};
    }   

    /* Hello, New Entry or New Exit titles: */
    h3 {
        margin-bottom: 22px;

        font-family: 'Raleway', sans-serif;
        font-size: 26px;
        font-weight: 700;
        color: ${WHITE};
        line-height: 30px;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    label {
        margin-bottom: 5px;
        
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: ${WHITE};
    }

    input {
        width: 90vw;
        max-width: 700px;
        height: 58px;
        padding: 15px;
        background-color: ${WHITE};
        border: none;
        border-radius: 5px;
        margin-bottom: 13px;

        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        font-weight: 400;
        color: ${BLACK};
    }

    ::placeholder {
        font-family: 'Raleway', sans-serif;
        font-style: italic;
        font-size: 20px;
        font-weight: 400;
        color: ${LIGHTGRAY};
    }

    button {
        border: none;
        border-radius: 5px;
        background-color: ${LIGHTPURPLE};
        cursor: pointer;

        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: ${WHITE};
    }
`;

export default GlobalStyles;
