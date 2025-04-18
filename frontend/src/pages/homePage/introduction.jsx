import React from "react";


export default class Introduction extends React.Component {

    handleDownload = (imageName) => {
        const fileUrl = `http://localhost:3000/spreadsheets/${imageName}.zip`; // 替换为您的文件路径
        fetch(fileUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${imageName}.zip`); // 替换为您的文件名
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }


    render() {

        const introductionDiv = {
            display:'flex',
            width:'100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingInline: 200,
            marginTop:30
        }
        const imgStyle = {
            width: "144px",
            height:'144px'
        }

        return (
            <div style={{display:'flex',flexDirection:'column',marginTop:'30px'}}>
                <span style ={{color:'black',fontSize: "15px",}}>Download the test dataset </span>
                <div style={introductionDiv}>
                    <img src={require("../../assets/pagePics/car.png")} alt="car" style={imgStyle} onClick={() => this.handleDownload('car')}></img>
                    <img src={require("../../assets/pagePics/student.png")} alt="student" style={imgStyle} onClick={() => this.handleDownload('student')}></img>
                    <img src={require("../../assets/pagePics/startup.png")} alt="startup" style={imgStyle} onClick={() => this.handleDownload('startup')}></img>                </div>
            </div>



        )
    }
}