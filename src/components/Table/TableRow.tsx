import {FC} from "react";
import { TableRowLayout } from "./styled";
import {User} from "../../types/user";

interface ITableRowProps {
  active: boolean
  children: JSX.Element
  onClickHandle?: (event: React.MouseEvent<HTMLElement>, entityData?: User) => void
  entityData?: User
}

const TableRow: FC<ITableRowProps> = ({ active, children , onClickHandle, entityData}) => {
  const cursor: string = onClickHandle ? 'pointer' : ''
  return <TableRowLayout active={active} cursor={cursor} onClick={(event: React.MouseEvent<HTMLElement>) => onClickHandle ? onClickHandle(event, entityData) : ''}>
    {children}
  </TableRowLayout>
}

export { TableRow };
