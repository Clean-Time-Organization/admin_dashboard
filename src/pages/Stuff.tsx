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
  Chips,
  ChipsButton,
} from './styled';
import { User, UsersList } from '../types/user';
import { Grid } from '@mui/material';
import { Inactive } from '../components/Icons/Inactive';
import { Active } from '../components/Icons/Active';
import { Search } from '../components/Search/Search';
import { LinkButton } from '../components/Button/Buttons';
import { Close } from '../components/Icons/Close';
import { EmptyState } from '../components/EmptyState/EmptyState';

interface IStaffRowProps {
  user: User;
}

const Stuff = () => {
  const env = import.meta.env;
  const [selectedStatus, setSelectedStatus] = useState<number | string | boolean>();
  const [selectedRole, setSelectedRole] = useState<number | string | boolean>();
  const [userList, setUserList] = useState<UsersList>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
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
    resetList(1);
  }, [selectedStatus, selectedRole, searchValue]);

  useEffect(() => {
    resetList();
  }, [currentPage]);

  const resetList = async (page?: number) => {
    const params = new URLSearchParams();
    params.append('size', '8');
    if (page) {
      setCurrentPage(page);
      return;
    }
    if (selectedStatus !== undefined) {
      params.append('status', selectedStatus + '');
    }
    if (selectedRole) {
      params.append('role', selectedRole + '');
    }
    if (searchValue) {
      params.append('value', searchValue);
    }
    if (currentPage && !page) {
      params.append('page', currentPage + '');
    }
    await fetch(`${env.VITE_API_BASE_URL}/user/staff?` + new URLSearchParams(params), {
      method: 'GET',
      headers: {
          'Authorization':
          `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((response) => {
      return response.json();
    }).then(jsonData => {
      setUserList(jsonData);
    });
  };

  const clearFilters = () => {
    setSelectedRole(undefined);
    setSelectedStatus(undefined);
    setCurrentPage(1);
  };

  return <ContentBody>
    <PageTitle
      name={'Staff'}
      createButtonName={'Create staff user'}
      createButtonClick={console.log}
      exportButtonName={'Export to .xls'}
      exportButtonClick={console.log}
    />
    {
      (!userList) ?
        <></>
        // <EmptyState
        //   title={'There are no staff users yet'}
        //   subtitle={'You don\'t have any staff users created yet'}
        //   buttonName={'Create staff user'}
        //   buttonAction={console.log}
        // />
        : <>
          <FilterRow>
            <FilterDropdown name={'Status'} properties={statusProperties} selectProperty={setSelectedStatus} selectedProperty={selectedStatus} />
            <FilterDropdown name={'Role'} properties={roleProperties} selectProperty={setSelectedRole} selectedProperty={selectedRole} />
            <Search value={searchValue} setValue={setSearchValue} />
          </FilterRow>
          {
            (selectedRole || selectedStatus !== undefined) && <FilterRow>
              {
                selectedStatus !== undefined && <Chips>
                  {statusProperties.find(item => item.id === selectedStatus)?.name}
                  <ChipsButton onClick={() => setSelectedStatus(undefined)}>
                    <Close />
                  </ChipsButton>
                </Chips>
              }
              {
                selectedRole &&
                  <Chips>
                    {roleProperties.find(item => item.id === selectedRole)?.name}
                    <ChipsButton onClick={() => setSelectedRole(undefined)}>
                      <Close />
                    </ChipsButton>
                  </Chips>
              }
              <LinkButton onClick={() => clearFilters()}>Clear filters</LinkButton>
            </FilterRow>
          }
          <Table totalPages={userList?.pages || 1} currentPage={currentPage} setCurrentPage={setCurrentPage}>
            <>
              {
                userList?.items.map((user: User) => (
                  <StaffRow user={user} key={'user' + user.id} />
                ))
              }
            </>
          </Table>
        </>
    }
  </ContentBody>
};

const StaffRow: FC<IStaffRowProps> = ({ user }) => {
  const roles = [
    {
      id: 'POS',
      name: 'Operator POS',
    },
    {
      id: 'Admin',
      name: 'Admin',
    },
  ];

  return <TableRow active={user.is_active}>
    <Grid container>
      <Grid item xs={4} style={{ display: 'flex' }}>
        <Grid container>
          <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
            <Logo>{user.first_name.charAt(0) + user.last_name.charAt(0)}</Logo>
          </Grid>
          <Grid item xs={9}>
            <Name>{user.first_name + ' ' + user.last_name}</Name>
            <BasicText>{roles.find(item => item.id === user.role)?.name || ''}</BasicText>
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
              {
                user?.staff?.laundry &&
                  <BasicText>Laundry:&nbsp;<BasicTextName>{user?.staff?.laundry?.name_en}</BasicTextName></BasicText>
              }
              {
                user?.staff?.branch &&
                  <BasicText>Branch:&nbsp;<BasicTextName>{user?.staff?.branch?.address}</BasicTextName></BasicText>
              }
              
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