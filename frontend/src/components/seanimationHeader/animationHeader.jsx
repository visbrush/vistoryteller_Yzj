import React from 'react'
import { Button,Table,Drawer} from 'antd';
import { Layout, Space, Divider } from 'antd';
import linesvg from "../../pics/info-4pics/Line.svg"



const headerStyle = {
    width:'100vw',
    maxWidth:'100%',
    backgroundColor:'#FFFFFF',
  };
  const titleBox = {
    width: '100%',
    height: '4vw',
    marginTop:'0.9375vw',
    marginLeft:'auto',
    marginRight:'auto',
    backgroundColor: '#FFFFFF',
    textAlign:'center'
  };
  //头部157*183像素（*1.7）
  const blackheader = {
      width: '17.9vw',
      height: '1.2vw',
      backgroundColor: '#1F1F1F',
      marginLeft:'auto',
      marginRight:'auto',
      marginTop:'0'
  }
  const whiteBackground = {
    width: '100%',
    height: '1.76vw',
    backgroundColor: '#FFFFFF',
  }
  const title = {
      //width: '100%',
      //height: '4vw',
      //marginTop:'0.9375vw',
      marginLeft:'auto',
      marginRight:'auto',
      fontWeight:'900',
      //marginRight:'auto',
      //backgroundColor: '#FFFFFF',
      color:'#000000',
      fontSize:'2.92vw',
      lineHeight:'normal',
  }
  const introBox = {
      width: '40.5vw',
      marginTop:'0vw',
      height: '6.5vw',
      //marginTop:'20px',
      marginLeft:'auto',
      marginRight:'auto',
      backgroundColor: '#F1F1F1',
      display: '-webkit-flex',
      WebkitFlexDirection: 'column', // 正确的Webkit前缀写法
      display: 'flex',
      flexDirection: 'column',
      textAlign:'center',
      paddingLeft: '1vw',
      paddingRight: '1vw'
  }
  const intro = {
      color:'#000000',
      fontSize:'1.2vw',
      //lineHeight:'37px',
      width:'100%',
      marginLeft:'auto',
      marginRight:'auto',
      marginTop:'auto',
      marginBottom:'auto',
      //textAlign:'center',
  }

export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //const {visible}=this.state
        return (
            <div style={headerStyle} >
                <div style={whiteBackground}></div>
                <div style={blackheader}></div>
                <div style={titleBox}>
                   <div style={title}> {this.props.infoTitle}</div>
                    </div>
                <div style={introBox}>
                    <span style={intro}>
                    {this.props.keyPoint}
                    </span>
                    </div>
        </div>
        )
    }
}