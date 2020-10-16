import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, InputNumber, Typography } from 'antd';
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';
import { 
  PlusOutlined,
} from '@ant-design/icons';
import './mainContainer.css'
import CurrencyItemCard from './CurrencyItemCard'

const { Title } = Typography;

function MainContainer({ rates, myrates, setMyRates }) {

  const formatter = (number) => {
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  };

  const handleSaveAmount = async (amount) => {
    let copy = myrates;
    copy.amount = amount
    await setMyRates({
      ...myrates,
      amount: copy.amount,
    })
  }

  const handleAmountChange = async (value) => { 
      handleSaveAmount(value)
  }

  useEffect(() => {
    myrates.allrates.forEach((item, idx) => {
      let copy = Object.assign({}, item); 
      copy.convertedAmount = formatter(rates[copy.name]*myrates.amount);
      return handleCurrencyItemChange(idx, copy);
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ,[myrates.amount])

  const handleCurrencyItemChange = async (index, newItem) => {
    if (newItem === null) return handleCurrencyItemRemove(index);
    
    let copy = myrates.allrates
    copy[index] = newItem

    setMyRates({
      ...myrates,
        allrates: copy
    });
  
  }

  const handleCurrencyItemRemove = (index) => {
    const newCurrencies = myrates.allrates.filter((item, idx) => {
        return (index !== idx)
    });
    
    setMyRates({
      amount: myrates.amount,
      allrates: newCurrencies
    });
  }

  const handleAddCurrencyItem = () => {
    const newCurrencies = {
        name: `IDR`,
        convertedAmount: formatter(rates['IDR']*myrates.amount)
    }; 
    setMyRates({
      amount: myrates.amount,
      allrates: [...myrates.allrates, newCurrencies]
    });
  }

  return (
    <div className="mainContainer" >
        <Title level={2} className="title"><MonetizationOnTwoToneIcon style={{ color: 'green' }} /> Money Changer <MonetizationOnTwoToneIcon style={{ color: 'green' }} /></Title>
        <div className='base-currency'>
          <div>
            <p>$USD</p>
          </div>
            <InputNumber min={0} defaultValue={10} precision style={{width: '50%'}} placeholder="Base Amount" onChange={handleAmountChange} value={myrates.amount}/>
        </div>
        <div className="rates">
          <Title level={3}>Rates</Title>
        </div>
        <table className="tablerates">
          <tbody>
          {myrates.allrates.map((item, index) => {
            return (
              <CurrencyItemCard 
                  key={index}
                  rates={rates}
                  baseAmount={myrates.amount}
                  item={item}
                  index={index}
                  handleCurrencyItemChange={handleCurrencyItemChange} 
              />
            );
          })}
          </tbody>
          <tfoot style={{marginTop: '1rem'}}>
            <tr>
              <td colSpan={3}>
                <Form.Item>
                  <Button
                    style={{ height: '60px', marginTop: '1rem',boxShadow: '4px 8px 10px'}}
                    type="dashed"
                    onClick={handleAddCurrencyItem}
                    block
                  >
                    <PlusOutlined /> Add new currency
                  </Button>
                </Form.Item>
              </td>
            </tr>
          </tfoot>
        </table>
    </div>
  );
}

MainContainer.propTypes = {
  myrates: PropTypes.shape({}).isRequired,
  rates: PropTypes.shape({}).isRequired,
  setMyRates: PropTypes.func.isRequired,
}

export default MainContainer;
