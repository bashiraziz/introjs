
import React from "react";
import {
  Button,
  List
} from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
// import { v4 as uuidv4 } from "uuid";
import TAccount from "../../Components/TAccount/index.js";
import "./style.css";
import { useAppDispatch, useAppState } from '../../Context/AppContext';


const TAccountPage = () => {
  const { dispatch } = useAppDispatch();
  const { mainTaccount } = useAppState();


  const addTees = async () => {
    // setTees([...tees,
    //   { id : uuidv4(),
    //     taccount: <TAccount />,
    //   } 
    // ]);
    await dispatch({ type: 'ADD_MAIN_TACCOUNT' });
  };

  return (
    <div className="Events-main">
      <div className="Events-container">
        <div className="Events-header">
          <Button
            type="primary"
            onClick={addTees}
            className="add-taccount-btn"
          >
            <PlusOutlined /> Add TAccount
          </Button>
        </div>
        <List
          grid={{
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 2,
            xxl: 3,
          }}
          // pagination={{
          //   showSizeChanger : true,
          //   pageSizeOptions : ["12"],
          //   pageSize: 6,
          // }}
          dataSource={mainTaccount}
          renderItem={(item, index) => (
            <List.Item>
              <TAccount item={item} index={index} key={index} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default TAccountPage;
