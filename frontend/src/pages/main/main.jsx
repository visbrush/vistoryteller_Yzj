import React, { useEffect } from "react";
import { Layout, Space } from 'antd';
// import ContentTitle from "../HomePage/contentTitle";
// import ContentDivider from "../HomePage/contentDivider";
// import UploadData from "../HomePage/uploadData"
// import Introduction from "../HomePage/introduction";
import ContentTitle from "../homePage/contentTitle";
import ContentDivider from "../homePage/contentDivider";
import UploadData from "../homePage/uploadData"
import Introduction from "../homePage/introduction";
import "./main.css"

const {Content } = Layout;
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'Chinese'
        };
    }

    render() {
        const contentStyle = {
            
            textAlign: 'center',
            height: "850px",
            color: '#fff',
            backgroundColor: 'white',
        };


        return (
            <>
                <Space
                    direction="vertical"
                    style={{
                        width: '100%',
                    }}
                    size={[0, 48]}
                >
                    <Layout>
                        <Content style={contentStyle}>
                            <ContentTitle />
                            <ContentDivider />
                            <UploadData />
                            <Introduction />
                        </Content>
                    </Layout>
                </Space>
            </>



        )
    }
}