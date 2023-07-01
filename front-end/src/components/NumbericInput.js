import { InputNumber, Select } from 'antd';
import React from 'react';

const NumbericInput = () => (
    <InputNumber style={{ width: '150px', height: 'auto', margin: '0px 20px' }} addonBefore="+" addonAfter="VND" defaultValue={1} />
);

export default NumbericInput;