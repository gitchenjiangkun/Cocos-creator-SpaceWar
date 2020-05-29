// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "./Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    menu:cc.Node;
    game:cc.Node;
    playBtn:cc.Node;
    // onLoad () {}

    start () {
        this.menu = cc.find("Canvas/Menu");
        this.game = cc.find("Canvas/Game");
        this.playBtn = cc.find("Canvas/Menu/Play");
        this.addEvent();
    }

    // update (dt) {}
    addEvent():void{
        this.playBtn.on("click", this.play, this);
    }
    play():void{
        this.menu.active = false;
        this.game.active = true;
        this.game.getComponent(Game).enabled = true;
    }
}
