import {Box, Divider, Link, Typography} from "@mui/material";

const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "32px",
        alignItems: "center",
        height: "56px",
        marginTop: "35%",
      }}
    >
      <Box
        sx={{
          color: "#1F2937",
          textAlign: "center",
          fontFamily: "Anek Latin",
          fontSize: "64px",
          fontStyle: "normal",
          fontWeight: "282",
          lineHeight: "130%",
          letterSpacing: "-1.28px",
          height: "41px",
          display: "flex",
          alignItems: "center",
        }}
      >
        404
      </Box>
      <Divider orientation="vertical" flexItem
               style={{ height: "56px", backgroundColor: "#1F2937",}}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Typography
          sx={{
            color: "#1F2937",
            fontFamily: "Anek Latin",
            fontSize: "28px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "130%",
            height: "24px",
          }}
        >
          This page could not be found
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap:"5px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#1F2937",
              fontFamily: "Anek Latin",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "150%",
            }}
          >
            Please check your connection and
          </Typography>
          <Link
            component="button"
            underline="none"
            sx={{
              color: "#2E8DC8",
              fontFamily: "Anek Latin",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "130%",
              letterSpacing: "0.32px",
            }}
          >
            Try again
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export { PageNotFound };
