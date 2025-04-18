import Action from './action';

class AddEncoding extends Action {
    constructor(spec) {
        super(spec);
        this.channel = spec.channel;
        this.field = spec.field
        if ('axis' in spec) {
            this.axis = spec['axis']
        }
        if ('animation' in spec) {
            this._animation = spec.animation;
        }
    }

    operate(vis) {
        vis.chart().addEncoding(this.channel, this.field, this.animation(), this.axis);
    }
}

export default AddEncoding;