import { FC, useEffect, useState } from "react";
import { useDebounce } from "../services/common";
import httpClient from "../services/HttpClient";
import {
  ContentBody,
  FilterRow,
  Name,
  BasicText,
  Chips,
  ChipsButton,
  HintText,
  ColoredText,
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
import { Grid } from "@mui/material";
import { Item, ItemList } from "../types/item";
import { Active } from "../components/Icons/Active";
import { Inactive } from "../components/Icons/Inactive";

interface IItemRowProps {
  item: Item;
}

const Items = () => {
  const [selectedStatus, setSelectedStatus] = useState<number | string | boolean>();
  const [itemList, setItemList] = useState<ItemList>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isListLoading, setIsListLoading] = useState(false);
  const [listLoading, setListLoading] = useState(0);

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
    if (listLoading > 0) {
      setIsListLoading(true);
      resetList(1);
    }
  }, [selectedStatus]);

  useDebounce(() => {
    setIsListLoading(true)
    resetList(1)
    }, [searchValue], 500
  )

  useEffect(() => {
    if (listLoading > 0) {
      setIsListLoading(true);
      resetList();
    }
  }, [currentPage]);

  const resetList = async (page?: number) => {
    const params = new URLSearchParams();
    params.append('size', '8');
    if (page && page !== currentPage) {
      setCurrentPage(page);
      return;
    }
    if (selectedStatus !== undefined) {
      params.append('is_active', selectedStatus + '');
    }
    if (searchValue) {
      params.append('value', searchValue);
    }
    if (currentPage && !page) {
      params.append('page', currentPage + '');
    }
    await httpClient.get('/item/?' + new URLSearchParams(params)).then(response => {
      setItemList(response.data);
      setIsListLoading(false);
      setListLoading(listLoading + 1);
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
        ((!itemList || itemList.items.length === 0) && selectedStatus === undefined && !searchValue && !isListLoading) ?
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
              itemList &&
                <FilterRow>
                  {(selectedStatus !== undefined  || searchValue) &&
                    <HintText>
                      { itemList.total + ' ' + (itemList.total === 1 ? 'result' : 'results') + ' found'}
                    </HintText>
                  }
                </FilterRow>
            }
            <Table totalPages={itemList?.pages || 1} currentPage={currentPage} setCurrentPage={setCurrentPage}>
              <>
                {
                  itemList?.items.map((item: Item) => (
                    <CustomerRow item={item} key={'item' + item.id} />
                  ))
                }
              </>
            </Table>
          </>
      }
  </ContentBody>
};

const CustomerRow: FC<IItemRowProps> = ({ item }) => {
  const navigate = useNavigate();

  const onTableRowClick = (event: React.MouseEvent<HTMLElement>, entityData?: EntityData) => {
    const id = entityData ? entityData.id : ''
    // navigate(`/customers/${id}`)
  }

  return <TableRow active={true} entityData={item} onClickHandle={(event: React.MouseEvent<HTMLElement>, entityData?: EntityData) => onTableRowClick(event, entityData)}>
    <Grid container>
      <Grid item xs={5} style={{ display: 'flex', alignItems: 'center' }}>
        <Grid container>
          <Grid item xs={12}>
            <Name>{item.name_en || item.name_ar}</Name>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Grid container>
          {item.services.length > 0 &&
            <>
              <Grid item xs={12}><BasicText>Washing & Ironing</BasicText></Grid>
              <Grid item xs={12}><Name>{item.services[0].price + ' SAR'}</Name></Grid>
            </>
          }
        </Grid>
      </Grid>
      <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Grid container>
          { item.services.length > 1 &&
            <>
              <Grid item xs={12}><BasicText>Ironing</BasicText></Grid>
              <Grid item xs={12}><Name>{item.services[1].price + ' SAR'}</Name></Grid>
            </>
          }
        </Grid>
      </Grid>
      <Grid item xs={1} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <BasicText>
          <ColoredText color={item.is_active ? '#005E1B' : '#AE2121'}>{item.id}</ColoredText>&nbsp;
          {item.is_active ? <Active /> : <Inactive />}
        </BasicText>
      </Grid>
    </Grid>
  </TableRow>
};

export { Items };
