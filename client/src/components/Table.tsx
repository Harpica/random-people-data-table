import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Person } from '../utils/types';
import { MainVM } from '../viewModels/Main.VM';
import { observer } from 'mobx-react-lite';
import { toJS, trace } from 'mobx';
import { useCallback, useRef, useMemo, useState, useEffect } from 'react';

const columnHelper = createColumnHelper<Person>();
const columns: ColumnDef<Person, any>[] = [
    {
        header: 'Number',
        cell: (info) => {
            return parseInt(info.row.id) + 1;
        },
    },
    columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('address', {
        header: 'Address',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('phone', {
        header: 'Phone',
        cell: (info) => info.getValue(),
    }),
];

interface TableProps {
    vm: MainVM;
}

const Table: React.FC<TableProps> = observer(({ vm }) => {
    // TanTable doesn't support MobX state
    const [data, setData] = useState(toJS(vm.data));

    useEffect(() => {
        setData(vm.data.slice());
        console.log('update', data);
    }, [vm.data.length]);

    trace();

    const table = useReactTable<Person>({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div
            className=' bg-white shadow-md rounded p-4 overflow-auto'
            id='scrollableDiv'
        >
            <InfiniteScroll
                dataLength={vm.data.length}
                next={() => {
                    vm.handleLoadNewPage();
                    console.log('next');
                }}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget='scrollableDiv'
            >
                <table className='   table-auto w-full box-border text-left'>
                    <thead className='border-b border-blue-900'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className='box-border p-1'
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className='w-auto max-w-sm box-border p-1'
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </InfiniteScroll>
        </div>
    );
});

export default Table;
