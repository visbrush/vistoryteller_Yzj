import React, { Component } from 'react';
import './App.css'
import { connect } from 'react-redux'
import Main from './pages/main/main';
import EditPage from './pages/EditPage';
import PreviewCSV from "./pages/PreviewPage/previewCSV/"
import PreviewDataStory from './pages/PreviewPage/previewDataStory/';
import { Route, Routes } from 'react-router-dom'
import { Layout } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import sysIcon from './assets/pagePics/sysIcon.png'
import InfoTest from './pages/InfoTest/'
import GenerateAudio from './pages/generateAudio/';

const { Header, Content } = Layout;
const headerStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'center',
  height: 64,
  paddingInline: 32,
  lineHeight: '64px',
  backgroundColor: '#F8FAFF',
  position: 'relative',
};
const headerContentStyle = {
  display: 'flex', // 使用 Flexbox 布局
  alignItems: 'center', // 垂直居中
  color: "black"
};
const languageSwitchIcon = {
  color: "black",
  transform: 'rotate(90deg)'
}

const mapStateToProps = (state) => {
  console.log('App mapstatetoprops State:', state);
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'English'
    };
  }



  render() {
    const switchLanguage = () => {
      if (this.state.language === 'Chinese') {
        this.setState({ language: "English" })
      }
      else {
        this.setState({ language: 'Chinese' })
      }
    }

    return (
      <Layout>
        <Header className='pages-header' style={headerStyle}>
          <img
            src={sysIcon}
            alt='sysIcon pic'
            width={'42px'}
            height={'42px'}
          ></img>
          <span>{'Vistoryteller'}</span>
          <div style={headerContentStyle} onClick={switchLanguage}>
            {this.state.language === "English" && <div>English</div>}
            {this.state.language === "Chinese" && <div>中文</div>}
      
            <SwapOutlined style={languageSwitchIcon} />
          </div>
        </Header>

        <div>
          <Routes>
            <Route path="edit" element={<EditPage />} />
            <Route path="/" element={<Main />} />
            <Route path="/preview/csv" element={<PreviewCSV />} />
            <Route path="/preview/datastory" element={<PreviewDataStory />} />
            <Route path="/preview/publish" element={<InfoTest/>} />
            <Route path="/record" element={<GenerateAudio/>}></Route>
          </Routes>
        </div>
      </Layout>



    )
  }
}
export default connect(mapStateToProps)(App)