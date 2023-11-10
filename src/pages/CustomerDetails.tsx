import {useEffect, useState} from 'react';
import { FilterDropdown } from '../components/FilterDropdown/FilterDropdown';
import { PageTitle } from '../components/PageTitle/PageTitle';
import {
  ContentBody,
  FilterRow,
  Chips,
  ChipsButton,
  HintText,
} from './styled';
import { User, UsersList } from '../types/user';
import { Search } from '../components/Search/Search';
import { LinkButton } from '../components/Button/Buttons';
import { Close } from '../components/Icons/Close';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import httpClient from "../services/HttpClient";
import {useNavigate, useParams} from "react-router-dom";

const CustomerDetails = () => {
  const [selectedStatus, setSelectedStatus] = useState<number | string | boolean>();
  const [userList, setUserList] = useState<UsersList>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isListLoading, setIsListLoading] = useState(false);
  const { id } = useParams()

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
  }, [selectedStatus, searchValue]);

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
    await httpClient.get('/user/customer?' + new URLSearchParams(params)).then(response => {
      setUserList(response.data);
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
      name={'Customers'}
      exportButtonName={'Export to .xls'}
      exportButtonClick={console.log}
    />
  </ContentBody>
}

export { CustomerDetails }
