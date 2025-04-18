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
    height: '31.22vw',
    border: '0vw solid #000000',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    zIndex: '5',
    //display: '-webkit-flex',
    //backgroundColor: '#FFFFFF',
    //WebkitFlexDirection: 'column',
    //display: 'flex',
    //flexDirection: 'column'
};
const titleBox = {
    width: '100%',
    height: '4vw',
    marginTop: '0.9375vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    //fontWeight:'900',
    //marginRight:'auto',
    backgroundColor: '#FFFFFF',
    textAlign: 'center'
    //color:'#000000',
    //fontSize:'2.92vw',
    //lineHeight:'normal',
};
//头部157*183像素（*1.7）
const greyheader = {
    width: '46.09vw',
    height: '8.75vw',
    borderRadius: '3px',
    border: '1px solid #000',
    backgroundColor: '#F8F8F8',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '0'
}
const whiteBackground = {
    width: '100%',
    height: '11.04vw',
    backgroundColor: '#FFFFFF',
}
const title = {
    //width: '100%',
    //height: '4vw',
    //marginTop:'0.9375vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: '900',
    //marginRight:'auto',
    //backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: '2.92vw',
    lineHeight: 'normal',
}
const introBox = {
    width: '80vw',
    //marginTop:'0.9375vw',
    height: '6.5vw',
    //marginTop:'20px',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#F1F1F1',
    display: '-webkit-flex',
    WebkitFlexDirection: 'column', // 正确的Webkit前缀写法
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
}
const intro = {
    color: '#000000',
    width: '46.88vw',
    //height:'3vw',
    fontSize: '1.6vw',
    lineHeight: 'normal',
    width: '70vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center'
}
const titleStyle = {
    //width:'22.1vw',
    height: '6vw',
    fontWeight: '700',
    color: '#000000',
    margin: '0 auto',
    fontSize: '3.6vw',
    lineHeight: 'normal',
}

const TitleBox = {
    height: '6.09vw',
    background: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    //marginTop: '0.6vw',
    //marginBottom: '0.1vw',
    width: '30.68vw', // 设置为auto以自适应宽度
    borderRadius: '3px',
    border: '2px solid #000'
}
const second = {
    width: '100vw',
    height: '0vw',
    maxWidth: '100%',
    //border: '1px solid #c3c3c3',
    display: '-webkit-flex',
    webkitFlexDirection: 'column',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '-5.5vw'
}
const third = {
    //width: '100vw',
    height: '6.5vw',
    maxWidth: '100%',
    //border: '1px solid #c3c3c3',
    display: '-webkit-flex',
    webkitFlexDirection: 'column',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '11.38vw'
}
export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            baseline: "",
            series_name: [],
            block_num: 1
        }
    }

    render() {
        //const {visible}=this.state
        return (
            <div style={headerStyle} >
                <div style={whiteBackground}></div>
                <div style={greyheader}></div>
                <div style={second}>
                    <div style={TitleBox}>
                        <span style={titleStyle}>
                            {this.props.infoTitle}
                        </span>
                    </div>
                </div>
                <div style={third}>
                    <div style={introBox}>
                        <span style={intro}>
                            {this.props.keyPoint}
                        </span>
                    </div>
                </div>
            </div>
        )

        {/*<div className='header-container'>
                <div className='header-logo'/>
                <div className='header-title'>Ontology Visulization</div>
        </div>*/}
    }
}