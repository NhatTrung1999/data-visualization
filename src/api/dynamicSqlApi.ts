import axiosConfig from '../services';
import type { IExecuteQuery, IParams } from '../types';

const dynamicSqlApi = {
  getColumns: async (payload: IParams): Promise<any> => {
    const response = await axiosConfig.post(
      '/data-visualization/get-columns',
      payload
    );
    return response.data;
  },
  executeQuery: async (payload: IExecuteQuery): Promise<any> => {
    const response = await axiosConfig.post(
      '/data-visualization/execute-query',
      payload
    );
    return response.data;
  },
};

export default dynamicSqlApi;
