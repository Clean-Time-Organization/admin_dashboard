import {FC, memo, useEffect, useState} from "react";
import {Box, IconButton, Menu, MenuItem, Toolbar as MuiToolbar, Typography} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Link, matchPath, useNavigate} from "react-router-dom";
import {ArrowDown} from "../Icons/ArrowDown";
import {getUserFL} from "../../services/common";
import {useAuth} from "../Auth/AuthProvider";
import {useAppSelector} from "../../store/hooks";

export const Toolbar: FC = memo(function Toolbar() {
  const [showToolBar, setShowToolBar] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const authData = useAppSelector(state => state.authData)
  const {signOut} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const patterns = ['/staff/edit/:id']
    let match = false
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

  const useRouteMatch = (patterns: readonly string[]) => {
    for (let i = 0; i < patterns.length; i += 1) {
      const pattern = patterns[i]
      const possibleMatch = matchPath(pattern, location.pathname)
      if (possibleMatch !== null) {
        return possibleMatch
      }
    }

    return null
  }

  const routeMatch = useRouteMatch(['/', '/home', '/staff', '/staff/*', '/customers', '/customers/*', '/laundries', '/laundries/*', '/orders'])
  let currentTab = routeMatch?.pathnameBase

  if (currentTab === '/') {
    currentTab = '/home'
  }

  return (
    <MuiToolbar>
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
    </MuiToolbar>
  )
})
