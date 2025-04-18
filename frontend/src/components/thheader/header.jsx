import React from 'react'
import './header.css'
import background_pic from "../../pics/Rectangle.svg"
import THLeft from "../../pics/THLeft.svg"
import THRight from "../../pics/THRight.svg"




/*style优先级最高*/
const titleStyle = {
  //width:'22.1vw',
  height: '4.4vw',
  fontWeight: '700',
  color: '#000000',
  margin: '0 auto',
  fontSize: '32px',
  lineHeight: '4.39vw',
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
      <div className='thheader'>
        <div className='thheaderimgbox'>
          {/* <img className='thheaderimg' src={background_pic} alt="logo" /> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="668" height="107" viewBox="0 0 668 107" fill="none">
<path d="M666.975 87.297L667.497 0.5H0.5V106.5H636.772L666.975 87.297Z" fill="#F8F8F8" stroke="black"/>
</svg>


        </div>
        <div className='thheadertitle'>
          <div className='thheadertitlebox'>
            <img className='thheaderdecor'src={THLeft}></img>
            <span style={titleStyle}>
              {this.props.infoTitle}
            </span>
            <img src={THRight}></img>
          </div>

          <div className='thheaderintro'>{this.props.keyPoint}</div>
        </div>

      </div>
    )
  }
}

