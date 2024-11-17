import React from "react";
import { Table, Typography } from "antd";
import { useAppState } from "../../Context/AppContext";
import { formatNumber } from "../../utils/helperFunctions";
import "./TrialBalance.css";

const { Text } = Typography;

const TrialBalance = () => {
  // Accessing the mainTaccount state from the AppContext
  const { mainTaccount } = useAppState();

  // Defining columns for the Ant Design Table component
  const columns = [
    {
      // Column for Account Name
      title: "Account Name",
      dataIndex: "name",
      key: "_account",
      render: (text, record) => record.title, // Renders the account name from the record
    },
    {
      // Column for Debit values
      title: "Debit",
      dataIndex: "debit",
      key: "_debit",
      render: (text, record) => {
        let recordDr = record.totalDr; // Total debit for the record
        let recordCr = record.totalCr; // Total credit for the record
        let totalrecord = 0;
        // If debit is greater than credit, calculate the difference
        if (recordDr > recordCr) {
          totalrecord = recordDr - recordCr; // Debit balance
          return formatNumber(totalrecord); // Format and return the debit balance
        } else {
          return; // No value if debit is not greater than credit
        }
      },
    },
    {
      // Column for Credit values
      title: "Credit",
      dataIndex: "credit",
      key: "_debit",
      render: (text, record) => {
        let recordDr = record.totalDr; // Total debit for the record
        let recordCr = record.totalCr; // Total credit for the record
        let totalrecord = 0;
        // If credit is greater than debit, calculate the difference
        if (recordCr > recordDr) {
          totalrecord = recordCr - recordDr; // Credit balance
          return formatNumber(totalrecord); // Format and return the credit balance
        } else {
          return; // No value if credit is not greater than debit
        }
      },
    },
  ];

  return (
    <div className="News-main">
      <div className="News-container">
        <div className="News-Data-Table">
          <h1>Trial Balance</h1>
          <Table
            className="tablepayment"
            columns={columns}
            dataSource={mainTaccount} // Data for the table sourced from mainTaccount
            align="right" // Align table content to the right
            pagination={false} // Disable pagination
            summary={(mainTaccount) => {
              let totalDebit = 0; // Initialize total debit
              let totalCredit = 0; // Initialize total credit
              // Loop through each account to calculate the total debit and credit balances
              mainTaccount.forEach(({ totalDr, totalCr }) => {
                let dr = 0;
                let cr = 0;
                if (totalDr > totalCr) {
                  dr = totalDr - totalCr; // Debit balance for the account
                  totalDebit += dr; // Add to total debit
                } else if (totalCr > totalDr) {
                  cr = totalCr - totalDr; // Credit balance for the account
                  totalCredit += cr; // Add to total credit
                } else {
                  return; // No difference if debit and credit are equal
                }
              });

              const formatterDr = formatNumber(totalDebit); // Format the total debit
              const formatterCr = formatNumber(totalCredit); // Format the total credit

              if (mainTaccount.length === 0) return null; // Return null if no data is available

              // Return a row summarizing total debit and credit balances
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>
                    <Text>Total</Text> {/* Label for total */}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <Text>{formatterDr}</Text>{" "}
                    {/* Display formatted total debit */}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    <Text>{formatterCr}</Text>{" "}
                    {/* Display formatted total credit */}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TrialBalance;
