import shopGt from '../apis/shopgt';
import { AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';
import { setError } from '../store/actions/error/actions';
import { useDispatch } from 'react-redux';

export default <T>(
  options: AxiosRequestConfig,
  onSuccess?: (data?: T) => void
) => {
  const dispatch = useDispatch();
  const [resposeData, setData] = useState<T | null>(null);
  const { url, method } = options;
  const doRequest = useCallback(
    async (data?: any) => {
      try {
        const response = await shopGt.request<T>({ url, method, data });
        if (onSuccess) {
          onSuccess(response.data);
        } else {
          setData(response.data);
        }
      } catch (err) {
        console.log(err);
        if (err && err.response) {
          dispatch(
            setError({
              error: err.response.data.errors,
              isOpen: true,
            })
          );
        }
      }
    },
    [dispatch, onSuccess, url, method]
  );

  return { doRequest, resposeData };
};
