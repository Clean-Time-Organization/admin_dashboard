import { useEffect, useState } from 'react';
import { useLocation, NavLink } from "react-router-dom";

import { BreadcrumbsBody, BreadcrumbsLink, BreadcrumbsElement } from './styled';

const Breadcrumbs = () => {
  const location = useLocation();
  const locationList = location.pathname.split('/');

  const [list, setList] = useState([
    {
      name: 'Home',
      link: '/',
    },
  ]);

  useEffect(() => {
    let bufferList = [
      {
        name: 'Home',
        link: '/',
      },
    ];
    locationList.forEach((item, index) => {
      if (item) {
        bufferList.push(
        {
          name: item.slice(0, 1).toUpperCase() + item.slice(1),
          link: '/' + locationList.slice(1, index + 1).join('/'),
        }
      );
      }
    });
    setList(bufferList);
  }, [location]);

  return <BreadcrumbsBody>
    {
      list.map((item, index) => <>
        {
          index + 1 < list.length ?
            <BreadcrumbsLink key={item.link} to={item.link}>{item.name}</BreadcrumbsLink> :
            <BreadcrumbsElement>{item.name}</BreadcrumbsElement>
        }
        { index + 1 < list.length &&
          <div key={item.link+'slash'}>/</div>
        }
      </>)
    }
  </BreadcrumbsBody>;
};

export { Breadcrumbs };
