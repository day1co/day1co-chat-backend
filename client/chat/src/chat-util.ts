import qs from 'qs';

const paramsSerializer = (params: any) => qs.stringify(params, { arrayFormat: 'repeat' });

export { paramsSerializer };
