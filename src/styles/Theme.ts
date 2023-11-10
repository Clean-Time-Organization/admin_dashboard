import {createTheme} from "@mui/material";

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    nav: true;
  }
}

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {variant: 'nav'},
          style: {
            fontFamily: ["Anek Latin"].join(','),
            color: "#1F2937",
            textAlign: "center",
            leadingTrim: "both",
            textEdge: "cap",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "130%",
            letterSpacing: "0.32px",
            textTransform: "capitalize",
            padding: 0,
          }
        }
      ]
    },
  },
})

export default theme
