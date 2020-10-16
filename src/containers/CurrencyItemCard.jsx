import React from 'react';
import { Select, Typography, Button, Tooltip } from 'antd';
import { 
  DeleteOutlined,
} from '@ant-design/icons';

import './currencyItemCard.css';
const { Title } = Typography;
const { Option } = Select;

function CurrencyItemCard({
  rates,
  item,
  baseAmount,
  handleCurrencyItemChange,
  index,
  allRates 
}) {

  const formatter = (number) => {
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  };

  const currencies = Object.keys(rates)

  let handleTypeChange = (value) => {
    let copy = Object.assign({}, item); 
    copy.name = value;
    copy.convertedAmount = formatter(rates[copy.name]*baseAmount);
    handleCurrencyItemChange(index, copy);
  }

  let handleRemove = async (e) => {
    await handleCurrencyItemChange(index, null)
  }
  
  return (
    <tr className="currencyItem" style={{border: 'solid 1px #dfdfdf', boxShadow: '4px 5px 15px'}}>
         <td valign="top" style={{ paddingTop: '20px' }}>
         <Tooltip title="Pick Currency">
            <Select onChange={handleTypeChange} placeholder="Currency" value={item.name}>
              {currencies.map((curr, idx) => {
                  return (
                      <Option key={idx} value={curr}>{curr}</Option>
                  );
              })}
            </Select>
          </Tooltip>
           <p style={{ fontSize: '12px'}}>1 USD = {formatter(rates[item.name])} {item.name}</p>
          </td>
          <td valign="top" style={{ paddingTop: '20px', paddingLeft: '10px'}}>
          <Title level={5}>{item.name} {item.convertedAmount}</Title>
          </td>
        <td valign="center" style={{ padding: '10px'}}>
        <Tooltip title="remove">
          <Button shape="circle" type='danger' onClick={handleRemove} icon={<DeleteOutlined twoToneColor="red"/>} />
        </Tooltip>
        </td>
    </tr>
  );
}

export default CurrencyItemCard;
