import React from "react";
import gsap from 'gsap';
import '../anicaption/anicaption.css'

export default class AniCaption extends React.Component {
    constructor(props) {
        super(props);
    }

    captionanimation = () =>{
        this.captions = document.querySelectorAll('.caption');

        const timeline = gsap.timeline({ repeat: 1 }); // 无限重复动画
        timeline
            .fromTo(this.captions[0], { opacity: 0 }, { opacity: 1, duration: 3, ease: "ease-in-out" })

    }

    componentDidMount() {
        this.captionanimation()
    }

    componentDidUpdate(prevProps, prevState) {
        // 使用 prevProps 和 prevState 来检测属性和状态的变化
        if (this.props.caption !== prevProps.caption) {
          // 属性 someProp 发生了变化，执行相应操作
            console.log('caption 发生了变化');
        }
        this.captionanimation()
    }

    render() {
        return (
            <div className="caption" >
                {this.props.caption}
            </div>
        );
    }
}
