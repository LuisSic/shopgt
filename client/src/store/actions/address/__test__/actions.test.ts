import {createAddress} from '../actions';
import {AddressTypes} from '../types';

describe('Address actions', () => {
  it('should create an action to create a Address', () => {

    const payload = {
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
    const expectedAction = {
      type: AddressTypes.CREATE_ADDRESS,
      payload
    }

    expect(createAddress(payload)).toEqual(expectedAction)
  })
})