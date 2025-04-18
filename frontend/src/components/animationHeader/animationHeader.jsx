import React from 'react'
import { Button, Table, Drawer } from 'antd';
import { Layout, Space, Divider } from 'antd';
import linesvg from "../../pics/info-4pics/Line.svg"
import { Checkbox, ConfigProvider, Radio } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  //textAlign: 'center',
  width: '192%',
  maxWidth: '100%',
  height: '25%',
  //height: '20vw',
  display: '-webkit-flex',
  backgroundColor: '#FFFFFF',
  WebkitFlexDirection: 'column',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'AlibabaPuHuiTi',
  //marginTop:'7vw'
};
const lineBox = {
  width: '100vw',
  maxWidth: '100%',
  height: '0vw',
  //position:'relative',
  display: '-webkit-flex',
  WebkitFlexDirection: 'column',
  display: 'flex',
  flexDirection: 'column',
  //zIndex:'1'
}
const header = {
  width: '21.56vw',
  border: '0.15vw solid #000000',
  borderRadius: '4.7vw',
  textAlign: 'center',
  backgroundColor: '#FFFFFF', //必须要写这个
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '2.3vw',
  paddingLeft: '2.5vw',
  paddingRight: '2.5vw',
  paddingTop: '0.2vw',
  paddingBottom: '0.2vw',
  zIndex: '3'
};
const headerTitle = {
  left: '0',
  right: '0',
  margin: 'auto',
  lineHeight: 'normal',
  fontSize: '2.6vw',
  fontWeight: '900',
};
/*style优先级最高*/
const introductionStyle = {
  borderRadius: 8,
  background: '#F1F1F1',
  lineHeight: '2.195vw',
  fontSize: '1vw',
  //fontWeight: 400,
  textAlign: 'center',
  color: '#000000',
  marginTop: '0.8vw',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '60vw',
  paddingBottom: '1.4vw',
  paddingTop: '1.4vw',
  paddingLeft: '1vw',
  paddingRight: '1vw'
  //margin:'5px auto',
}
const line = {
  marginTop: '4.5vw',
  paddingLeft: '10vw',
  paddingRight: '10vw',
}

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    //const {visible}=this.state
    return (
      <div style={headerStyle} >
        <div style={lineBox}>
          <img src={linesvg} style={line} logo='alt'></img>
        </div>

        <div style={header}>
          <div style={headerTitle}>
            {this.props.infoTitle}
          </div>
        </div>

        <div style={introductionStyle}>
          {this.props.keyPoint}
        </div>
      </div>
    )
  }
}