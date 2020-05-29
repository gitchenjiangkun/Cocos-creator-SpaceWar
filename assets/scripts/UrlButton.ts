// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    url: string = "";

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("click", this.gotoUrl, this);
    }

    start () {

    }

    // update (dt) {}

    gotoUrl(){
        window.location.href = this.url;
    }
}
