import React from "react";

export default class ContentTitle extends React.Component {

    render() {

        const titleDiv = {
            color: "black",
            fontSize: "20px",
            fontWeight: "bolder",
            height: "80px",
            marginTop:"20px"
        }

        const descriptionDiv = {
            marginTop: "10px"
        }

        const nameSpan ={
            color: '#1F4D89',
            fontFamily: 'Alfa Slab One',
            fontSize: '32px'
            
        }
        return (
            <>
                <div style={titleDiv}>
                    <span style ={nameSpan}>Vistoryteller</span>
                    <div style={descriptionDiv}>Describing the future through narrative visualization!</div>
                </div>
            </>



        )
    }
}