import { useEffect, useState } from 'react';
import {matchPath, useLocation} from "react-router-dom";
import { BreadcrumbsBody, BreadcrumbsLink, BreadcrumbsElement } from './styled';
import {useAppSelector} from "../../store/hooks";
import {Box} from "@mui/material";

const Breadcrumbs = () => {
  const location = useLocation()
  const locationList = location.pathname.split('/')
  const breadCrumbsData = useAppSelector(state => state.breadCrumbsData)

  const [list, setList] = useState([{
    name: 'Home',
    link: '/',
  }])

  useEffect(() => {
    let bufferList = [{
      name: 'Home',
      link: '/',
    }]
    locationList.forEach((item, index) => {
      if (item) {
        bufferList.push({
          name: item.slice(0, 1).toUpperCase() + item.slice(1),
          link: '/' + locationList.slice(1, index + 1).join('/'),
        })
      }
    })
    setList(bufferList)
  }, [location])

  const getTitle = (itemName: string) => {
    const patterns = ['/customers/:id', '/staff/:id', '/laundries/:id', '/orders/:id']
    let match = false
    for (let i = 0; i < patterns.length; i += 1) {
      const pattern = patterns[i]
      const possibleMatch = matchPath({path: pattern}, location.pathname)
      if (possibleMatch !== null) {
        match = true
        break
      }
    }
    if (match) {
      return breadCrumbsData.title ? breadCrumbsData.title : ''
    }
    return itemName
  }

  return <BreadcrumbsBody>
    {
      list.map((item, index) =>
        <Box
          key={item.link}
          sx={{
            display: 'flex',
            gap: '8px',
          }}
        >
          {
            index + 1 < list.length ?
              <BreadcrumbsLink key={item.link} to={item.link}>{item.name}</BreadcrumbsLink> :
              <BreadcrumbsElement>{getTitle(item.name)}</BreadcrumbsElement>
          }
          { index + 1 < list.length &&
            <div key={item.link + 'slash'}>/</div>
          }
        </Box>
      )
    }
  </BreadcrumbsBody>
}

export { Breadcrumbs }
