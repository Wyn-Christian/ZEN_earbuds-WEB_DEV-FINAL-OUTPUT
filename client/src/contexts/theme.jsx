import { createContext, useContext } from "react";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({});

theme = responsiveFontSizes(theme);
 
export default theme;
