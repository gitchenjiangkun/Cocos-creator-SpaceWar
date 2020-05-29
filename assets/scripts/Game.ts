// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BulletCollision from "./BulletCollision";
import Player from "./Player";
import Enemy from "./Enemy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    @property(cc.Prefab)
    enemyPrefab:cc.Prefab;

    enemyList:cc.Node[] = [null, null, null, null, null, null];
    enemyCount:number = 0;

    player:cc.Node;
    canvas:cc.Node;
    game:cc.Node;

    score:cc.Node;
    scoreNum:number = 0;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        this.canvas = cc.find("Canvas");
        this.game = cc.find("Canvas/Game");
        this.player = cc.find("Canvas/Game/Player");
        this.score = cc.find("Canvas/Game/Score");
    }

    onEnable(){
        this.insEnemy();
        this.restartEnemy();
        this.restartPlayer();
        this.restartScore();
    }

    // start () {
    // }

    update (dt) {
        this.detectionEnemy();
    }

    insEnemy(){
        for(var i:number = this.enemyCount; i < this.enemyList.length; i++){
            var enemy:cc.Node = cc.instantiate(this.enemyPrefab);
            this.enemyList[i] = enemy;
            this.enemyCount++;
        }
    }

    detectionEnemy(){
        for(var i:number = 0; i < this.enemyList.length; i++){
            if(this.enemyList[i] != null){
                var x:number = Math.abs(this.enemyList[i].position.x);
                var y:number = this.enemyList[i].position.y;
                if(x > this.canvas.width / 2 + 100){
                    this.setEnemy(this.enemyList[i]);
                }
                if(y < -this.canvas.height / 2){
                    this.setEnemy(this.enemyList[i]);
                }
                if(this.enemyList[i].active == false){
                    this.setEnemy(this.enemyList[i]);
                }
            }
        }
    }

    setEnemy(enemy:cc.Node){
        var x:number = this.canvas.width / 2;
        var y:number = this.canvas.height / 2;
        enemy.active = true;
        enemy.setParent(this.game);
        enemy.setPosition(this.random(-x, x),y, 0);
        enemy.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        enemy.getComponent(Enemy).lift = 1;
    }

    restartEnemy(){
        for(var i:number = 0; i < this.enemyList.length; i++){
            if(this.enemyList[i] != null){
                this.setEnemy(this.enemyList[i]);
            }
        }
    }

    restartPlayer(){
        this.player.active = true;
        this.player.setPosition(cc.v2(0, -260));
        this.player.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        this.player.getComponent(Player).enabled = true;
        this.player.getComponent(Player).lift = 3;
    }

    restartScore(){
        this.scoreNum = 0;
        this.score.getComponent(cc.Label).string = "分数 : " + this.scoreNum.toString();
    }

    addScore(num:number){
        this.scoreNum += num;
        this.score.getComponent(cc.Label).string = "分数 : " + this.scoreNum.toString();
    }

    random(min:number, max:number):number{
        var r:number = Math.random();
        var num:number = 0;
        if(r < 0.5){
            num = Math.random() * min - 50;
        }
        else{
            num = Math.random() * max + 50;
        }
        return num;
    }
}
