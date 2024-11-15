import React, { useState } from "react";
import { Select, Divider, Input, Typography, Space, InputNumber } from "antd";
import { v4 as uuidv4 } from "uuid";
import ChartOfAccounts from "./COA";
import { PlusOutlined } from "@ant-design/icons";
import EntryDr from "./component/entry";
import "./style.css";
import "antd/dist/antd.css";
import { useAppDispatch, useAppState } from '../../Context/AppContext';

const listAccountName = ChartOfAccounts
  
    
const labelData = [
  // {
  //   id: uuidv4(),
  //   label: "A",
  // },
];
for (let i = 65; i < 90; i++) {
  var str = String.fromCharCode(i);
  labelData.push(str)
}


const TAccount = ({ item, index }) => {
  const { Option } = Select;

  const { dispatch } = useAppDispatch();
  const { mainTaccount } = useAppState();

  const [items, setItems] = useState(listAccountName);
  const [name, setName] = useState("");
  const [focusEntry, setFocusEntry] = useState({ type: 'debet', index: 0 })


  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!name.trim()) return
    setItems([
      ...items,
      { id: uuidv4(), AccountName: name } || `New item ${uuidv4()}`,
    ]);
    setName("");
  };


  // onchange dr

  const onChangeDr = async (value, i, key) => {
    mainTaccount[index].entryDr[key].amountDebet = value;

    const sum = mainTaccount[index].entryDr.reduce((accumulator, object) => {
      return accumulator + object.amountDebet;
    }, 0);
    mainTaccount[index].totalDr = sum;
    await dispatch({ type: 'ADD_ENTRY_CR', payload: mainTaccount });

  }

  // onchange cr

  const onChangeCr = async (value, i, key) => {


    mainTaccount[index].entryCr[key].amountCredit = value;

    const sum = mainTaccount[index].entryCr.reduce((accumulator, object) => {
      return accumulator + object.amountCredit;
    }, 0);
    mainTaccount[index].totalCr = sum;
    await dispatch({ type: 'ADD_ENTRY_CR', payload: mainTaccount });

    // const entries =addEntryCr.filter((item)=>item.id!==i)
    // let entry =addEntryCr.find((item)=>item.id==i)
    // entry.amountDebet=value;
    // entries.push(entry);
    // setAddEntryCr(entries);

    //  const sum = entries.reduce((accumulator, object) => {
    //   return accumulator + object.amountDebet;
    // }, 0);
    // setTotalCr(sum);

  }

  // debet
  const onAddEntry = async (id) => {
    mainTaccount[index].entryDr.push(
      {
        id: uuidv4(),
        label: '',
        amountDebet: null,
      }
    )
    // const entry = mainTaccount.find(item => item.id === id)
    //   console.log(entry,'tryarr');
    //  if(entry){

    //   let newEntryDr=[]
    //   let newTAccounts = mainTaccount.filter((item)=>item.id!==id);
    //   console.log(newTAccounts,'newT');
    //   if(entry.entryDr && entry?.entryDr?.length>0){
    //     newEntryDr=[...entry.entryDr,{
    //           id: uuidv4(),
    //           label: '',
    //           amountDebet: 0,  
    //       }];
    //   }
    //   else{
    //     newEntryDr=[{
    //           id: uuidv4(),
    //           label: '',
    //           amountDebet: 0,  
    //       }];
    //   }
    //   entry.entryDr=newEntryDr;

    //   let alltaccounts=[...newTAccounts,
    //     entry]
    await dispatch({ type: 'ADD_ENTRY_DR', payload: mainTaccount });

    // }

  };

  //  on add entry credit
  const onAddEntryCr = async (id) => {

    mainTaccount[index].entryCr.push(
      {
        id: uuidv4(),
        label: '',
        amountCredit: null,
      }
    )
    await dispatch({ type: 'ADD_ENTRY_CR', payload: mainTaccount });
  }

  const onAdd = async (entryType) => {
    await onAddEntryCr()
    await onAddEntry()

    // check for the first empty entry index that we need to focus
    let focusEntryIndex = entryType === "debet"
      ? item.entryDr.findIndex(entry => entry.amountDebet === null)
      : item.entryCr.findIndex(entry => entry.amountCredit === null)

    setFocusEntry({ type: entryType, index: focusEntryIndex })
  }


  // on change label cr
  const onChangeLabelCr = async (value, key) => {
    mainTaccount[index].entryCr[key].label = value;
    await dispatch({ type: 'ADD_ENTRY_CR', payload: mainTaccount });
  }

  // on change label dr
  const onChangeLabelDr = async (value, key) => {
    mainTaccount[index].entryDr[key].label = value;
    await dispatch({ type: 'ADD_ENTRY_CR', payload: mainTaccount });
  }

  // account name

  const onChangeAccount = async (value) => {
    mainTaccount[index].title = value;
    await dispatch({ type: 'ADD_ENTRY_CR', payload: mainTaccount });
  }

  return (
    <div className="t-wrapper">
      <div className="t-account">
        <div className="t-account-debet">
          <Select
            style={{ width: 300 }}
            placeholder="Select an account name"
            onChange={onChangeAccount}
            value={!!item.title ? item.title: undefined}
            allowClear
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space align="center" style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="User Defined"
                    value={name}
                    onChange={onNameChange}
                  />
                  <Typography.Link
                    onClick={addItem}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <PlusOutlined /> Add account
                  </Typography.Link>
                </Space>
              </>
            )}
          >
            {items.map((item) => (
              <Option key={item.id} value={item.AccountName}>
                {item.AccountName}
              </Option>
            ))}
          </Select>
        </div>
        {/* <div className="t-account-credit">
          <Space align="center" style={{ padding: "0 8px 4px" }}>
            <Input onChange={onNameChange} />
          </Space>
        </div> */}
      </div>
      <div className="t-debet-credit-wrapper">
        <div className="t-debet">
          {item.entryDr.map((entry, index) => (

            <EntryDr
              key={index}
              index={index}
              labelData={labelData}
              onChange={onChangeDr}
              onChangeLabel={onChangeLabelDr}
              onAdd={onAdd}
              taccountid={item.id}
              id={entry.id}
              entry={entry}
              amount={entry.amountDebet}
              entryType="debet"
              focusEntry={focusEntry}
            />
          ))}

          <div className="total-cr">
            <InputNumber
              size="small"
              value={mainTaccount[index].totalDr}
              precision={2}
              step={0.1}
              formatter={(value) =>
                ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              controls={false}
              readOnly={true}
            />
          </div>
          <div className="balance-cr">
            <Input value="Balance" readOnly/>
            <Space>
              <InputNumber
                value={(mainTaccount[index].totalDr > mainTaccount[index].totalCr) ? mainTaccount[index].totalDr - mainTaccount[index].totalCr : ''}
                formatter={(value) =>
                  ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                precision={2}
                step={0.11}
                controls={false}
                readOnly={true}
              />
            </Space>
          </div>
          <div className="divider">
            <Divider style={{ margin: "4px 0" }} />
          </div>
        </div>
        <div className="t-credit">
          {item.entryCr.map((entry, index) => (
            <EntryDr
              key={index}
              index={index}
              labelData={labelData}
              onChange={onChangeCr}
              onChangeLabel={onChangeLabelCr}
              onAdd={onAdd}
              taccountid={item.id}
              id={entry.id}
              entry={entry}
              amount={entry.amountCredit}
              entryType="credit"
              focusEntry={focusEntry}
            />
          ))}
          <div className="total-dr">
            <InputNumber
              size="small"
              value={mainTaccount[index].totalCr}
              precision={2}
              step={0.1}
              formatter={(value) =>
                ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              controls={false}
              readOnly={true}
            />
          </div>
          <div className="balance-cr">
            <Input value="Balance" readOnly/>
            <Space>
              <InputNumber
                value={(mainTaccount[index].totalCr > mainTaccount[index].totalDr) ? mainTaccount[index].totalCr - mainTaccount[index].totalDr : ''}
                formatter={(value) =>
                  ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                precision={2}
                step={0.11}
                controls={false}
                readOnly={true}
              />
            </Space>
          </div>
          <div className="divider">
            <Divider style={{ margin: "4px 0" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TAccount;
