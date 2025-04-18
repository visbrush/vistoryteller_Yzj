import React from 'react'
import { Button, Table, Drawer } from 'antd';
import { Layout, Space, Divider } from 'antd';
import linesvg from "../../pics/info-4pics/Line.svg"
import { Checkbox, ConfigProvider, Radio } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
    width: '100vw',
    maxWidth: '100%',
    height: '29.22vw',
    border: '0vw solid #000000',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    zIndex: '5',
};
const titleBox = {
    width: '100%',
    height: '4vw',
    marginTop: '0.6vw',
    marginBottom: '1.6vw',
    backgroundColor: '#FFFFFF',
    textAlign: 'center'
};
const blackheader = {
    width: '17.9vw',
    height: '1.2vw',
    backgroundColor: '#1F1F1F',
}
const title = {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: '900',
    color: '#000000',
    fontSize: '3.6vw',
    lineHeight: 'normal',
}
const introBox = {
    backgroundColor: '#F1F1F1',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding:'3% 5%',
}
const intro = {
    color: '#000000',
    fontSize: '1.6vw',
    width: '70vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //textAlign:'center',
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
            <div className='seinterHeader'style={headerStyle} >
                <div style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <div style={blackheader}></div>
                <div className='seinterTitleBox'style={titleBox}>
                    <div style={title}> {this.props.infoTitle}</div>
                </div>
                <div className='seinterIntroBox'style={introBox}>
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