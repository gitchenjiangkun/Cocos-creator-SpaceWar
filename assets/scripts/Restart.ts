// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "./Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Restart extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    restartBtn:cc.Node;

    onLoad () {
        this.restartBtn = this.node.children[1];
        this.restartBtn.on("click", this.restart, this);
    }

    start () {

    }

    // update (dt) {}

    restart(){
        var game:Game = cc.find("Canvas/Game").getComponent(Game);
        game.restartEnemy();
        game.restartPlayer();
        game.restartScore();
        this.node.active = false;
        cc.log("restart");
    }
}
