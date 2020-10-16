import React, { useEffect, useState } from "react";
import { Spin } from 'antd';
import axios from "axios";
import "./App.css";
import Config from './containers/MainContainer';

function App() {
    const [global, setGlobal] = useState({
        loading: true,
        base: "",
        date: "",
        rates: {},
        myrates: { amount: 10, allrates: [{
          name: 'IDR',
          convertedAmount: 0
        }]},
    });

    useEffect(() => {
        const initRates = async () => {
            try {
                const result = await axios.get(
                    "https://api.exchangeratesapi.io/latest?base=USD"
                );
                await setGlobal({
                    loading: false,
                    base: result.data.base,
                    date: result.data.date,
                    rates: result.data.rates,
                    myrates: global.myrates,
                });
            } catch (e) {
                alert(e);
            }
        };
        initRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setMyRates = (rates) => {
        setGlobal({
            ...global,
            myrates: rates,
        });
    };

    // const handleSave = async () => {
    //   setGlobal({
    //     loading: true,
    //     config: global.config,
    //     dictionary: global.dictionary,
    //     feature: global.feature
    //   });

    //   try {
    //     const result = await axios.post(initialData['serverURL'], {}, {data: global.config});
    //     setGlobal({
    //       loading: false,
    //       config: global.config,
    //       dictionary: global.dictionary,
    //       feature: global.feature
    //     });
    //   } catch(e) {
    //     alert(e);
    //   }
    // }
    return (
        <div className="App"  style={{ backgroundColor: 'lavender'}}>
               { global.loading ? <Spin /> : (
        <div>
          <Config rates={global.rates} myrates={global.myrates} setMyRates={setMyRates} />
        </div>
      ) }
        </div>
    );
}

export default App;
