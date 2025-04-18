import React from 'react'
import './EditPage.css'
import { Layout} from "antd"
import EditMainPage from './EditMainPage'
//import HeadBarView from "@/components/HeadBar/index";
//import OperationType from '@/constant/OperationType';
//import EditTimeView from './EditTimeView';

  const contentStyle = {
    width:'100%',
    height:'calc(100vh - 64px - 1px)',
    background: '#F8F9FA'
  };


export default class EditPage extends React.Component {
    // publish = () => {
    //     this.props.updateOperation(OperationType.PUBLISHED)
    //     this.props.history.push('/')
    // }

    componentDidMount(){
      console.log('EditPage props:',this.props)
    }

    render() {
        //const { intl, initDone } = this.props;
        return (
            <div style={contentStyle}>
                <EditMainPage></EditMainPage>
            </div>
            // <div className='edit-page' id='whole-container'>
            //     {/* <HeadBarView isLogIn={false} {...this.props} /> */}
            //     <Divider className="customDivider" />
            //     <div className='edit-page-content'>
            //         <div className='edit-page-core'>
            //             {/* <EditTimeView btnState={this.props.rightBtnState} {...this.props} /> */}
            //         </div>
            //     </div>
            // </div>

            //  <Layout >
            //      <Header style={{ height: "50px" }}>
            //         <HeadBarView isLogIn={false} {...this.props} />
            //      </Header>
            //     <Divider className="customDivider" />
            //     <Content className="eidt-page-wrapper">
            //         render your edit page
            //         <Button className='save-btn' onClick={this.publish}>{initDone && intl.get("publish")}</Button>
            //     </Content>
            // </Layout >
        )
    }
}