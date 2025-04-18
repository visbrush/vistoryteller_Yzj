import React from 'react'
import './header.css'
import { Button, Table, Drawer } from 'antd';
import { Layout, Space, Divider } from 'antd';
import linesvg from "../../pics/info-4pics/Line.svg"

const lineBox = {
  width: '1000px',
  maxWidth: '100%',
  height: '0vw',
  display: '-webkit-flex',
  WebkitFlexDirection: 'column',
  display: 'flex',
  flexDirection: 'column',
}
const header = {
  lineHeight: '4.939vw',
  fontSize: '3.6vw',
  fontWeight: '700',
  width: 'fit-content',
  border: '0.1vw solid #000000',
  borderRadius: '4.7vw',
  textAlign: 'center',
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
};
/*style优先级最高*/
const introductionStyle = {
  borderRadius: 8,
  background: '#F1F1F1',
  lineHeight: '2.195vw',
  fontSize: '1.6vw',
  //fontWeight: 400,
  textlign: 'center',
  color: '#000000',
  marginTop: '0.7vw',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingBottom: '2.4vw',
  paddingTop: '2.4vw',
  paddingLeft: '3vw',
  paddingRight: '3vw'
  //margin:'5px auto',
}




const right_line = {
  //position: 'absolute',
  top: '73px',
  right: '20px',
  transform: 'translateY(-50%)',
  height: '3px',
  width: '627px',
  backgroundColor: '#000000',
}

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //const {visible}=this.state
    return (
      <div>
        {/* <div className='firstline'>
          
        </div> */}
        <div className='firstheader' >
        <img src={linesvg} logo='alt' style={{position: 'absolute',top: '70px'}}></img>
          <div className='firstheadercontent'>
            <span>{this.props.infoTitle}</span>
          </div>
          <div className='firstheaderintro'>
            <span>{this.props.keyPoint}</span> 
          </div>
        </div>
      </div>
    )

  }
}