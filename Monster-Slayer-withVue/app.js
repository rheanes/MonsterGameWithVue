function getRandomValue(min, max){
    return Math.floor(Math.random() * (max- min)) + min;
}


const app = Vue.createApp({
    data(){
        return{
            userHealth: 100,
            monsterHealth: 100,
            turn: 0,
            winner: null,
            log: []
        
        };
    },
    computed: {
        monsterBarStyles(){
            if(this.monsterHealth<= 0){
                return{width: '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            if(this.userHealth<= 0){
                return{width: '0%'}
            }
            return {width: this.userHealth + '%'}
        },
        canSpecialAttack(){
            return this.turn % 3 !== 0
        }
    }
    ,
    methods: {
        resetDefaults(){
            this.userHealth = 100;
            this.monsterHealth = 100;
            this.turn = 0;
            this.winner = null;
            this.log = [];
        },
        attackMonster(){
            this.turn++;
            const attackValue = getRandomValue(5,12)
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(8,15)
            this.userHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttackMonster(){
            this.turn++;
            const attackValue = getRandomValue(10,25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'special-attack', attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.turn++;
            const healValue = getRandomValue(8,17);
            if (this.userHealth + healValue > 100){
                this.userHealth =100;
            }
            else{
                this.userHealth += healValue;
            }
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
            
        },
        surrender(){
            this.winner = 'monster';
        },
        addLogMessage(who, what, value){
            this.log.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });

        }

    },
    watch:{
        userHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw';
            }
            else if(value <= 0){
                this.winner = 'monster';
            }

        },
        monsterHealth(value){
            if(value <= 0 && this.userHealth <= 0){
                this.winner = 'draw'
            }
            else if(value <= 0){
                this.winner = 'player';
            }

        }

    }
});

app.mount('#game');