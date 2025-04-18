import React from 'react';
import { Button, Popover } from 'antd';

const style = {
  width: '10vw',
  height: '10vh',
  // display: 'flex',
  alignItems: 'bottom',
  justifyContent: 'bottom',
  // flexDirection: 'row',
};

const QuestionStyle = () => {
  React.useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);
  return (
    <div style={style}>
        <div type="primary">Analyst</div>
        <Popover content="hahaahahaahahahaaha" open>
        </Popover>
    </div>
  );
};

export default QuestionStyle;