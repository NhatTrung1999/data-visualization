import type React from 'react';

export type CurveType =
  | 'basis'
  | 'basisClosed'
  | 'basisOpen'
  | 'bumpX'
  | 'bumpY'
  | 'bump'
  | 'linear'
  | 'linearClosed'
  | 'natural'
  | 'monotoneX'
  | 'monotoneY'
  | 'monotone'
  | 'step'
  | 'stepBefore'
  | 'stepAfter';

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

export interface IParams {
  host?: string;
  database?: string;
  username?: string;
  password?: string;
  querysql?: string;
}

export interface IParamsState {
  paramsState: IParams;
}

export interface IDynamicSqlState {
  columnState: { columns: string[]; columnCount: number };
  table: {
    columns: string[];
    data: any[];
    limit: number;
    page: number;
    totalRecords: number;
  };
  checkedColumns: string[];
  aggregateFunction: string;
  clauseOption: string;
  topNCount: number;
  page: number;
  limit: number;
  totalRecords: number;
  loading: boolean;
  error: string | null;
}

export interface IExecuteQuery {
  host?: string;
  database?: string;
  username?: string;
  password?: string;
  querysql?: string;
  checkedColumns?: string[];
  aggregateFunction?: string;
  topNCount?: number;
  clause?: string;
  page?: number;
  limit?: number;
}
