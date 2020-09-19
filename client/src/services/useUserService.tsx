import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import { IUser } from '../types/IUser';
import API from '../utils/API';

export interface IUsers {
  payload: IUser[];
}

type UsersService = Service<IUsers>;

const useUserService = () => {
  const [result, setResult] = useState<UsersService>({
    status: 'loading'
  });

  useEffect(() => {
    API.axiosClient.get<IUsers>('users/all')
      .then(response => {
        setResult({ status: 'loaded', payload: { payload: response.data.payload }  });
      })
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default useUserService;