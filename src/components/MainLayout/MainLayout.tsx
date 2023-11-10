import {
  Content,
} from './styled';
import {useLocation, Link, matchPath, useNavigate, Route} from "react-router-dom";
import {ReactNode, useState} from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton, ListItemIcon, ListItemText,
  Menu,
  MenuItem, ThemeProvider,
  Toolbar, Typography
} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {AccountCircle} from "@mui/icons-material";
import MailIcon from '@mui/icons-material/Mail';
import {useAuth} from "../Auth/AuthProvider";
import theme from "../../styles/Theme";


const MainLayout = ({children}: {children: ReactNode}) => {
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const {signOut} = useAuth()
  const navigate = useNavigate()

  if (location.pathname.toLowerCase().slice(0, 6) === '/login') return <>{children}</>

  const useRouteMatch = (patterns: readonly string[]) => {
    const { pathname } = useLocation()

    for (let i = 0; i < patterns.length; i += 1) {
      const pattern = patterns[i]
      const possibleMatch = matchPath(pattern, pathname)
      if (possibleMatch !== null) {
        return possibleMatch
      }
    }

    return null
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    setAnchorEl(null)
    signOut()
    navigate('/login')
  }

  const routeMatch = useRouteMatch(['/home', '/staff', '/customers', '/laundries', '/orders'])
  const currentTab = routeMatch?.pattern?.path

  const drawerWidth = 240

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
              <Tabs
                value={currentTab}
                sx={{
                  '& .MuiTabs-flexContainer': {
                    width: 'fit-content',
                    minHeight: "64px",
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
                <Tab label={(<Typography variant="nav">Home</Typography>)} value="/home" to="/home" component={Link} />
                <Tab label={(<Typography variant="nav">Staff</Typography>)} value="/staff" to="/staff" component={Link} />
                <Tab label={(<Typography variant="nav">Customers</Typography>)} value="/customers" to="/customers" component={Link} />
                <Tab label={(<Typography variant="nav">Laundries</Typography>)} value="/laundries" to="/laundries" component={Link} />
                <Tab label={(<Typography variant="nav">Orders</Typography>)} value="/orders" to="/orders" component={Link} />
              </Tabs>
            </Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{
                color: "#EEF5FB",
              }}
            >
              <AccountCircle />
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
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        {
          false  ?
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: 'auto' }}>
                <List>
                  {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
            : null
        }
        <Content>
          {children}
        </Content>
      </Box>
    </ThemeProvider>
  )
}

export { MainLayout }
