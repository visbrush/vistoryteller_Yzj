import React from "react";
import { Divider } from 'antd';

export default class ContentDivider extends React.Component {

    render() {

        const outerDiv = {
            textAlign: "left",
            height: "40px",
            paddingInline: 100,
        }
        const dividerStyle = {
            borderWidth: "2px", 
            margin:"0px"
        };

        return (
            <>
                <div style={outerDiv}>
                    <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M35.5005 14.5C38.7005 19.7 38.8333 32.6667 38.5 37.5L25 27L18.0005 17.5C16.8005 15.1 17.5005 4.83333 18.0005 0.5C22.5005 3 32.3005 9.3 35.5005 14.5Z" fill="#3E7AFF" />
                        <path d="M24.5 20.5C17.5 15.5 3 15.5 0.5 15.5C3.33333 20.6666 8 29.1363 14 33.4999C19.5 37.4999 37.5 39 38.5 37.9999C39.2905 37.2094 32 25.8571 24.5 20.5Z" fill="#E1EEF6" />
                    </svg>
                    <Divider style={dividerStyle} />
                </div>
            </>



        )
    }
}