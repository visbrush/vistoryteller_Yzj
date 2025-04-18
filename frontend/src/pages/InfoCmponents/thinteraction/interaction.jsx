import React from "react";
import NatuComponent from '../../../components/natuSmall/natuSmall';
import jiantou from "../../../pics/jiantou.svg"
import { yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7 } from '../other/hikinginter3'
import HeaderComponent from '../../../components/thInterHeader/header'
import { Card200200, index36, index60, bluestyle, narstyle, factstyle, introstyle, ca } from '../../../constant/narsetting';


const Boxstyle = {
    overflowX: 'hidden', overflowY: 'auto', width: '100vw',
    maxWidth: '100%',
    height: '1200px', perspective: '1px', margin: '0px auto',
    // backgroundSize: 'cover', // 让背景图自适应填满整个元素
    // backgroundPosition: 'center', // 将背景图位置设置为居中
}

const first = {
    width: '100vw',
    maxWidth: '100%',
    height: '21.4vw',
    //border:'1px solid #000000',
    display: '-webkit-flex',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    marginTop: '2vw',
    zIndex: '5'
    //WebkitFlexDirection: 'column',
    //display: 'flex',
    //flexDirection: 'column'
}
const jiantouStyle = {
    height: '4.37vw',
    marginTop: '14vw',
    width: '4.37vw',
    marginLeft: 'auto',
    marginRight: 'auto',
}


const TextStyleOrigin = {
    color: '#7E7E7E',
    width: '100%',
    //height:'500px',
    //left: '130px',
    //display:'flex',
    //left:'0',
    //right:'0',
    margin: 'auto',
    fontSize: '1.4vw',
    lineHeight: '1.921vw',
    marginTop: '0.42vw',
    textAlign: 'center',
};
const TextStyle = {
    ...TextStyleOrigin, fontSize: '0.625vw', lineHeight: 'normal', paddingLeft: '20px', paddingRight: '20px'
}
const TextBox = {
    height: '3.25vw',
    //height: 'calc(var(line-height-multiplier) * var(line-height))',
    //border: '1px solid #c3c3c3',
    justifyContent: 'center',
    //alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
};



const CardStyle = {
    width: '26.04vw', height: '26.04vw', marginTop: '36px'
}



const blueBackgroundOrigin = {
    width: '100%',
    height: '16.8vw',
    flexShrink: '0',
    borderRadius: '0px 2vw 2vw 2vw',
    background: '#3E7AFF',
    marginTop: '-0.83vw'
}

const blueBackgroundSe = {
    ...blueBackgroundOrigin, height: '20.375vw'
}

