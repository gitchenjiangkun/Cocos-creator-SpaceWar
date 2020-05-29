// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AircraftBase from "./AircraftBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BulletCollision extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    time:number = 0;
    enemy:string = "";
    // onLoad () {}

    start () {

    }

    update (dt) {
        this.time += dt;
        if(this.time >= 2){
            this.node.destroy();
        }
    }


    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve (contact, selfCollider, otherCollider) {
        if(otherCollider.node.name == this.enemy){
            this.node.destroy();
            otherCollider.node.getComponent(AircraftBase).OnDestroy();
        }
    }
}
