import { FC } from "react";
import { TableRowLayout } from "./styled";

interface ITableRowProps {
  active: boolean;
  children: JSX.Element;
}

const TableRow: FC<ITableRowProps> = ({ active, children }) => {
  return <TableRowLayout active={active}>
    {children}
  </TableRowLayout>
}

export { TableRow };
