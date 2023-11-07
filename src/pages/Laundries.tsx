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
  ColoredText,
  Chips,
  ChipsButton,
  HintText,
} from './styled';
import { User } from '../types/user';
import { Grid } from '@mui/material';
import { Inactive } from '../components/Icons/Inactive';
import { Active } from '../components/Icons/Active';
import { Search } from '../components/Search/Search';
import { LinkButton } from '../components/Button/Buttons';
import { Close } from '../components/Icons/Close';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import httpClient from "../services/HttpClient";

export type Laundry = {
  id: number
  name_en: string
  name_ar: string
  is_active: boolean
  address: string
  owner: User
}

export type LaundryList = {
  items: Array<Laundry>
  total: number
  page: number
  size: number
  pages: number
}

interface ILaundryRowProps {
  laundry: Laundry
}

const Laundries = () => {
  const [selectedStatus, setSelectedStatus] = useState<number | string | boolean>()
  const [entityList, setEntityList] = useState<LaundryList>()
  const [searchValue, setSearchValue] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isListLoading, setIsListLoading] = useState(false)
  const statusProperties = [
    {
      id: true,
      name: 'Active',
    },
    {
      id: false,
      name: 'Inactive',
    },
  ]

  useEffect(() => {
    setIsListLoading(true)
    resetList(1)
  }, [selectedStatus, searchValue])

  useEffect(() => {
    setIsListLoading(true)
    resetList()
  }, [currentPage])

  const resetList = async (page?: number) => {
    const params = new URLSearchParams()
    params.append('size', '8')
    if (page && page !== currentPage) {
      setCurrentPage(page)
      return
    }
    if (selectedStatus !== undefined) {
      params.append('status', selectedStatus + '')
    }
    if (searchValue) {
      params.append('value', searchValue)
    }
    if (currentPage && !page) {
      params.append('page', currentPage + '')
    }
    await httpClient.get('/laundry/?' + new URLSearchParams(params)).then(response => {
      setEntityList(response.data)
      setIsListLoading(false)
    })
  };

  const clearFilters = () => {
    setSelectedStatus(undefined)
    setCurrentPage(1)
  };

  return <ContentBody>
    <Breadcrumbs />
    <PageTitle
      name={'Laundries'}
      exportButtonName={'Export to .xls'}
      exportButtonClick={console.log}
    />
      {
        (!entityList && !selectedStatus && !searchValue && !isListLoading) ?
          <EmptyState
            title={'There are no laundries yet'}
            subtitle={'You don\'t have any laundries created yet'}
            buttonName={'Create laundry'}
            buttonAction={console.log}
          />
          : <>
            <FilterRow>
              <FilterDropdown name={'Status'} properties={statusProperties} selectProperty={setSelectedStatus} selectedProperty={selectedStatus} />
              <Search value={searchValue} setValue={setSearchValue} />
            </FilterRow>
            {
              (selectedStatus !== undefined) && <FilterRow>
                <Chips>
                  {statusProperties.find(item => item.id === selectedStatus)?.name}
                  <ChipsButton onClick={() => setSelectedStatus(undefined)}>
                    <Close />
                  </ChipsButton>
                </Chips>
                <LinkButton onClick={() => clearFilters()}>Clear filters</LinkButton>
              </FilterRow>
            }
            {
                entityList &&
                <FilterRow>
                  {(selectedStatus !== undefined || searchValue) &&
                    <HintText>
                      { entityList.total + ' ' + (entityList.total === 1 ? 'result' : 'results') + ' found'}
                    </HintText>
                  }
                </FilterRow>
            }
            <Table totalPages={entityList?.pages || 1} currentPage={currentPage} setCurrentPage={setCurrentPage}>
              <>
                {
                  entityList?.items.map((laundry: Laundry) => (
                    <LaundryRow laundry={laundry} key={'laundry' + laundry.id} />
                  ))
                }
              </>
            </Table>
          </>
      }
  </ContentBody>
}

const LaundryRow: FC<ILaundryRowProps> = ({ laundry }) => {
  return <TableRow active={laundry.is_active}>
    <Grid container>
      <Grid item xs={5} style={{ display: 'flex' }}>
        <Grid container>
          <Grid item xs={1} style={{ display: 'flex', alignItems: 'center'}}>
            <Logo>{laundry.name_en.charAt(0) + laundry.name_en.charAt(0)}</Logo>
          </Grid>
          <Grid item xs={11} style={{ display: 'flex', alignItems: 'center'}}>
            <Name>{laundry.name_en}</Name>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <BasicText>{laundry.owner.phone_number}</BasicText>
        <BasicText>{laundry.address}</BasicText>
      </Grid>
      <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <BasicText>
          Owner:&nbsp;
          <ColoredText color='#2E8DC8'>{laundry.owner.first_name} {laundry.owner.last_name}</ColoredText>
        </BasicText>
      </Grid>
      <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <BasicText>
          <ColoredText color={laundry.is_active ? '#005E1B' : '#AE2121'}>{laundry.id}</ColoredText>&nbsp;
          {laundry.is_active ? <Active /> : <Inactive />}
        </BasicText>
      </Grid>
    </Grid>
  </TableRow>
}

export { Laundries }
