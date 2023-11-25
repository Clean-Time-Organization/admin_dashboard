import {
  Content,
} from './styled';
import {useLocation, matchPath} from "react-router-dom";
import {ReactNode, useEffect, useState} from "react";
import {
  AppBar,
  Box, ThemeProvider
} from "@mui/material";
import theme from "../../styles/Theme";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { Snackbar } from '../Snackbar/Snackbar';
import { setNotification } from '../../store/features/notification';
import {setBreadCrumbsData} from "../../store/features/breadCrumbsDataSlice";
import {Drawer} from "./Drawer";
import {Toolbar} from "./Toolbar";

const MainLayout = ({children}: {children: ReactNode}) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const {notificationMessage, notificationType} = useAppSelector(state => state.notification)
  const [showDrawer, setShowDrawer] = useState(false)
  let timeout: any = null;

  useEffect(() => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    if (notificationMessage) {
      timeout = setTimeout(() => {
        dispatch(setNotification({
          notificationMessage: '',
          notificationType: undefined,
        }))
      }, 8000);
    }
  }, [notificationMessage]);

  useEffect(() => {
    dispatch(setBreadCrumbsData({
      title: '',
    }))

    let patterns = ['/customers/:id', '/staff/:id', '/laundries/:id']
    let match = false
    for (let i = 0; i < patterns.length; i += 1) {
      const pattern = patterns[i]
      const lastPiece = location.pathname.split('/')[location.pathname.split('/').length - 1];
      const possibleMatch = matchPath({path: pattern}, location.pathname)
      if (possibleMatch !== null && lastPiece !== 'create') {
        match = true
        break
      }
    }
    setShowDrawer(match)
  }, [location])

  if (location.pathname.toLowerCase().slice(0, 6) === '/login') return <>{children}</>

  const drawerWidth = 255

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          padding: "0",
          margin: "0",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          background: "#F7F8FA",
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: "#FFF",
            boxShadow: "none",
            borderBottom: "1px solid #E5E7EB",
            height: "64px",
            position: 'relative',
          }}
        >
          <Toolbar />
        </AppBar>
        <Box
          sx={{
            display: "flex"
          }}
        >
          {showDrawer &&
            <Drawer width={drawerWidth} />
          }
          <Content
            style={showDrawer ?
              {paddingLeft: `${drawerWidth}px`}
              : {}
            }
          >
            {children}
          </Content>
          { notificationMessage && notificationType &&
            <Snackbar text={notificationMessage} type={notificationType} />
          }
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export { MainLayout }
