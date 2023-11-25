import {createTheme} from "@mui/material";

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    nav: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    drawerActive: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    drawer: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: [
      'Anek Latin',
      'sans-serif',
    ].join(','),
  },
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
    MuiButton: {
      variants: [
        {
          props: { variant: 'drawerActive' },
          style: {
            justifyContent: "flex-start",
            paddingLeft: "16px",
            borderRadius: "4px",
            maxWidth: "222px",
            maxHeight: "48px",
            minWidth: "222px",
            minHeight: "48px",
            fontFamily: "Anek Latin",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
            textTransform: "capitalize",
            color: "#FFF",
            backgroundColor: "#2E8DC8",
            "&:hover": {
              background: "#2E8DC8",
            },
          }
        },
        {
          props: { variant: 'drawer' },
          style: {
            justifyContent: "flex-start",
            paddingLeft: "16px",
            borderRadius: "4px",
            maxWidth: "222px",
            maxHeight: "48px",
            minWidth: "222px",
            minHeight: "48px",
            fontFamily: "Anek Latin",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "150%",
            textTransform: "capitalize",
            color: "#656873",
            backgroundColor: "#FFF",
            leadingTrim: "both",
            textEdge: "cap",
          }
        }
      ]
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#1F2937',
          '&.Mui-focused': {
            borderColor: '#2E8DC8',
            borderWidth: '1px',
          },
          '&.Mui-error': {
            color: '#B91C1C',
            borderColor: '#B91C1C',
            '&:placeholder': {
              color: '#B91C1C',
            },
          },
        },
        input: {
          '&:placeholder': {
            color: '#6B7280',
          },
        }
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          color: '#6B7280',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.MuiInputLabel-shrink': {
            top: 0,
          },
          '&.Mui-focused': {
            color: '#2E8DC8',
            top: 0,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        shrink: {
          top: 0,
        },
      },
    },
  }
});

export default theme
