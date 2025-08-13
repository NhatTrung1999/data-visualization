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
  checkedColumns: string[]
  loading: boolean;
  error: string | null;
}
