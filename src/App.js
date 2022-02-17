import React from 'react';
import Demo from './Demo';
// import Designable from './Designable';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import Log from './Log';
function App() {
  return (
    <div>
      hello,world
      <Demo/>
      <Log/>
    </div>
  );
}

export default App;
