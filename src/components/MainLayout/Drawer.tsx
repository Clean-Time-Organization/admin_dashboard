import {FC, memo} from "react";
import {Box, Button, Drawer as MuiDrawer, Typography} from "@mui/material";
import {Details} from "../Icons/Details";
import {useAppSelector} from "../../store/hooks";

type Props = {
  width: number
}

export const Drawer: FC<Props> = memo(function Drawer({width}) {
  const drawerData = useAppSelector(state => state.drawerData)

  return (
    <MuiDrawer
      variant="persistent"
      anchor="left"
      open={true}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: {width},
          boxSizing: "border-box",
          marginTop: "64px",
          paddingTop: "16px",
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          padding: "12px 16px",
          marginBottom: "16px",
        }}
      >
        <Box
          component="div"
          sx={{
            backgroundColor: "#EEF5FB",
            width: "32px",
            height: "32px",
            borderRadius: '50%',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#1A4C73",
              leadingTrim: "both",
              textEdge: "cap",
              fontFamily: "Anek Latin",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "120%",
            }}
          >
            {drawerData.roundTitle}
          </Typography>
        </Box>
        <Box
          sx={{
            maxWidth: "180px",
          }}
        >
          <Typography
            sx={{
              color: "#1F2937",
              leadingTrim: "both",
              textEdge: "cap",
              fontFamily: "Anek Latin",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "normal",
              marginBottom: "12px",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {drawerData.title}
          </Typography>
          <Typography
            sx={{
              color: "#474A58",
              leadingTrim: "both",
              textEdge: "cap",
              fontFamily: "Anek Latin",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "135%",
            }}
          >
            {drawerData.subTitle}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <Button
          variant="drawer"
          startIcon={<Details/>}
          style={{
            backgroundColor: "#2E8DC8",
          }}
        >
          Details
        </Button>
      </Box>
    </MuiDrawer>
  )
})
