import React, { useState, useEffect } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './Loader';
import { MainViewChildProps, Person } from '../utils/types';

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

const Table: React.FC<MainViewChildProps> = observer(({ vm }) => {
    // TanTable doesn't support MobX state
    const [data, setData] = useState(toJS(vm.data));

    useEffect(() => {
        setData(vm.data.slice());
    }, [vm.data]);

    const table = useReactTable<Person>({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div
            className='relative bg-white shadow-md rounded p-4 overflow-auto scrollbar'
            id='scrollableDiv'
        >
            {vm.state === 'pending' && <Loader />}

            <InfiniteScroll
                dataLength={vm.data.length}
                next={() => {
                    vm.handleLoadNewPage();
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
