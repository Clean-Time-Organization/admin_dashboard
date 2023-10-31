import { FC, useEffect, useState } from 'react';
import { FilterDropdown } from '../components/FilterDropdown/FilterDropdown';
import { PageTitle } from '../components/PageTitle/PageTitle';
import { Table } from '../components/Table/Table';
import { TableRow } from '../components/Table/TableRow';
import {
  ContentBody,
  FilterRow,
  Logo,
  Name,
  BasicText,
  BasicTextName,
  ColoredText,
} from './styled';
import { User, UsersList } from '../types/user';
import { Grid } from '@mui/material';
import { Inactive } from '../components/Icons/Inactive';
import { Active } from '../components/Icons/Active';
import { Search } from '../components/Search/Search';

interface IStaffRowProps {
  user: User;
}

const Stuff = () => {
  const [selectedStatus, setSelectedStatus] = useState<number | string | boolean>();
  const [selectedRole, setSelectedRole] = useState<number | string | boolean>();
  const [userList, setUserList] = useState<UsersList>({
    items: [
      {
        first_name: 'test',
        last_name: 'test',
        phone_number: '+123456789',
        id: 1,
        is_active: true,
        role: 'Admin',
        staff: {
          laundry: {
            id: 1,
            name_en: 'asdasasd',
            name_ar: 'sfthfgfgb',
          },
          branch: {
            id: 2,
            address: 'nxfk kjdfkj'
          }
        }
      },
    ],
    total: 1,
    page: 1,
    size: 1,
    pages: 1,
  });
  const statusProperties = [
    {
      id: true,
      name: 'Active',
    },
    {
      id: false,
      name: 'Inactive',
    },
  ];
  const roleProperties = [
    {
      id: 'POS',
      name: 'Operator POS',
    },
    {
      id: 'Admin',
      name: 'Admin',
    },
  ];

  useEffect(() => {
    resetList();
  }, [selectedStatus, selectedRole]);

  const resetList = async () => {
    await fetch('https://dev.cleantime-co.com/admin/api/v1/user/staff', {
      method: 'GET',
      headers: {
          'Authorization':
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZXhwIjoxNjk4ODM5ODMyLCJ0eXBlIjoiYWNjZXNzIn0.8CGVuuRem-lWQGOCMmyTUIzmC9tVkCkCpX5cjjk3N-s`,
      },
    }).then((response) => {
      console.log(response.json());
    });
  };

  return <ContentBody>
    <PageTitle
      name={'Stuff'}
      createButtonName={'Create staff user'}
      createButtonClick={console.log}
      exportButtonName={'Export to .xls'}
      exportButtonClick={console.log}
    />
    <FilterRow>
      <FilterDropdown name={'Status'} properties={statusProperties} selectProperty={setSelectedStatus} />
      <FilterDropdown name={'Role'} properties={roleProperties} selectProperty={setSelectedRole} />
      <Search />
    </FilterRow>
    <Table>
      <>
        {
          userList.items.map((user: User) => (
            <StaffRow user={user} />
          ))
        }
      </>
    </Table>
  </ContentBody>
};

const StaffRow: FC<IStaffRowProps> = ({ user }) => {
  return <TableRow>
    <Grid container xs={12}>
      <Grid item xs={4}>
        <Grid container xs={12}>
          <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
            <Logo>{user.first_name.charAt(0) + user.last_name.charAt(0)}</Logo>
          </Grid>
          <Grid item xs={9}>
            <Name>{user.first_name + ' ' + user.last_name}</Name>
            <BasicText>{user.role}</BasicText>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <BasicText>{user.phone_number}</BasicText>
        <BasicText>{user.phone_number}</BasicText>
      </Grid>
      <Grid item xs={3}>
        {
          user.staff &&
            <>
              <BasicText>Laundry:&nbsp;<BasicTextName>{user.staff.laundry.name_en}</BasicTextName></BasicText>
              <BasicText>Branch:&nbsp;<BasicTextName>{user.staff.branch.address}</BasicTextName></BasicText>
            </>
        }
      </Grid>
      <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <BasicText>
          <ColoredText color={user.is_active ? '#005E1B' : '#AE2121'}>{user.id}</ColoredText>&nbsp;
          {user.is_active ? <Active /> : <Inactive />}
        </BasicText>
      </Grid>
    </Grid>
  </TableRow>;
};

export { Stuff };