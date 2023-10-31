import {createTheme} from "@mui/material";

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    box: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: ["Anek Latin"].join(','),
    h1: {
      color: "#1F2937",
      fontSize: "28px",
      fontStyle: "normal",
      lineHeight: "36px",
      fontWeight: "600",
      width: "min-content",
      height: "min-content",
      whiteSpace: "nowrap",
    },
    h2: {
      color: "#1F2937",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "24px",
    }
  },
  components: {
    MuiPaper: {
      variants: [
        {
          props: { variant: 'box' },
          style: {
            padding: "80px 48px",
            borderRadius: "8px",
            background: "#FFF",
            boxShadow: "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)",
            width: "481px",
          },
        },
      ]
    },
    MuiAlert: {
      styleOverrides: {
        standardError: {
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
    },
  },
})

export default theme
