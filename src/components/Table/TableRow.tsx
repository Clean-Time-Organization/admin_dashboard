import {FC} from "react";
import { TableRowLayout } from "./styled";

export type EntityData = {
  id: number
}

interface ITableRowProps {
  active: boolean
  children: JSX.Element
  onClickHandle?: (event: React.MouseEvent<HTMLElement>, entityData?: EntityData) => void
  entityData?: EntityData
}

const TableRow: FC<ITableRowProps> = ({ active, children , onClickHandle, entityData}) => {
  const cursor: string = onClickHandle ? 'pointer' : ''
  return <TableRowLayout active={active} cursor={cursor} onClick={(event: React.MouseEvent<HTMLElement>) => onClickHandle ? onClickHandle(event, entityData) : ''}>
    {children}
  </TableRowLayout>
}

export { TableRow };
