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

const Orders = () => {
  const [selectedDates, setSelectedDates] = useState<number | string | boolean>();
  const [orderList, setOrderList] = useState<OrderList>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isListLoading, setIsListLoading] = useState(false);

  const [selectedLaundry, setSelectedLaundry] = useState<{ id: number; name: string } | null>(null);
  const [inputLaundry, setInputLaundry] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<{ id: number; name: string } | null>(null);
  const [inputBranch, setInputBranch] = useState('');
  const [laundries, setLaundries] = useState<Array<Laundry>>();
  const [branches, setBranches] = useState<Array<Branch>>();
  const [openLaundries, setOpenLaundries] = useState(false);
  const [openBranches, setOpenBranches] = useState(false);
  const today = new Date();

  const dateToString = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
  };

  const dateProperties = [
    {
      id: dateToString(new Date((new Date()).setDate(today.getDate() - 7))),
      name: 'Last Week',
    },
    {
      id: dateToString(new Date((new Date()).setMonth(today.getMonth() - 1))),
      name: 'Last Month',
    },
    {
      id: dateToString(new Date((new Date()).setMonth(today.getMonth() - 3))),
      name: '3 Months',
    },
    {
      id: dateToString(new Date((new Date()).setMonth(today.getMonth() - 6))),
      name: '6 Months',
    },
    {
      id: dateToString(new Date((new Date()).setFullYear(today.getFullYear() - 1))),
      name: 'Annual',
    },
  ];

  useEffect(() => {
    setIsListLoading(true);
    resetList(1);
  }, [selectedDates]);

  useEffect(() => {
    setSelectedBranch(null);
    setIsListLoading(true);
    resetList(1);
  }, [selectedLaundry]);

  useEffect(() => {
    setIsListLoading(true);
    resetList(1);
  }, [selectedBranch]);

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
    if (selectedDates !== undefined) {
      params.append('date', selectedDates + '');
    }
    if (selectedLaundry) {
      params.append('laundry_id', selectedLaundry.id + '');
      if (selectedBranch) {
        params.append('branch_id', selectedBranch.id + '');
      }
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
    setSelectedLaundry(null);
    setSelectedDates(undefined);
    setCurrentPage(1);
  };

  useEffect(() => {
    searchLaundryDelayed();
  }, [inputLaundry]);
  
  const getLaundryData = async () => {
    const searchParams = new URLSearchParams();
    if (inputLaundry) {
      searchParams.append('name', inputLaundry);
    }
    const isOpen = openLaundries;
    setOpenLaundries(false);
    setLaundries(undefined);
    await httpClient.get('/laundry/search?' + new URLSearchParams(searchParams)).then(response => {
      setLaundries(response.data?.items);
      setOpenLaundries(isOpen);
    });
  };

  useEffect(() => {
    searchBranchDelayed();
  }, [inputBranch, selectedLaundry]);
  
  const getBranchesData = async () => {
    if (selectedLaundry) {
      const searchParams = new URLSearchParams();
      if (inputBranch) {
        searchParams.append('name', inputBranch);
      }
      searchParams.append('laundry_id', selectedLaundry.id + '');
      const isOpen = openBranches;
      setOpenBranches(false);
      setBranches(undefined);
      await httpClient.get('/laundry/branch/search?' + new URLSearchParams(searchParams)).then(response => {
        setBranches(response.data?.items);
        setOpenBranches(isOpen);
      });
    } else {
      setBranches(undefined);
    }
  };

  const searchBranchDelayed = useMemo(
      () => debounce(getBranchesData, 500),
      [getBranchesData]
  );

  const searchLaundryDelayed = useMemo(
    () => debounce(getLaundryData, 500),
    [getBranchesData]
  );

  return <ContentBody>
    <Breadcrumbs />
    <PageTitle
      name={'Orders'}
      exportButtonName={'Export to .xls'}
      exportButtonClick={console.log}
    />
      {
        (!orderList && !selectedDates && !searchValue && !isListLoading) ?
          <EmptyState
            title={'There are no orders yet'}
            subtitle={'You don\'t have any orders created yet'}
          />
          : <>
            <FilterRow>
              <FilterDropdown name={'Period'} properties={dateProperties} selectProperty={setSelectedDates} selectedProperty={selectedDates} />
              <div style={{ height: '32px', width: '20%' }}>
                <Autocomplete
                  label={'Laundry'}
                  selectedValue={selectedLaundry}
                  selectValue={setSelectedLaundry}
                  inputValue={inputLaundry}
                  setInputValue={setInputLaundry}
                  options={laundries?.map((laundry: Laundry) => {return { id: laundry.id, name: laundry.name_en || laundry.name_ar || '' }}) || []}
                  open={openLaundries}
                  setOpen={setOpenLaundries}
                  size={'small'}
                />
              </div>
              <div style={{ height: '32px', width: '20%' }}>
                <Autocomplete
                  label={'Branch'}
                  selectedValue={selectedBranch}
                  selectValue={setSelectedBranch}
                  inputValue={inputBranch}
                  setInputValue={setInputBranch}
                  options={selectedLaundry ?
                    branches?.map((branch: Branch) => {return { id: branch.id, name: branch.address || ''}}) || [] :
                    []
                  }
                  open={openBranches}
                  setOpen={setOpenBranches}
                  size={'small'}
                />
              </div>
              <Search value={searchValue} setValue={setSearchValue} />
            </FilterRow>
            {
              (selectedDates !== undefined || selectedLaundry) && <FilterRow>
                { selectedDates !== undefined &&
                  <Chips>
                    {dateProperties.find(item => item.id === selectedDates)?.name}
                    <ChipsButton onClick={() => setSelectedDates(undefined)}>
                      <Close />
                    </ChipsButton>
                  </Chips>
                }
                {
                  selectedLaundry &&
                    <Chips>
                      {selectedLaundry.name}
                      <ChipsButton onClick={() => setSelectedLaundry(null)}>
                        <Close />
                      </ChipsButton>
                    </Chips>
                }
                {
                  selectedLaundry && selectedBranch &&
                    <Chips>
                      <ChipsOverflow>{selectedBranch.name}</ChipsOverflow>
                      <ChipsButton onClick={() => setSelectedBranch(null)}>
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
                  {(selectedDates !== undefined || selectedLaundry || searchValue) &&
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
                    <CustomerRow order={order} key={'order' + order.id} />
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
      <Grid item xs={3} style={{ display: 'flex' }}>
        <Grid container>
          <Grid item xs={12}>
            <NameLink>{order.customer.first_name + ' ' + order.customer.last_name}</NameLink>
          </Grid>
          <Grid item xs={12}>
            <BasicText>{order.customer.phone_number}</BasicText>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <BasicText>{dateToString(new Date(order.created_at))}</BasicText>
      </Grid>
      <Grid item xs={5} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        {
          order.branch &&
            <>
              {
                order?.branch?.laundry &&
                  <BasicText>
                    Laundry:&nbsp;
                    <BasicTextNameLink onClick={(e) => onLaundryClick(e, order?.branch?.laundry?.id)}>
                      {order?.branch?.laundry?.name_en}
                    </BasicTextNameLink>
                  </BasicText>
              }
              {
                order?.branch &&
                  <BasicText>Branch:&nbsp;<BasicTextName>{order?.branch?.address}</BasicTextName></BasicText>
              }
            </>
        }
      </Grid>
      <Grid item xs={1} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <BasicText>
          {order.id}
        </BasicText>
      </Grid>
    </Grid>
  </TableRow>
};

export { Orders };
