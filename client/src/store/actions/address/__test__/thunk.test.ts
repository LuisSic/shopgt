import {AnyAction} from 'redux';
import { AxiosResponse } from 'axios';
import shopgt from '../../../../apis/shopgt';
import configureMockStore from 'redux-mock-store';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {LoaderTypes} from '../../loader/types';
import {AddressTypes, Address} from '../types';
import { RootState } from '../../../../store';
import {thunkCreateAddress} from '../thunk';



const response = {
  id: '123',
  name: 'test',
  address: 'test',
  country: 'test',
  deparment: 'test',
  township: 'test',
  status: true,
  version: 1,
  position: {
    long: '123123123',
    lat: '213123123',
  },
  userId: '234234'
}

const axiosResponse: AxiosResponse = {
  data: response,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

jest.mock('../../../../apis/shopgt', () => {
  return {
    default: {
      post: jest.fn().mockImplementation(() => Promise.resolve(axiosResponse)),
    },
    post: jest.fn(() => Promise.resolve(axiosResponse)),
  };

});
//const mockedAxios = shopgt as jest.Mocked<typeof axios>;
const middlewares = [thunk];
type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;
const mockStore = configureMockStore<RootState,DispatchExts>(middlewares);


describe('async actions', ()=>{

  it('creates CREATE_ADDRESS when fetching thunkCreateAddress has been done ', async ()=>{


    const expectedActions = [
      { type: LoaderTypes.SHOW_LOADER }, 
      { type: AddressTypes.CREATE_ADDRESS, payload: response}, 
      { type: LoaderTypes.HIDE_LOADER}];

      const store = mockStore();

      const request =  {
        name: 'test',
        address: 'test',
        country: 'test',
        deparment: 'test',
        township: 'test',
        position: {
          long: '1234',
          lat: '1234'
        }
      }

      await store.dispatch(thunkCreateAddress(request));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      expect(shopgt.post).toHaveBeenCalled();

  })
})