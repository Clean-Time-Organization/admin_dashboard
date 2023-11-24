import { FC, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../services/common";
import httpClient from "../services/HttpClient";
import {
  ContentBody,
  FilterRow,
  Logo,
  Name,
  BasicText,
  ColoredText,
  Chips,
  ChipsButton,
  HintText,
  BasicTextName,
  NameLink,
  BasicTextNameLink,
  ChipsOverflow,
} from '../styles/styled';
import { Table } from '../components/Table/Table';
import {EntityData, TableRow} from '../components/Table/TableRow';
import { FilterDropdown } from "../components/FilterDropdown/FilterDropdown";
import { EmptyState } from "../components/EmptyState/EmptyState";
import { PageTitle } from "../components/PageTitle/PageTitle";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Close } from "../components/Icons/Close";
import { Search } from "../components/Search/Search";
import { LinkButton } from "../components/Button/Buttons";
import { useNavigate } from "react-router-dom";
import { Grid, debounce } from "@mui/material";
import { Autocomplete } from "../components/Autocomplete/Autocomplete";
import { Order, OrderList } from "../types/order";
import { Branch, Laundry } from "../types/user";

interface IStaffRowProps {
  order: Order;
}

const Items = () => {
  const [selectedStatus, setSelectedStatus] = useState<number | string | boolean>();
  const [orderList, setOrderList] = useState<OrderList>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isListLoading, setIsListLoading] = useState(false);

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

  useEffect(() => {
    setIsListLoading(true);
    resetList(1);
  }, [selectedStatus]);

  useDebounce(() => {
    setIsListLoading(true)
    resetList(1)
    }, [searchValue], 500
  )

  useEffect(() => {
    setIsListLoading(true);
    resetList();
  }, [currentPage]);

  const resetList = async (page?: number) => {
    const params = new URLSearchParams();
    params.append('size', '8');
    if (page && page !== currentPage) {
      setCurrentPage(page);
      return;
    }
    if (selectedStatus !== undefined) {
      params.append('status', selectedStatus + '');
    }
    if (searchValue) {
      params.append('value', searchValue);
    }
    if (currentPage && !page) {
      params.append('page', currentPage + '');
    }
    await httpClient.get('/order/?' + new URLSearchParams(params)).then(response => {
      setOrderList(response.data);
      setIsListLoading(false);
    })
  };

  const clearFilters = () => {
    setSelectedStatus(undefined);
    setCurrentPage(1);
  };

  return <ContentBody>
    <Breadcrumbs />
    <PageTitle
      name={'Items'}
      exportButtonName={'Export to .xls'}
      exportButtonClick={console.log}
      createButtonClick={console.log}
      createButtonName={'Create Item'}
    />
      {
        (!orderList && !selectedStatus && !searchValue && !isListLoading) ?
          <EmptyState
            title={'There are no items yet'}
            subtitle={'You don\'t have any items created yet'}
          />
          : <>
            <FilterRow>
              <FilterDropdown name={'Status'} properties={statusProperties} selectProperty={setSelectedStatus} selectedProperty={selectedStatus} /> 
              <Search value={searchValue} setValue={setSearchValue} />
            </FilterRow>
            {
              (selectedStatus !== undefined) && <FilterRow>
                { selectedStatus !== undefined &&
                  <Chips>
                    {statusProperties.find(item => item.id === selectedStatus)?.name}
                    <ChipsButton onClick={() => setSelectedStatus(undefined)}>
                      <Close />
                    </ChipsButton>
                  </Chips>
                }
                <LinkButton onClick={() => clearFilters()}>Clear filters</LinkButton>
              </FilterRow>
            }
            {
              orderList &&
                <FilterRow>
                  {(selectedStatus !== undefined  || searchValue) &&
                    <HintText>
                      { orderList.total + ' ' + (orderList.total === 1 ? 'result' : 'results') + ' found'}
                    </HintText>
                  }
                </FilterRow>
            }
            <Table totalPages={orderList?.pages || 1} currentPage={currentPage} setCurrentPage={setCurrentPage}>
              <>
                {
                  orderList?.items.map((order: Order) => (
                    <CustomerRow order={order} key={'item' + order.id} />
                  ))
                }
              </>
            </Table>
          </>
      }
  </ContentBody>
};

const CustomerRow: FC<IStaffRowProps> = ({ order }) => {
  const navigate = useNavigate()

  const dateToString = (date: Date): string => {
    const formatter = new Intl.DateTimeFormat('en', { month: 'short' })
    const day = date.getDate();
    const month = formatter.format(date);;
    // const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return (day < 10 ? '0' + day : day) + ' ' + month + ', ' + // year + ' ' +
      (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
  };

  const onTableRowClick = (event: React.MouseEvent<HTMLElement>, entityData?: EntityData) => {
    const id = entityData ? entityData.id : ''
    // navigate(`/customers/${id}`)
  }

  const onLaundryClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    event.stopPropagation();
    navigate(`/laundries/${id}`)
  }

  // const onCustomerClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
  //   event.stopPropagation();
  //   navigate(`/customers/${id}`)
  // }

  return <TableRow active={true} entityData={order} onClickHandle={(event: React.MouseEvent<HTMLElement>, entityData?: EntityData) => onTableRowClick(event, entityData)}>
    <Grid container>
      <Grid item xs={5} style={{ display: 'flex', alignItems: 'center' }}>
        <Grid container>
          <Grid item xs={12}>
            <Name>{order.customer.first_name + ' ' + order.customer.last_name}</Name>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Grid container>
          <Grid item xs={12}><BasicText>Washing & Ironing</BasicText></Grid>
          <Grid item xs={12}><Name>SAR</Name></Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Grid container>
          <Grid item xs={12}><BasicText>Ironing</BasicText></Grid>
          <Grid item xs={12}><Name>SAR</Name></Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {/* <BasicText>
          <ColoredText color={user.is_active ? '#005E1B' : '#AE2121'}>{user.id}</ColoredText>&nbsp;
          {user.is_active ? <Active /> : <Inactive />}
        </BasicText> */}
      </Grid>
    </Grid>
  </TableRow>
};

export { Items };
