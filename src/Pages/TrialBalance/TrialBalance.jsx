import React from "react";
import {
  Table,
  Typography
} from "antd";

import { useAppState } from '../../Context/AppContext';
import { formatNumber } from '../../utils/helperFunctions'
import "./TrialBalance.css";

const { Text } = Typography;

const TrialBalance = () => {
  // const { dispatch, asyncDispatch } = useAppDispatch();
  const { mainTaccount } = useAppState();

  const columns = [
    {
      title: "Account Name",
      dataIndex: "name",
      key: "_account",
      render: (text, record) => record.title,
    },
    {
      title: "Debit",
      dataIndex: "debit",
      key: "_debit",
      render: (text, record) => {
        let recordDr = record.totalDr;
        let recordCr = record.totalCr;
        let totalrecord = 0;
        if (recordDr > recordCr) {
          totalrecord = recordDr - recordCr;
          return formatNumber(totalrecord)
        } else {
          return;
        }
        // record.totalDr>record.totalCr ? record.totalDr-record.totalCr: 0
      },
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "_debit",
      render: (text, record) => {
        let recordDr = record.totalDr;
        let recordCr = record.totalCr;
        let totalrecord = 0;
        if (recordCr > recordDr) {
          totalrecord = recordCr - recordDr;
          return formatNumber(totalrecord)
        } else {
          return;
        }
        // record.totalCr>record.totalDr ? record.totalCr-record.totalDr: 0,
      }
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
            dataSource={mainTaccount}
            align='right'
            pagination={false}
            summary={(mainTaccount) => {
              let totalDebit = 0;
              let totalCredit = 0;
              mainTaccount.forEach(({ totalDr, totalCr }) => {
                let dr = 0;
                let cr = 0;
                if (totalDr > totalCr) {
                  dr = totalDr - totalCr;
                  totalDebit += dr;
                }
                else if (totalCr > totalDr) {
                  cr = totalCr - totalDr;
                  totalCredit += cr;
                } else {
                  return;
                }
              });

              const formatterDr = formatNumber(totalDebit)
              const formatterCr = formatNumber(totalCredit)
              if (mainTaccount.length === 0 ) return null
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>
                    <Text>Total</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <Text>{formatterDr}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    <Text>{formatterCr}</Text>
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
