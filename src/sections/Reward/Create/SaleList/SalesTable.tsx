import { useState, useEffect } from 'react';
import { useLazyQuery, useQuery as useGraphQuery } from '@apollo/client';

import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { ScrollBar } from 'src/components/ScrollBar';
import { LoadingScreen } from 'src/components/loading-screen';
import { useTable, TableNoData, TableHeadCustom, TableSelectedAction } from 'src/components/Table';

import { FETCH_SALES_QUERY } from 'src/sections/Sales/query';

import SalesTableRow from './SalesTableRow';
import { FETCH_STATISTICS_QUERY } from '../../query';

interface Props {
  id: string;
  selectIds: Function;
  date: Date;
}

const TABLE_HEAD = [
  { id: 'invoiceNo', label: 'Invoice No', width: 130, sortable: true },
  { id: 'name', label: 'Name', sortable: true },
  { id: 'productName', label: 'Product Name', width: 130, sortable: true },
  { id: 'paymentMethod', label: 'Payment Method', width: 300, sortable: true },
  { id: 'amount', label: 'Amount', width: 130, sortable: true },
  { id: 'hashPower', label: 'Hash Power', width: 200, sortable: true },
  { id: 'assetId', label: 'Asset ID', width: 200, sortable: true },
  { id: 'status', label: 'Status', width: 95, sortable: true },
];

export default function SalesTable({ id, date, selectIds }: Props) {
  const [fetchSales, { loading, data }] = useLazyQuery(FETCH_SALES_QUERY, {
    variables: { sort: 'status,invoiceNo' },
  });

  const { data: statistics } = useGraphQuery(FETCH_STATISTICS_QUERY, {
    variables: { filter: { id } },
  });

  const sales = statistics?.statistics?.statistics?.map((item) => item?.statisticsSales!) ?? [];

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const tableData = data?.sales.sales ?? [];

  const table = useTable({
    defaultDense: true,
    defaultSelected: selectedIds,
  });

  const notFound = !tableData?.length;

  useEffect(() => {
    fetchSales();
  }, [date, fetchSales]);

  useEffect(() => {
    if (tableData.length > 0) {
      // const filteredIds = sales
      //   .filter((item) => formatDate(item?.orderedAt) === formatDate(date))
      //   .map((item) => item!.id);
      const ids = sales[0]?.map((item) => item?.saleId!);
      // const ids = sales.map((item) => item?.saleId);
      console.log('ids => ', ids);
      setSelectedIds(ids ?? []);
      table.setSelected(ids ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, statistics]);

  useEffect(() => {
    selectIds(table.selected);
  }, [table, selectIds]);

  return (
    <Stack>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <TableSelectedAction
          dense={table.dense}
          numSelected={table.selected.length}
          rowCount={loading ? 0 : tableData!.length}
          onSelectAllRows={(checked) =>
            table.onSelectAllRows(
              checked,
              tableData!.map((row) => row!.id)
            )
          }
        />

        <ScrollBar>
          <Table size="small" sx={{ minWidth: 960 }}>
            <TableHeadCustom
              headLabel={TABLE_HEAD}
              rowCount={loading ? 0 : tableData?.length}
              numSelected={table.selected.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData!.map((row) => row!.id)
                )
              }
            />

            {loading ? (
              <LoadingScreen />
            ) : (
              <TableBody>
                {tableData!.map((row) => (
                  <SalesTableRow
                    key={row!.id}
                    row={row!}
                    selected={table.selected.includes(row!.id)}
                    onSelectRow={() => table.onSelectRow(row!.id)}
                  />
                ))}

                <TableNoData notFound={notFound} />
              </TableBody>
            )}
          </Table>
        </ScrollBar>
      </TableContainer>
    </Stack>
  );
}
