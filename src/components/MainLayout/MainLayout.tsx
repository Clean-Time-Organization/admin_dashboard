import {
  Content,
} from './styled';
import {useLocation, Link, matchPath, useNavigate} from "react-router-dom";
import {ReactNode, useEffect, useState} from "react";
import {
  AppBar,
  Box, Button, Drawer,
  IconButton,
  Menu,
  MenuItem, ThemeProvider,
  Toolbar, Typography
} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useAuth} from "../Auth/AuthProvider";
import theme from "../../styles/Theme";
import {ArrowDown} from "../Icons/ArrowDown";
import {getUserFL} from "../../services/common";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { Snackbar } from '../Snackbar/Snackbar';
import { setNotification } from '../../store/features/notification';
import {setBreadCrumbsData} from "../../store/features/breadCrumbsDataSlice";

const MainLayout = ({children}: {children: ReactNode}) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const {signOut} = useAuth()
  const navigate = useNavigate()
  const authData = useAppSelector(state => state.authData)
  const drawerData = useAppSelector(state => state.drawerData)
  const {notificationMessage, notificationType} = useAppSelector(state => state.notification)
  const [showToolBar, setShowToolBar] = useState(true)
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

    patterns = ['/staff/edit/:id']
    match = false
    for (let i = 0; i < patterns.length; i += 1) {
      const pattern = patterns[i]
      const possibleMatch = matchPath({path: pattern}, location.pathname)
      if (possibleMatch !== null) {
        match = true
        break
      }
    }
    setShowToolBar(!match)
  }, [location])

  if (location.pathname.toLowerCase().slice(0, 6) === '/login') return <>{children}</>

  const useRouteMatch = (patterns: readonly string[]) => {
    for (let i = 0; i < patterns.length; i += 1) {
      const pattern = patterns[i]
      const possibleMatch = matchPath(pattern, location.pathname)
      // const lastPiece = location.pathname.split('/')[location.pathname.split('/').length - 1];
      // if (possibleMatch !== null && lastPiece !== 'create') {
      //   return possibleMatch
      // }
      if (possibleMatch !== null) {
        return possibleMatch
      }
    }

    return null
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    setAnchorEl(null)
    signOut()
    navigate('/login')
  }

  const routeMatch = useRouteMatch(['/', '/home', '/staff', '/staff/*', '/customers', '/customers/*', '/laundries', '/laundries/*', '/orders'])
  let currentTab = routeMatch?.pathnameBase

  if (currentTab === '/') {
    currentTab = '/home'
  }

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
          <Toolbar>
            <Box
              component="img"
              sx={{
                width: "62px",
                display: "flex",
                alignItems: "center",
              }}
              src="/assets/logoSmall.png"
            />
            <Box
              sx={{
                width: '100%',
              }}
            >
              {
                showToolBar ?
                  <Tabs
                    value={currentTab}
                    sx={{
                      '& .MuiTabs-flexContainer': {
                        width: 'fit-content',
                        height: "64px",
                        alignItems: "center",
                        // gap: '24px',
                      },
                    }}
                    TabIndicatorProps={{
                      sx: {
                        height: "4px",
                        borderRadius: "1px 1px 0px 0px",
                        background: "#2E8DC8",
                      }
                    }}
                  >
                    <Tab
                      label={(<Typography variant="nav">Home</Typography>)}
                      value="/home"
                      to="/home"
                      component={Link}
                      sx={{
                        height: "64px",
                        // padding: "4px",
                        // minWidth: 'fit-content',
                      }}
                    />
                    <Tab
                      label={(<Typography variant="nav">Staff</Typography>)}
                      value="/staff"
                      to="/staff"
                      component={Link}
                      sx={{
                        height: "64px",
                        // padding: "4px",
                        // minWidth: 'fit-content',
                      }}
                    />
                    <Tab
                      label={(<Typography variant="nav">Customers</Typography>)}
                      value="/customers"
                      to="/customers"
                      component={Link}
                      sx={{
                        height: "64px",
                        // padding: "4px",
                        // minWidth: 'fit-content',
                      }}
                    />
                    <Tab
                      label={(<Typography variant="nav">Laundries</Typography>)}
                      icon={<ArrowDown />}
                      iconPosition="end"
                      value="/laundries"
                      to="/laundries"
                      component={Link}
                      sx={{
                        height: "64px",
                        // padding: "4px",
                        // minWidth: 'fit-content',
                      }}
                    />
                    <Tab
                      label={(<Typography variant="nav">Orders</Typography>)}
                      value="/orders"
                      to="/orders"
                      component={Link}
                      sx={{
                        height: "64px",
                        // padding: "4px",
                        // minWidth: 'fit-content',
                      }}
                    />
                  </Tabs>
                  : null
              }
            </Box>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{
                backgroundColor: "#EEF5FB",
                borderRadius: "32px",
              }}
            >
              <Typography
                sx={{
                  color: "#1A4C73",
                  textAlign: "center",
                  leadingTrim: "both",
                  textEdge: "cap",
                  fontFamily: "Anek Latin",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "120%",
                }}
              >
                {getUserFL(authData.firstName, authData.lastName) || 'AM'}
              </Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              MenuListProps={{
                sx: {
                  paddingTop: "8px",
                  paddingBottom: "8px",
                }
              }}
              sx={{
                "& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
                  boxShadow: "0px 2px 6px 2px rgba(100, 116, 142, 0.15), 0px 1px 2px 0px rgba(100, 116, 142, 0.30)",
                },
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex"
          }}
        >
          {
            showDrawer  ?
              <Drawer
                variant="persistent"
                anchor="left"
                open={true}
                sx={{
                  // width: drawerWidth,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: drawerWidth,
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
                    type="submit"
                    variant="contained"
                    disableElevation={true}
                    startIcon={
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M8.33329 17.5H14.1666C15.0871 17.5 15.8333 16.7538 15.8333 15.8333V7.84518C15.8333 7.62416 15.7455 7.4122 15.5892 7.25592L11.0774 2.74408C10.9211 2.5878 10.7091 2.5 10.4881 2.5H5.83329C4.91282 2.5 4.16663 3.24619 4.16663 4.16667V13.3333M4.16663 17.5L8.23219 13.4344M8.23219 13.4344C8.6846 13.8868 9.3096 14.1667 9.99996 14.1667C11.3807 14.1667 12.5 13.0474 12.5 11.6667C12.5 10.286 11.3807 9.16667 9.99996 9.16667C8.61925 9.16667 7.49996 10.286 7.49996 11.6667C7.49996 12.357 7.77978 12.982 8.23219 13.4344Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    }
                    style={{
                      justifyContent: "flex-start",
                      paddingLeft: "16px",
                      backgroundColor: "#2E8DC8",
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
                    }}
                  >
                    Details
                  </Button>
                </Box>
              </Drawer>
              : null
          }
          {
            showDrawer ?
              <Content
                style={{
                  // paddingLeft: "`${drawerWidth}px`",
                  paddingLeft: "255px",
                }}
              >
                {children}
              </Content>
              :
              <Content>
                {children}
              </Content>
          }
          { notificationMessage && notificationType &&
            <Snackbar text={notificationMessage} type={notificationType} />
          }
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export { MainLayout }
