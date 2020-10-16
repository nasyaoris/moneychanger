import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
