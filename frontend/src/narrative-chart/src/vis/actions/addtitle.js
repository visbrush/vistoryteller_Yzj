import Action from './action';
import {Title} from './title'

class AddTitle extends Action {
    constructor(spec) {
        super(spec);
        this._style = {};
        if ('style' in spec) {
            this._style = spec.style;
        }
        if ('text' in spec) {
            this._style["text"] = spec.text;
        }

        if ('animation' in spec) {
            this._animation = spec.animation;
        } else {
            this._animation = { "duration": 0 }
        }
    }

    operate(vis) {
        let titler = new Title()
        let style = this._style;
        let animation = this._animation;
        titler.maketitle(vis, style, animation);
    }

}

export default AddTitle;