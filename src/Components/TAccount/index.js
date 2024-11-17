import React, { useState } from "react";
import { Select, Divider, Input, Typography, Space, InputNumber } from "antd";
import { v4 as uuidv4 } from "uuid";
import ChartOfAccounts from "./COA";
import { PlusOutlined } from "@ant-design/icons";
import EntryDr from "./component/entry";
import "./style.css";
import "antd/dist/antd.css";
import { useAppDispatch, useAppState } from "../../Context/AppContext";

const listAccountName = ChartOfAccounts;

// Generate label data from A-Z (ASCII values 65-90)
const labelData = [];
for (let i = 65; i < 90; i++) {
  var str = String.fromCharCode(i);
  labelData.push(str);
}

const TAccount = ({ item, index }) => {
  const { Option } = Select;
  const { dispatch } = useAppDispatch();
  const { mainTaccount } = useAppState();

  const [items, setItems] = useState(listAccountName);
  const [name, setName] = useState("");
  const [focusEntry, setFocusEntry] = useState({ type: "debet", index: 0 });

  const onNameChange = (event) => {
    setName(event.target.value); // Update account name state
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!name.trim()) return; // Ensure account name is not empty
    setItems([
      ...items,
      { id: uuidv4(), AccountName: name } || `New item ${uuidv4()}`,
    ]);
    setName(""); // Reset input field
  };

  // Update Debit entry amount
  const onChangeDr = async (value, i, key) => {
    mainTaccount[index].entryDr[key].amountDebet = value;

    // Calculate total Debit amount
    const sum = mainTaccount[index].entryDr.reduce((accumulator, object) => {
      return accumulator + object.amountDebet;
    }, 0);
    mainTaccount[index].totalDr = sum;

    // Dispatch updated data
    await dispatch({ type: "ADD_ENTRY_CR", payload: mainTaccount });
  };

  // Update Credit entry amount
  const onChangeCr = async (value, i, key) => {
    mainTaccount[index].entryCr[key].amountCredit = value;

    // Calculate total Credit amount
    const sum = mainTaccount[index].entryCr.reduce((accumulator, object) => {
      return accumulator + object.amountCredit;
    }, 0);
    mainTaccount[index].totalCr = sum;

    // Dispatch updated data
    await dispatch({ type: "ADD_ENTRY_CR", payload: mainTaccount });
  };

  // Add new Debit entry
  const onAddEntry = async (id) => {
    mainTaccount[index].entryDr.push({
      id: uuidv4(),
      label: "",
      amountDebet: null,
    });

    // Dispatch updated data
    await dispatch({ type: "ADD_ENTRY_DR", payload: mainTaccount });
  };

  // Add new Credit entry
  const onAddEntryCr = async (id) => {
    mainTaccount[index].entryCr.push({
      id: uuidv4(),
      label: "",
      amountCredit: null,
    });

    // Dispatch updated data
    await dispatch({ type: "ADD_ENTRY_CR", payload: mainTaccount });
  };

  // Add both Debit and Credit entries, focusing on the first empty entry
  const onAdd = async (entryType) => {
    await onAddEntryCr();
    await onAddEntry();

    // Determine which entry type (Debit or Credit) to focus on
    let focusEntryIndex =
      entryType === "debet"
        ? item.entryDr.findIndex((entry) => entry.amountDebet === null)
        : item.entryCr.findIndex((entry) => entry.amountCredit === null);

    setFocusEntry({ type: entryType, index: focusEntryIndex });
  };

  // Update Credit entry label
  const onChangeLabelCr = async (value, key) => {
    mainTaccount[index].entryCr[key].label = value;
    await dispatch({ type: "ADD_ENTRY_CR", payload: mainTaccount });
  };

  // Update Debit entry label
  const onChangeLabelDr = async (value, key) => {
    mainTaccount[index].entryDr[key].label = value;
    await dispatch({ type: "ADD_ENTRY_CR", payload: mainTaccount });
  };

  // Update Account name
  const onChangeAccount = async (value) => {
    mainTaccount[index].title = value;
    await dispatch({ type: "ADD_ENTRY_CR", payload: mainTaccount });
  };

  return (
    <div className="t-wrapper">
      <div className="t-account">
        <div className="t-account-debet">
          <Select
            style={{ width: 300 }}
            placeholder="Select an account name"
            onChange={onChangeAccount}
            value={!!item.title ? item.title : undefined}
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
      </div>
      <div className="t-debet-credit-wrapper">
        <div className="t-debet">
          {/* Render Debit entries */}
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
          {/* Display Total Debit */}
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
          {/* Display Debit Balance */}
          <div className="balance-cr">
            <Input value="Balance" readOnly />
            <Space>
              <InputNumber
                value={
                  mainTaccount[index].totalDr > mainTaccount[index].totalCr
                    ? mainTaccount[index].totalDr - mainTaccount[index].totalCr
                    : ""
                }
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
          {/* Render Credit entries */}
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
          {/* Display Total Credit */}
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
          {/* Display Credit Balance */}
          <div className="balance-cr">
            <Input value="Balance" readOnly />
            <Space>
              <InputNumber
                value={
                  mainTaccount[index].totalCr > mainTaccount[index].totalDr
                    ? mainTaccount[index].totalCr - mainTaccount[index].totalDr
                    : ""
                }
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
        </div>
      </div>
    </div>
  );
};

export default TAccount;
