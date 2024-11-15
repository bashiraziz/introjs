import React, { useEffect, useRef } from 'react';
import { Select, Space, InputNumber } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

import './style.css'
import 'antd/dist/antd.css';

const EntryDr = ({
    labelData,
    onChange,
    onAdd,
    onChangeLabel,
    id,
    taccountid,
    index,
    entry,
    amount,
    entryType,
    focusEntry
}) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (focusEntry.type === entryType && focusEntry.index === index) {
            inputRef.current.focus();
        }
    }, [focusEntry, index])

    const { Option } = Select;
    return (
        <div className="t-debet-inner">
            <div className="add-icon" onClick={() => onAdd(entryType, taccountid)}>
                <PlusCircleOutlined style={{ fontSize: '18px' }} />
            </div>
            <div className="label">
                <Select
                    // showSearch
                    style={{ width: 200 }}
                    placeholder="ref"
                    // optionFilterProp="children"
                    onChange={(value) => onChangeLabel(value, index)}
                    value={!!entry.label ? entry.labe : undefined}
                    allowClear
                // bordered={false}
                // filterOption={(input, option) =>
                //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
                // filterSort={(optionA, optionB) =>
                //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                // }
                >
                    {
                        labelData.map((item, id) => (
                            <Option key={id} value={item}>{item}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className="RS">
                <Space>
                    <InputNumber
                        onChange={(value) => onChange(value, id, index)}
                        value={amount}
                        controls={false}
                        onPressEnter={() => onAdd(entryType)}
                        placeholder={entryType === 'debet' ? 'dr': 'cr'}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')} precision={2}
                        step={0.2}
                        ref={inputRef}
                        inputMode="decimal"
                    />
                </Space>
            </div>
        </div>
    )
}

export default EntryDr;
