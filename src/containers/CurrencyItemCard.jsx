import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { 
  DeleteOutlined,
} from '@ant-design/icons';

import './currencyItemCard.css';


function CurrencyItemCard({
  rates,
  item,
  baseAmount,
  handleCurrencyItemChange,
  index,
  currencyDict
}) {

  const formatter = (number) => {
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  };

  let handleRemove = async (e) => {
    await handleCurrencyItemChange(index, null)
  }
  
  return (
    <tr className="currencyItem" style={{border: 'solid 1px #dfdfdf', boxShadow: '4px 5px 15px'}}>
         <td valign="top" style={{ paddingTop: '20px' }}>
          <p style={{ fontSize: '1rem', fontWeight: 'bold'}}>{item.name}</p>
           <p style={{ fontSize: '12px', fontWeight: 'bold'}}>{item.name} - {currencyDict[item.name]}</p>
           <p style={{ fontSize: '12px'}}>1 USD = {formatter(rates[item.name])} {item.name}</p>
          </td>
          <td valign="top" style={{ paddingTop: '20px', paddingLeft: '10px'}}>
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}> {item.convertedAmount}</p>
          </td>
        <td valign="center" style={{ padding: '10px'}}>
        <Tooltip title="remove">
          <Button shape="circle" type='danger' onClick={handleRemove} icon={<DeleteOutlined twoToneColor="red"/>} />
        </Tooltip>
        </td>
    </tr>
  );
}

CurrencyItemCard.propTypes = {
  rates: PropTypes.shape({}).isRequired,
  item: PropTypes.shape({}).isRequired,
  baseAmount: PropTypes.number.isRequired,
  handleCurrentItemChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  currencyDict: PropTypes.shape({}).isRequired
}

export default CurrencyItemCard;
