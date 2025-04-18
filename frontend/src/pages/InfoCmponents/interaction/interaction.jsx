import React from "react";
import "./interaction.css"
import NatuSmallComponent from '../../../components/natuSmall/natuSmall';
import jiantou from "../../../pics/jiantou.svg"
import central_pic from "../../../pics/image.jpg"
import HeaderComponent from '../../../components/InterHeader/header'
import { yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7 } from '../other/hikinginter'
import { Card200200, index36, index60, bluestyle, narstyle, factstyle, introstyle } from '../../../constant/narsetting';
import { Space } from "antd";

const bottom = {
  height: '800px', transform: 'translateZ(0px)',
  marginLeft: '6vw',
  marginRight: '6vw'
}
const first = {
  width: '100vw',
  maxWidth: '100%',
  height: '20vw',
  border: '0vw solid #000000',
  backgroundColor: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}




const jiantouStyle = {
  height: '4.37vw',
  width: '4.37vw',
  marginLeft: 'auto',
  marginRight: 'auto',
  zIndex: '20',
  backgroundColor: '#FFFFFF'
}


const styles = {
  container: {
    marginTop: '5.21vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //justifyContent: 'flex',
    height: 'auto',
    //position: 'relative',
  },
  line: {
    width: '100%',
    height: '1px',
    backgroundColor: '#898989',
    //position: 'absolute',
    bottom: 0,
  },
  box: {
    marginTop: '-0.65vw',
    backgroundColor: '#FFF',
    //padding: '10px 20px',
    borderRadius: '5px',
    paddingLeft: '0.5vw',
    paddingRight: '0.5vw'
  },
  letters: {
    fontSize: '0.833vw',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#5C5C5C',
  },
};



const headerStyle = {
  zIndex: '9',
  fontFamily: 'AlibabaPuHuiTi',
};

//////
export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      // factList: [yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7],
      // infoTitle: 'Hiking',
      // keyPoint: 'What are the characteristics of people who enjoy hiking? and where do they go most often?',
      // captionList: ['The count of gender is 100', 'Rank', 'Proportion', 'Distribution', 'Distribution', 'Distribution', 'Categorization', 'Rank'],
      // titleList: ['Value', 'Rank', 'Proportion', 'Distribution', 'Distribution', 'Distribution', 'Categorization', 'Rank']
      factList: this.props.factList,
      infoTitle: this.props.infoTitle,
      keyPoint: this.props.keyPoint,
      captionList: this.props.captionList,
      titleList: this.props.titleList
    }
  }

  render() {
    const { titleList, captionList } = this.state
    const Boxstyle = {

      background: this.props.imgSrc
        ? `url(${URL.createObjectURL(this.props.imgSrc.originFileObj)}) no-repeat center/50%`
        : `url(${central_pic}) no-repeat center/50%`,
      // backgroundSize: '50% ',
      // backgroundRepeat:'no-repeat ',
      // backgroundPosition: 'center ', // 将背景图位置设置为居中
      overflowX: 'hidden',
      overflowY: 'auto',
      width: '100vw',
      maxWidth: '100%', //zIndex:'-2',
      height: '1200px', perspective: '1px', margin: '0px auto',

      // opacity:'0.5'
    }


    return (
      <div className="inter1wrapper" style={{ fontFamily: 'AlibabaPuHuiTi', ...this.props.style }}>

        <HeaderComponent style={headerStyle} infoTitle={this.state.infoTitle} keyPoint={this.state.keyPoint} />

        <div style={first}>
          <img src={jiantou} style={jiantouStyle} variant="contained" onClick={() => this.containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}></img>
        </div>

        <div ref={this.containerRef} className="bg-image" style={Boxstyle}>
          <div style={bottom}>
            {/* <Space direction="vertical" size={24}> */}
            {this.state.factList.map((fact, index) => (
              index == 3 || index == 1 || index == 5 ?
                <NatuSmallComponent key={index} yourSpec={fact}
                  CardStyle={{ width: '20.8vw', height: '22.8vw', }}
                  Title={titleList[index]} Intro={captionList[index]} Index={index + 1} name={'yourSpec_' + String(index)}
                  IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle} />
                : (index == 0 || index == 4 || index == 2 ?
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <NatuSmallComponent key={index} yourSpec={fact}
                      CardStyle={{ width: '20.8vw', height: '22.8vw', }}
                      Title={titleList[index]} Intro={captionList[index]} Index={index + 1} name={'yourSpec_' + String(index)}
                      IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle} />
                  </div>
                  :
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <NatuSmallComponent key={index} yourSpec={fact}
                      CardStyle={{ width: '30vw', height: '32vw', marginTop: '22.8vw' }}
                      Title={titleList[index]} Intro={captionList[index]} Index={index + 1} name={'yourSpec_' + String(index)}
                      IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle} />
                  </div>)
            ))}
            {/* </Space> */}

          </div>
        </div>
        <div style={styles.container}>
          <div style={styles.line}></div>
          <div style={styles.box}>
            <div style={styles.letters}>END</div>
          </div>
        </div>
      </div>
    )
  }
}
