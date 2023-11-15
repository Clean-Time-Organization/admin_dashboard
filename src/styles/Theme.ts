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
    MuiAlert: {
      variants: [
        {
          props: { variant: 'support' },
          style: {
            width: "349px",
            backgroundColor: "white",
            color: "#B91C1C",
            padding: "0",
            "& .MuiAlert-icon": {
              padding: "4px 0",
              marginRight: "3px",
              fontSize: "16px",
            },
            "& .MuiAlert-message": {
              fontFamily: ["Anek Latin"].join(','),
              padding: "4px 0",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "16px",
            },
          }
        }
      ]
    },
  },
})

export default theme
