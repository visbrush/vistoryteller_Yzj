import React from 'react'
import { Button, Table, Drawer } from 'antd';
import { Layout, Space, Divider } from 'antd';
import linesvg from "../../pics/info-4pics/Line.svg"
import { Checkbox, ConfigProvider, Radio } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  //textAlign: 'center',
  width: '100vw',
  maxWidth: '100%',
  height: '29.22vw',
  border: '0vw solid #000000',
  display: '-webkit-flex',
  backgroundColor: '#FFFFFF',
  WebkitFlexDirection: 'column',
  display: 'flex',
  flexDirection: 'column',
  justifyContent:'center',
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
  border: '1px solid #000000',
  borderRadius: '4.7vw',
  textAlign: 'center',
  //display:'flex',
  //margin:'39px auto',
  //position: 'relative',
  backgroundColor: '#FFFFFF', //必须要写这个
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '2.3vw',
  paddingLeft: '2.5vw',
  paddingRight: '2.5vw',
  paddingTop: '1.2vw',
  paddingBottom: '1.2vw',
  zIndex: '3'
};
const headerTitle = {
  left: '0',
  right: '0',
  margin: 'auto',
  lineHeight: 'normal',
  fontSize: '3.6vw',
  fontWeight: '700',
};
/*style优先级最高*/
const introductionStyle = {
  borderRadius: 8,
  background: '#F1F1F1',
  lineHeight: '2.195vw',
  fontSize: '1.6vw',
  // fontWeight: 400,
  textlign: 'center',
  color: '#000000',
  marginTop: '2vw',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding:'3% 5%'
  //margin:'5px auto',
}
const line = {
  marginTop: '5.5vw',
  //backgroundColor:'#000000'
}




export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
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