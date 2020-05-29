// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BulletCollision from "./BulletCollision";
import AircraftBase from "./AircraftBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends AircraftBase {

    @property(cc.Prefab)
    bullet:cc.Prefab;
    // LIFE-CYCLE CALLBACKS:
    
    up:boolean;
    down:boolean;
    left:boolean;
    right:boolean;

    canvas:cc.Node;
    player:cc.Node;

    bulletSpeed:number = 500;
    fireTime:number = 0.2;
    fireTimeCount:number = 0;

    speed:number = 300;
     onLoad () {
        this.canvas = cc.find("Canvas");
        this.player = cc.find("Canvas/Game/Player");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyUp, this);
     }

    start () {

    }

     update (dt) {
        this.move(dt);
        this.fire(dt);
     }

    move(dt:number){
        if(this.up == true){
            var num:number = this.player.y += dt * this.speed;
            var num2:number = this.canvas.height / 2;
            num = this.clamp(num, -num2, num2);
            this.player.y = num;
        }
        if(this.down == true){
            var num:number = this.player.y -= dt * this.speed;
            var num2:number = this.canvas.height / 2;
            num = this.clamp(num, -num2, num2);
            this.player.y = num;
        }
        if(this.left == true){
            var num:number = this.player.x -= dt * this.speed;
            var num2:number = this.canvas.width / 2;
            num = this.clamp(num, -num2, num2);
            this.player.x = num;
        }
        if(this.right == true){
            var num:number = this.player.x += dt * this.speed;
            var num2:number = this.canvas.width / 2;
            num = this.clamp(num, -num2, num2);
            this.player.x = num;
        }
    }

    keyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.w:
                this.up = true;
                break;
            case cc.macro.KEY.s:
                this.down = true;
                break;
            case cc.macro.KEY.a:
                this.left = true;
                break;
            case cc.macro.KEY.d:
                this.right = true;
                break;
        }
    }

    keyUp(event){
        switch(event.keyCode){
            case cc.macro.KEY.w:
                this.up = false;
                break;
            case cc.macro.KEY.s:
                this.down = false;
                break;
            case cc.macro.KEY.a:
                this.left = false;
                break;
            case cc.macro.KEY.d:
                this.right = false;
                break;
        }
    }

    clamp(value:number, min:number,  max:number) : number{
        var num:number = 0;
        if(value >= max){
            num = max;
        }
        else if(value <= min){
            num = min;
        }
        else{
            num = value;
        }
        return num;
    }

    fire(dt:number){
        this.fireTimeCount += dt;
        if(this.fireTimeCount >= this.fireTime){
            this.fireTimeCount = 0;
            var bullet:cc.Node = cc.instantiate(this.bullet);
            bullet.setParent(this.canvas);
            bullet.setPosition(this.player.position);
            bullet.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.bulletSpeed);
            bullet.addComponent(BulletCollision).enemy = "Enemy";
        }
    }

    OnDestroy() {
        cc.log("player");
        this.lift--;
        if(this.lift <= 0){
            this.node.active = false;
            this.node.getComponent(Player).enabled = false;
            cc.find("Canvas/Restart").active = true;
        }
    }

}
