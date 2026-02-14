"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import OrdersTable from "./Table";
import { getColumns, skeletonColumns } from "./columns";
import TableSkeleton from "@/components/shared/table/TableSkeleton";
import TableError from "@/components/shared/table/TableError";

import { getSearchParams } from "@/helpers/getSearchParams";

import { useAuthorization } from "@/hooks/use-authorization";
import { Pagination } from "@/types/pagination";

type FetchOrdersParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  method?: string;
  startDate?: string;
  endDate?: string;
};

type MockOrder = {
  id: string;
  invoice_no: string;
  order_time: string;
  customers?: { name: string };
  payment_method: string;
  total_amount: number;
  status: string;
};

function fetchOrders(_params: FetchOrdersParams): Promise<{
  data: MockOrder[];
  pagination: Pagination;
}> {
  const page = _params.page ?? 1;
  const limit = _params.limit ?? 10;
  const totalItems = 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return Promise.resolve({
    data: [],
    pagination: {
      limit,
      current: page,
      items: totalItems,
      pages: totalPages,
      next: page < totalPages ? page + 1 : null,
      prev: page > 1 ? page - 1 : null,
    },
  });
}

export default function RecentOrders() {
  const { hasPermission } = useAuthorization();
  const columns = getColumns({ hasPermission });
  const { page, limit, search, status, method, startDate, endDate } =
    getSearchParams(useSearchParams());

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [
      "orders",
      page,
      limit,
      search,
      status,
      method,
      startDate,
      endDate,
    ],
    queryFn: () =>
      fetchOrders({
        page,
        limit,
        search,
        status,
        method,
        startDate,
        endDate,
      }),
    placeholderData: keepPreviousData,
  });

  if (isLoading)
    return <TableSkeleton perPage={limit} columns={skeletonColumns} />;

  if (isError || !orders)
    return (
      <TableError
        errorMessage="Something went wrong while trying to fetch orders."
        refetch={refetch}
      />
    );

  return (
    <OrdersTable
      columns={columns}
      data={orders.data}
      pagination={orders.pagination}
    />
  );
}
