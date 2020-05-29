// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BulletCollision from "./BulletCollision";
import AircraftBase from "./AircraftBase";
import Game from "./Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends AircraftBase{
    
    @property(cc.Prefab)
    bullet:cc.Prefab;

    // LIFE-CYCLE CALLBACKS:
    bulletSpeed:number = 500;
    fireTime:number = 0.5;
    fireTimeCount:number = 0;

    canvas:cc.Node;
     onLoad () {
        this.canvas = cc.find("Canvas");
     }

    start () {

    }

     update (dt) {
        this.fire(dt);
     }

    fire(dt:number){
        this.fireTimeCount += dt;
        if(this.fireTimeCount >= this.fireTime){
            this.fireTimeCount = 0;
            var bullet:cc.Node = cc.instantiate(this.bullet);
            bullet.setParent(this.canvas);
            bullet.setPosition(this.node.position);
            bullet.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -this.bulletSpeed);
            bullet.addComponent(BulletCollision).enemy = "Player";
        }
    }

    OnDestroy() {
        cc.log("enemy");
        this.lift--;
        if(this.lift <= 0){
            this.node.active = false;
            var game:Game = cc.find("Canvas/Game").getComponent(Game);
            game.addScore(1);
        }
    }
}
