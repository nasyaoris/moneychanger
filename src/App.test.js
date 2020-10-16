import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { Button } from 'antd';

test('render main container with button to add new currency', () => {
  const { getByText } = render(
  <Button>
    Add new currency
  </Button>);

  const textElement = getByText('Add new currency')
  expect(textElement).toBeInTheDocument();
  
})

test('render main container with title', () => {
  const { getByText } = render(
    <div>
      <h2>Money Changer</h2>
    </div>);

  const textElement = getByText('Money Changer')
  expect(textElement).toBeInTheDocument();
})

it('calls "onClick" prop on button click', () => {
  const onClick = jest.fn();
  const { getByText } = render(<Button onClick={onClick}>Add new currency</Button>);
  fireEvent.click(getByText(/Add new currency/i));
  expect(onClick).toHaveBeenCalled();
});

export const fetchData = async () => {
  const url = 'https://api.exchangeratesapi.io/latest?base=USD';
 
  return await axios.get(url);
};

jest.mock('axios');
 
describe('fetchData', () => {
  it('fetches successfully data from an API', async () => {
    const data = {  
      "rates": {
          "CAD": 1.3209950419,
          "HKD": 7.7500427423,
          "ISK": 139.5110275261,
          "PHP": 48.7741494273,
          "DKK": 6.3625406052,
          "HUF": 311.6601128398,
          "CZK": 23.3715164985,
          "GBP": 0.7739357155,
          "RON": 4.1686613096,
          "SEK": 8.8716019832,
          "IDR": 14770.3966489998,
          "INR": 73.4749529834,
          "BRL": 5.6370319713,
          "RUB": 78.1625064114,
          "HRK": 6.4812788511,
          "JPY": 105.2744058813,
          "THB": 31.2651735339,
          "CHF": 0.9144298171,
          "EUR": 0.8548469824,
          "MYR": 4.1544708497,
          "BGN": 1.6719097282,
          "TRY": 7.9387929561,
          "CNY": 6.7324328945,
          "NOK": 9.3757907335,
          "NZD": 1.5183792101,
          "ZAR": 16.6976406223,
          "USD": 1.0,
          "MXN": 21.5044452043,
          "SGD": 1.3621986664,
          "AUD": 1.4151136946,
          "ILS": 3.3966489998,
          "KRW": 1148.982732091,
          "PLN": 3.8910924944
      },
      "base": "USD",
      "date": "2020-10-15"
    }
 
    axios.get.mockImplementationOnce(() => Promise.resolve(data))
 
    await expect(fetchData()).resolves.toEqual(data)
 
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.exchangeratesapi.io/latest?base=USD',
    );
  });
 
});