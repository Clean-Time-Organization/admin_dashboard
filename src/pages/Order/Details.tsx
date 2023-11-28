import { useMutation } from "react-query";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import {
  BasicText,
  Divider,
  DataBlock,
  DataBlockTitle,
  DetailsBody,
  FieldBlock,
  FieldTitle,
  LinkedBasicText,
  MainDataBlocks,
  NumberBasicText,
  OrderStatus,
  PageTitle,
  TextSide,
  TextSubside
} from "./styled";
import { AxiosResponse } from "axios";
import httpClient from "../../services/HttpClient";
import { useEffect, useState } from "react";
import { setBreadCrumbsData } from "../../store/features/breadCrumbsDataSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { OrderDetail } from "../../types/order";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const init: OrderDetail = {
    id: 0,
    created_at: '',
    branch: {
      id: 0,
      address: '',
      laundry: {
        id: 0,
        name_en: '',
        name_ar: '',
      },
    },
    customer: {
      first_name: '',
      last_name: '',
      phone_number: '',
    },
    total_amount: 0,
  }
  const [data, setData] = useState(init)

  const getEntity = async (): Promise<AxiosResponse> => {
    return await httpClient.get(`/order/${id}`)
  }

  const getEntityMutation = useMutation(getEntity, {
    onSuccess: response => {
      // setData(init)

      switch (response.status) {
        case 200:
          setData(response.data)

          dispatch(setBreadCrumbsData({
            title: [response.data.customer.first_name, response.data.customer.last_name].join(' '),
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
  });

  useEffect(() => {
    getEntityMutation.mutate()
  }, []);

  const getStatusColor = (status: string): string => {
    return status === 'In Progress' ? '#A16207' :
      status === 'Completed' ? '#005E1B' : '#B91C1C'; 
  };

  const getStatusBackground = (status: string): string => {
    return status === 'In Progress' ? '#FEFCE8' :
      status === 'Completed' ? '#E6F3E9' : '#B91C1C36 '; 
  };

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

  return <DetailsBody>
    <Breadcrumbs />
    <PageTitle>
      <div>{data.customer.first_name + ' ' + data.customer.last_name}</div>
      <OrderStatus color={getStatusColor(data.c_status || '')} background={getStatusBackground(data.c_status || '')}>
        {data.c_status}
      </OrderStatus>
    </PageTitle>
    <BasicText>
      {data?.created_at && dateToString(new Date(data.created_at))}
    </BasicText>
    <MainDataBlocks>
      <DataBlock width="254px">
        <TextSide>
          <DataBlockTitle>Basic Info</DataBlockTitle>
          <TextSubside>
            <FieldBlock>
              <FieldTitle>Customer:</FieldTitle>
              <LinkedBasicText href={'/customers/'}>
                {data.customer.first_name + ' ' + data.customer.last_name}
              </LinkedBasicText>
            </FieldBlock>
            <FieldBlock>
              <FieldTitle>Phone Number:</FieldTitle>
              <BasicText>
                {data.customer.phone_number}
              </BasicText>
            </FieldBlock>
            <FieldBlock>
              <FieldTitle>Payment Status:</FieldTitle>
            </FieldBlock>
            <FieldBlock>
              <FieldTitle>Laundry:</FieldTitle>
              <LinkedBasicText href={'/laundries/' + data.branch.laundry.id}>
                {data.branch.laundry.name_en || data.branch.laundry.name_ar}
              </LinkedBasicText>
            </FieldBlock>
            <FieldBlock>
              <FieldTitle>Branch:</FieldTitle>
              <LinkedBasicText>
                {data.branch.address}
              </LinkedBasicText>
            </FieldBlock>
          </TextSubside>
        </TextSide>
      </DataBlock>
      <DataBlock width="394px">
        <TextSide>
          <DataBlockTitle>Selected Items ({data.selected_items?.length || 0})</DataBlockTitle>
          {
            data.selected_items?.map(item => <FieldBlock>
              <FieldTitle>{item.item?.service?.name_en || item.item?.service?.name_ar}</FieldTitle>
              <BasicText>{item?.quantity} x {item.item?.item_type?.name_en || item.item?.item_type?.name_ar}</BasicText>
              <NumberBasicText>{item?.sub_total_price.toFixed(2)} SAR</NumberBasicText>
            </FieldBlock>)
          }
        </TextSide>
      </DataBlock>
      <DataBlock width="184px">
        <TextSide>
          <DataBlockTitle>Total Items</DataBlockTitle>
          <FieldBlock>
            <FieldTitle>Subtotal amount:</FieldTitle>
            <NumberBasicText>{data?.sub_total_amount?.toFixed(2) || 0} SAR</NumberBasicText>
          </FieldBlock>
          <FieldBlock>
            <FieldTitle>VAT (+15%)</FieldTitle>
            <NumberBasicText>{data?.vat_price?.toFixed(2) || 0} SAR</NumberBasicText>
          </FieldBlock>
        </TextSide>
        <Divider />
        <TextSide>
        <FieldBlock>
            <NumberBasicText>Total amount</NumberBasicText>
            <NumberBasicText>{data?.total_amount?.toFixed(2) || 0} SAR</NumberBasicText>
          </FieldBlock>
        </TextSide>
      </DataBlock>
    </MainDataBlocks>
  </DetailsBody>;
}

export { OrderDetails };
