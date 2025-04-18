import React from 'react'
import { Button, Table, Drawer } from 'antd';
import { Layout, Space, Divider } from 'antd';
import linesvg from "../../pics/info-4pics/Line.svg"
import { Checkbox, ConfigProvider, Radio } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
    width: '100vw',
    maxWidth: '100%',
    height: '27vh',
    border: '0vw solid #000000',
    backgroundColor: '#FFFFFF',
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
    height: '2.04vw',
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
    width: '62.5vw',
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
    width: '100%',
    color: '#000',
    //height:'3vw',
    fontSize: '0.833vw',
    lineHeight: 'normal',
    //width:'46.87vw',
    //marginLeft:'auto',
    //marginRight:'auto',
    paddingLeft: '2vw',
    paddingRight: '2vw',
    //marginTop:'auto',
    marginBottom: '1vw',
    textAlign: 'center',
    //justifyContent: 'center',
    //alignItems: 'center'
}
const titleStyle = {
    //width:'22.1vw',
    height: '12.4vw',
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    //margin:'0 auto',
    fontSize: '2.92vw',
    lineHeight: 'normal',
}

const TitleBox = {
    height: '8.09vw',
    //paddingTop: '0.6vw',
    //paddingBottom: '0.6vw',
    background: '#FFFFFF',
    //borderRadius: '0.88vw',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40.68vw', // 设置为auto以自适应宽度
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
    marginTop: '-7.5vw'
}
const third = {}

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
            <div style={{
                width: '100vw',
                height: '21vh',
                marginTop: '5vh',
                maxWidth: '100%',
                backgroundColor: '#FFFFFF',
            }} >

                <div className='greyBackground' style={{
                    width: '46vw',
                    height: '13.65vh',
                    borderRadius: '3px',
                    border: '1px solid #000',
                    backgroundColor: '#F8F8F8',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    position:'relative',
                }}>
                    <div style={{ width: '100vw', height: '0vh', maxWidth: '100%', position:'absolute',top:'2vh'}}>
                        <div style={{
                            width: '36vw', // 设置为auto以自适应宽度
                            height: 'fit-content',
                            background: '#FFFFFF',

                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flexDirection: 'column',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            paddingLeft:'2vw',
                            paddingRight:'2vw',
                            paddingBottom:'1vh',
                            paddingTop:'1vh',
                            
                            borderRadius: '3px',
                            border: '2px solid #000'
                        }}>
                            <span style={{
                                fontWeight: '700',
                                color: '#000000',
                                textAlign: 'center',
                                fontSize: '2.6vw',
                                lineHeight: 'normal',
                            }}>
                                {this.props.infoTitle} 
                            </span>
                            <span style={{
                                width: '100%',
                                color: '#000',
                                fontSize: '1vw',
                                lineHeight: 'normal',
                                textAlign: 'center',
                            }}>
                                {this.props.keyPoint}
                            </span>
                        </div>
                    </div>
                </div>


            </div>
        )

    }
}