const TitleStyle = {
    //textAlign: 'center',
    lineHeight: 'normal',
    fontWeight: '700',
    fontSize: '1.2vw',
    color: '#000000',
    //marginTop:'-0.3vw',
    //marginBottom:'auto',
    display: 'inline-block'
};
const boxStyleBox = {
    width: '100%',
    height: '21.375vw',
    //border: '1px solid #c3c3c3',
    display: '-webkit-flex',
    WebkitFlexDirection: 'column',
    display: 'flex',
    flexDirection: 'column'
}
const FiBox = {
    height: '7.55vw',
    borderRadius: '0.88vw',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '54px',
    width: '26.04vw', // 设置为auto以自适应宽度
    borderRadius: '1.6vw',
    background: '#FFF',
    boxShadow: ' 4px 4px 12px 5px rgba(180, 180, 180, 0.25)'
}
const Fi = {
    lineHeight: 'normal',
    fontSize: '2vw',
    fontWeight: '700',
    color: '#000000',
}
const idxBox = {
    width: '6vw',           // 设置框的宽度
    height: '4vw',          // 设置框的高度
    //right: '0px',
    //marginTop: '-100px',
    background: '#3E7AFF',
    //position: 'absolute',
    //bottom:'0px',
    //background:'#000000',
    textAlign: 'center',
    borderRadius: '0.8vw 0.8vw 0 0',
    //color: '#0050FF',
    //padding: '0.35vw 0',
    display: 'flex',         // 将父元素设置为Flex容器
    //alignItems: 'center',    // 垂直居中
    //justifyContent: 'center', // 水平居中
}
const idx = {
    //left:'0',
    //right:'0',
    //margin:'auto',
    lineHeight: 'normal',
    paddingTop: '0.26vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    //paddingLeft:'auto',
    //paddingRight:'auto',
    fontSize: '0.83vw',
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontWeight: '700'
}
const Titlebox = {
    height: '1.146vw',
    paddingTop: '0.2vw',
    paddingBottom: '0.2vw',
    background: '#2149FF14',
    borderRadius: '0.42vw',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '0.8vw',
    marginBottom: '0.1vw',
    width: 'auto', // 设置为auto以自适应宽度
};
const leftDecor = {
    width: '0.3125vw',
    height: '0.898vw',
    borderRadius: '0.8vw',
    background: '#3E7AFF',
    //marginTop:'-0.15vw',
    //marginBottom:'auto',
    marginLeft: '0.41vw',
    marginRight: '0.6vw'
};
const rightDecor = {
    width: '0.3125vw',
    height: '0.898vw',
    borderRadius: '0.8vw',
    background: '#3E7AFF',
    //marginTop:'-0.15vw',
    //marginBottom:'auto',
    marginLeft: '0.41vw',
    marginRight: '0.8vw'
    //margin:'auto',
    //marginLeft:'-1.4vw'
};
const idxBoxRi = {
    ...idxBox, width: '3.125vw', height: '2.08vw', borderRadius: '0.42vw 0.42vw 0 0'
}
const idxRi = {
    ...idx, fontSize: '0.83vw',
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
const fixedLegend = {
    marginLeft: '13.54vw',
    marginTop: '20vw',
    //color: 'white',
    zIndex: '1',
    //perspective:'',
    position: 'fixed',
    width: '7.66vw',
}
const legendTitle = {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'PingFang SC',
    fontSize: '1vw',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal'
}
const legendLine = {
    width: '7.66vw',
    height: '0.104vw',
    flexShrink: '0',
    background: '#D9D9D9'
}
const legendBox = {
    WebkitFlexDirection: 'row',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '22px',
    marginTop: '10px'
}
const legendCircle = {
    width: '0.68vw',
    height: '0.68vw',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '12px',
    borderRadius: '0.96vw',
    background: '#D9D9D9'
}
const legendText = {
    color: '#000',
    marginLeft: '7px',
    textAlign: 'center',
    fontFamily: 'AlibabaPuHuiTi',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    textTransform: 'capitalize'
}

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
            // titleList: ['Value', 'Rank', 'Proportion', 'Distribution', 'Distribution', 'Distribution', 'Categorization', 'Rank'],
            firstNums: 1,
            secondNums: 4,
            thirdNums: 3,
            forthNums: 2,
            factList: this.props.factList,
            infoTitle: this.props.infoTitle,
            keyPoint: this.props.keyPoint,
            captionList: this.props.captionList,
            titleList: this.props.titleList
        }
    }

    componentDidMount = () => {
        let partNums = []
        if (this.props.factList.length === 5) {
            partNums = [1, 2, 1, 1]
        }
        else if (this.props.factList.length === 6) {
            partNums = [1, 2, 1, 2]
        }
        else if (this.props.factList.length === 7) {
            partNums = [2, 2, 1, 2]
        }
        else if (this.props.factList.length === 8) {
            partNums = [2, 3, 1, 2]
        }
        else if (this.props.factList.length === 9) {
            partNums = [2, 3, 1, 3]
        }
        else if (this.props.factList.length === 10) {
            partNums = [2, 3, 2, 3]
        }
        console.log('part', partNums)
        this.setState({
            firstNums: partNums[0],
            secondNums: partNums[1],
            thirdNums: partNums[2],
            forthNums: partNums[3],
        })
    }


    render() {
        const { firstNums,
            secondNums,
            thirdNums,
            forthNums,
            titleList, captionList, factList, infoTitle, keyPoint } = this.state

        const part1Nums = firstNums
        const part2Nums = firstNums + secondNums
        const part3Nums = firstNums + secondNums + thirdNums
        const part4Nums = firstNums + secondNums + thirdNums + forthNums
        const part1fact = factList.slice(0, part1Nums);
        const part2fact = factList.slice(part1Nums, part2Nums);
        const part3fact = factList.slice(part2Nums, part3Nums);
        const part4fact = factList.slice(part3Nums, part4Nums);
        console.log('part', part4fact)

        return (
            <div style={{ fontFamily: 'AlibabaPuHuiTi', ...this.props.style }}>
                {/* <div style={fixedLegend}>
                    <div style={legendTitle}>KEY</div>
                    <div style={legendLine}></div>
                    <div style={legendBox}>
                        <div style={legendCircle}></div>
                        <div style={legendText}>图例1/KEY1</div>
                    </div>
                    <div style={legendBox}>
                        <div style={legendCircle}></div>
                        <div style={legendText}>图例2/KEY2</div>
                    </div>
                    <div style={legendBox}>
                        <div style={legendCircle}></div>
                        <div style={legendText}>图例3/KEY3</div>
                    </div>
                </div> */}
                <HeaderComponent infoTitle={infoTitle} keyPoint={keyPoint} />
                <div style={first}>
                    <img src={jiantou} style={jiantouStyle} variant="contained" onClick={() => this.containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}></img>
                </div>


                <div ref={this.containerRef} className="bg-image" style={Boxstyle}>
                    <div className='thinter-bottom' style={{ padding: '0px 18%' }}>

                        <div>
                            <div style={FiBox}>
                                <span style={Fi}>Part 1</span>
                            </div>
                            {part1fact.map((fact, index) => (
                                <NatuComponent yourSpec={fact} Title={titleList[index]} Intro={captionList[index]} Index={String(index + 1)} name={'yourSpec_' + String(index)}
                                    TextStyle={TextStyle} TextBox={TextBox} CardStyle={CardStyle} blueBackground={blueBackgroundSe} boxStyleBox={boxStyleBox} TitleStyle={TitleStyle} idxBox={idxBoxRi} idx={idxRi} leftDecor={leftDecor} rightDecor={rightDecor} Titlebox={Titlebox}
                                    IndexStyle={index60}
                                />)
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div style={FiBox}>
                                <span style={Fi}>Part 2</span>
                            </div>
                            {part2fact.map((fact, index) => (
                                <NatuComponent yourSpec={fact} Title={titleList[index + part1Nums]} Intro={captionList[index + part1Nums]} Index={String(index + 1)} name={'yourSpec_' + String(index + part1Nums)}
                                    TextStyle={TextStyle} TextBox={TextBox} CardStyle={CardStyle} blueBackground={blueBackgroundSe} boxStyleBox={boxStyleBox} TitleStyle={TitleStyle} idxBox={idxBoxRi} idx={idxRi} Titlebox={Titlebox}
                                    IndexStyle={index60}
                                />)
                            )}
                        </div>

                        <div>
                            <div style={FiBox}>
                                <span style={Fi}>Part 3</span>
                            </div>
                            {part3fact.map((fact, index) => (
                                <NatuComponent
                                    yourSpec={fact} Title={titleList[index + part2Nums]} Intro={captionList[index + part2Nums]} Index={String(index + 1)}
                                    name={'yourSpec_' + String(index + part2Nums)}
                                    TextStyle={TextStyle} TextBox={TextBox} CardStyle={CardStyle} blueBackground={blueBackgroundSe} boxStyleBox={boxStyleBox} TitleStyle={TitleStyle} idxBox={idxBoxRi} idx={idxRi} Titlebox={Titlebox}
                                    IndexStyle={index60} />)
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div style={FiBox}>
                                <span style={Fi}>Part 4</span>
                            </div>
                            {part4fact.map((fact, index) => (
                                <NatuComponent
                                    yourSpec={fact} Title={titleList[index + part3Nums]} Intro={captionList[index + part3Nums]} Index={String(index + 1)}
                                    name={'yourSpec_' + String(index + part3Nums)}
                                    TextStyle={TextStyle} TextBox={TextBox} CardStyle={CardStyle} blueBackground={blueBackgroundSe} boxStyleBox={boxStyleBox} TitleStyle={TitleStyle} idxBox={idxBoxRi} idx={idxRi} Titlebox={Titlebox}
                                    IndexStyle={index60} />)
                            )}
                        </div>

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
