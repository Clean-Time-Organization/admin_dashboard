import {useEffect, useState} from 'react';
import {
  ContentBody,
} from '../styles/styled';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import httpClient from "../services/HttpClient";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "react-query";
import {Box, Chip, Fab, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Stack, Typography} from "@mui/material";
import {DeleteOutline, EditOutlined, MoreVert} from "@mui/icons-material";
import {User} from "../types/user";
import {AxiosResponse} from "axios";
import {getUserFL, getUserRole} from "../services/common";
import {useAppDispatch} from "../store/hooks";
import {setDrawerData} from "../store/features/drawerDataSlice";
import {setBreadCrumbsData} from "../store/features/breadCrumbsDataSlice";

const StaffDetails = () => {
  const { id } = useParams()
  const init: User = {
    first_name: '',
    last_name: '',
    phone_number: '',
    id: 0,
    is_active: false,
    role: 'POS',
    email: '',
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [data, setData] = useState(init)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    setAnchorEl(null)
    navigate(`/staff/edit/${id}`)
  }

  const handleDelete = () => {
    setAnchorEl(null)
  }

  const getEntity = async (): Promise<AxiosResponse> => {
    return await httpClient.get(`/user/staff/${id}`)
  }

  const getEntityMutation = useMutation(getEntity, {
    onSuccess: response => {
      setData(init)

      switch (response.status) {
        case 200:
          setData(response.data)

          dispatch(setDrawerData({
            roundTitle: getUserFL(response.data.first_name, response.data.last_name),
            title: [response.data.first_name, response.data.last_name].join(' '),
            subTitle: getUserRole(response.data.role),
          }))

          dispatch(setBreadCrumbsData({
            title: [response.data.first_name, response.data.last_name].join(' '),
          }))
          break

        default:
          // setErrorMessage('Unknown server response')
          break
      }
    },
    onError: (error) => {
      setData(init)
    },
  })

  useEffect(() => {
    getEntityMutation.mutate()
  }, [])

  return (
    <ContentBody>
      <Breadcrumbs />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          marginBottom={"20px"}
        >
          <Box
            component="span"
            sx={{
              backgroundColor: "#EEF5FB",
              width: "96px",
              height: "96px",
              flexShrink: "0",
              borderRadius: '50%',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#1A4C73",
                textAlign: "center",
                leadingTrim: "both",
                textEdge: "cap",
                fontFamily: "Anek Latin",
                fontSize: "40px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "43.429px",
              }}
            >
              {getUserFL(data.first_name, data.last_name)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "912px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginLeft: "-20px",
                  maxWidth: "320px",
                }}
              >
                <Typography
                  sx={{
                    color: "#1F2937",
                    leadingTrim: "both",
                    textEdge: "cap",
                    fontFamily: "Anek Latin",
                    fontSize: "28px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "120%",
                    padding: "10px 8px",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {[data.first_name, data.last_name].join(' ')}
                </Typography>
                {data.last_name ?
                  data.is_active ?
                    <Chip
                      label="Active"
                      color="error"
                      sx={{
                        height: "24px",
                        borderRadius: "4px",
                        background: "#E6F3E9",
                        color: "#005E1B",
                        textAlign: "center",
                        leadingTrim: "both",
                        textEdge: "cap",
                        fontFamily: "Anek Latin",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "150%",
                      }}
                    />
                    :
                    <Chip
                      label="Inactive"
                      color="error"
                      sx={{
                        height: "24px",
                        borderRadius: "4px",
                        background: "#B91C1C",
                        color: "#005E1B",
                        textAlign: "center",
                        leadingTrim: "both",
                        textEdge: "cap",
                        fontFamily: "Anek Latin",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "150%",
                      }}
                    />
                  : null
                }
              </Box>
              <Box>
                <Fab
                  onClick={handleMenu}
                  sx={{
                    color: "#2E8DC8",
                    boxShadow: 0,
                    backgroundColor: "transparent",
                    width: "36px",
                    height: "36px",
                  }}
                >
                  <MoreVert
                    sx={{
                      transform: "scale(0.9)"
                    }}
                  />
                </Fab>
                <Menu
                  id="menu-StaffDetails"
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
                >
                  <MenuItem
                    onClick={handleEdit}
                    sx={{
                      paddingRight: "91.94px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                    }}
                  >
                    <ListItemIcon>
                      <EditOutlined />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        sx={{
                          color: "#0E1019",
                          leadingTrim: "both",
                          textEdge: "cap",
                          fontFamily: "Anek Latin",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: "400",
                          lineHeight: "150%",
                        }}
                      >
                        Edit info
                      </Typography>
                    </ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={handleDelete}
                    sx={{
                      paddingTop: "12px",
                      paddingBottom: "12px",
                    }}
                  >
                    <ListItemIcon>
                      <DeleteOutline />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        sx={{
                          color: "#0E1019",
                          leadingTrim: "both",
                          textEdge: "cap",
                          fontFamily: "Anek Latin",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: "400",
                          lineHeight: "150%",
                        }}
                      >
                        Delete user
                      </Typography>
                    </ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            <Box
              sx={{
                marginLeft: "-20px",
              }}
            >
              <Typography
                sx={{
                  color: "#0E1019",
                  leadingTrim: "both",
                  textEdge: "cap",
                  fontFamily: "Anek Latin",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "150%",
                  padding: "8px",
                }}
              >
                {getUserRole(data.role)}
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            alignItems: "center",
            width: "100%",
            columnGap: "24px",
          }}
        >
          <Paper
            sx={{
              boxShadow: "none",
              display: "grid",
              gridTemplateRows: "subgrid",
              gridRow: "1/4",
              justifyContent: "start",
              gap: "10px",
              padding: "20px",
            }}
            style={{ width: data.role === "POS" ? "460px" : "984px" }}
          >
            <Typography
              sx={{
                color: "#0E1019",
                leadingTrim: "both",
                textEdge: "cap",
                fontFamily: "Anek Latin",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "120%",
              }}
            >
              Contact Info
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              <Typography
                sx={{
                  color: "#656873",
                  leadingTrim: "both",
                  textEdge: "cap",
                  fontFamily: "Anek Latin",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "150%",
                }}
              >
                Phone Number
              </Typography>
              <Typography
                sx={{
                  color: "#1F2937",
                  leadingTrim: "both",
                  textEdge: "cap",
                  fontFamily: "Anek Latin",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "150%",
                }}
              >
                {data.phone_number}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              <Typography
                sx={{
                  color: "#656873",
                  leadingTrim: "both",
                  textEdge: "cap",
                  fontFamily: "Anek Latin",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "150%",
                }}
              >
                Email
              </Typography>
              <Box
                sx={{
                  maxWidth: "440px",
                }}
              >
                <Typography
                  sx={{
                    color: "#1F2937",
                    leadingTrim: "both",
                    textEdge: "cap",
                    fontFamily: "Anek Latin",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "150%",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {data.email}
                </Typography>
              </Box>
            </Box>
          </Paper>
          {
            data.role === "POS" ?
              <Paper
                sx={{
                  boxShadow: "none",
                  display: "grid",
                  gridRow: "1/4",
                  justifyContent: "start",
                  gap: "10px",
                  padding: "20px",
                  width: "460px",
                }}
              >
                <Typography
                  sx={{
                    color: "#0E1019",
                    leadingTrim: "both",
                    textEdge: "cap",
                    fontFamily: "Anek Latin",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "120%",
                  }}
                >
                  Laundry Info
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#656873",
                      leadingTrim: "both",
                      textEdge: "cap",
                      fontFamily: "Anek Latin",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "150%",
                    }}
                  >
                    Laundry
                  </Typography>
                  <Typography
                    sx={{
                      color: "#2E8DC8",
                      leadingTrim: "both",
                      textEdge: "cap",
                      fontFamily: "Anek Latin",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "150%",
                    }}
                  >
                    {data.staff?.laundry?.name_en}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#656873",
                      leadingTrim: "both",
                      textEdge: "cap",
                      fontFamily: "Anek Latin",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "150%",
                    }}
                  >
                    Branch
                  </Typography>
                  <Typography
                    sx={{
                      color: "#2E8DC8",
                      leadingTrim: "both",
                      textEdge: "cap",
                      fontFamily: "Anek Latin",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "150%",
                    }}
                  >
                    {data.staff?.branch?.address}
                  </Typography>
                </Box>
              </Paper>
              : null
          }
        </Box>
      </Box>
    </ContentBody>
  )
}

export { StaffDetails }
