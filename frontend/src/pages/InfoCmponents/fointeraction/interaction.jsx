import React from "react";
import './interaction.css'
import jiantou from "../../../pics/jiantou.svg"
import info4header_line from '../../.../../../pics/info4header_line.svg'
import NatuSmallComponent from '../../../components/natuSmall/natuSmall';
import { yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7 } from '../other/hikinginsight'
import { Card200200, index36, index60, bluestyle, narstyle, factstyle, introstyle } from '../../../constant/narsetting';
import { Space } from "antd";

const Boxstyle = {
    overflowX: 'hidden',
    overflowY: 'auto',
    width: '100vw',
    maxWidth: '100%',
    height: '80%', perspective: '1px', margin: '0px auto',

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

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state = {
            // factList: [yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4,],
            // infoTitle: 'Hiking',
            // keyPoint: 'What are the characteristics of people who enjoy hiking? and where do they go most often?',
            // captionList: ['The count of gender is 100', 'Rank', 'Proportion', 'Distribution', 'Distribution', 'Distribution', 'Categorization', 'Rank'],
            // titleList: ['Value', 'Rank', 'Proportion', 'Distribution', 'Distribution', 'Distribution', 'Categorization', 'Rank'],
            factList: this.props.factList,
            infoTitle: this.props.infoTitle,
            keyPoint: this.props.keyPoint,
            captionList: this.props.captionList,
            titleList: this.props.titleList
        }
    }

    componentDidMount() {
        // console.log('this.containerRef',this.containerRef)
        // console.log('this.containerRef',this.containerRef.current)
    }


    render() {
        const { factList, titleList, captionList } = this.state

        return (
            <div style={this.props.style}>
                <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'AlibabaPuHuiTi', }}>
                    <div className='inter4header' style={{ width: '100%', height: '31.22vw', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '3.6vw', position: 'absolute', top: '16%' }}>{this.state.infoTitle}</h1>
                        <div className='inter4headerimg' style={{ display: 'flex', width: '70%', flexDirection: 'column', position: 'absolute', alignItems: 'center', top: '45%' }}>
                            <div style={{ padding: '12px 36px' }}>
                                <span style={{ width: '100%', height: '100%', fontSize: '1.6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    {this.state.keyPoint}</span>
                            </div>

                        </div>
                        <img
                            src={info4header_line}
                            alt='info4header_line pic'
                            width={'65%'}
                            height={10}
                            style={{ position: 'absolute', top: '40%' }}
                        ></img>

                    </div>
                    <div style={{
                        height: '24.4vw',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#FFFFFF',
                        position: 'relative',
                    }} variant="contained" >
                        <img
                            src={jiantou}
                            alt='arrow pic'
                            width={'18%'}
                            height={'18%'}
                            onClick={() => this.containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        ></img>
                    </div>
                    <div className="inter4narcontent" ref={this.containerRef} style={Boxstyle}>
                        <div style={{ display: 'grid', justifyContent: 'center', height: '1200px', transform: 'translateZ(0px)' }}>
                            <Space direction="vertical" size={36}>
                                {factList.map((fact, index) => (
                                    <NatuSmallComponent key={index} yourSpec={fact}
                                        CardStyle={{ flex: '1', width: '30vw', height: '30vw' }}
                                        Title={titleList[index]} Intro={captionList[index]} Index={index + 1} name={'yourSpec_' + String(index)}
                                        IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                                    />))
                                }
                            </Space>

                        </div>

                    </div>


                    <div style={styles.container}>
                        <div style={styles.line}></div>
                        <div style={styles.box}>
                            <div style={styles.letters}>END</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}