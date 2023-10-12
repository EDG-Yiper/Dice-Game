// 电脑玩家的逻辑函数
function computerPlayerLogic() {
    // 获取电脑玩家的骰子数组和锁定数组
    let dice = players[currentPlayer].dice;
    let locked = players[currentPlayer].locked;

    // 第二轮投掷
    if (roundCount === 2) {
        // 判断是否有五连，即五个骰子都相同，如果有，那么锁定所有骰子。
        if (dice[0] === dice[4]) {
            for (let i = 0; i < MAX_DICE; i++) {
                locked[i] = true;
            }
            return;
        }

        // 判断是否有四连，即四个骰子相同，如果有，那么锁定这四个骰子。
        if (dice[0] === dice[3] || dice[1] === dice[4]) {
            for (let i = 0; i < MAX_DICE - 1; i++) {
                if (dice[i] === dice[i + 1]) {
                    locked[i] = true;
                    locked[i + 1] = true;
                }
            }
            return;
        }

        // 判断是否有葫芦，即三个骰子相同加一个对子，如果有，那么锁定这五个骰子。
        if ((dice[0] === dice[2] && dice[3] === dice[4]) || (dice[0] === dice[1] && dice[2] === dice[4])) {
            for (let i = 0; i < MAX_DICE; i++) {
                locked[i] = true;
            }
            return;
        }

        // 判断是否有三连，即三个骰子相同，如果有，那么锁定这三个骰子。
        for (let i = 0; i < MAX_DICE - 2; i++) {
            if (dice[i] === dice[i + 1] && dice[i + 1] === dice[i + 2]) {
                for (let j = i; j < i + 3; j++) {
                    locked[j] = true;
                }
                return;
            }
        }

        // 判断是否有双对，即两对一样的骰子，如果有，那么锁定这四个骰子。
        let pairCount = 0;
        for (let i = 0; i < MAX_DICE - 1; i++) {
            if (dice[i] === dice[i + 1]) {
                pairCount++;
                i++;
            }
        }
        if (pairCount === 2) {
            for (let i = 0; i < MAX_DICE - 1; i++) {
                if (dice[i] === dice[i + 1]) {
                    locked[i] = true;
                    locked[i + 1] = true;
                    i++;
                }
            }
            return;
        }

        // 判断是否有大顺子，即五个数字连续的骰子，如果有，那么锁定所有骰子。
        if (dice[0] + 1 === dice[1] && dice[1] + 1 === dice[2] && dice[2] + 1 === dice[3] && dice[3] + 1 === dice[4]) {
            for (let i = 0; i < MAX_DICE; i++) {
                locked[i] = true;
            }
            return;
        }

        // 判断是否有小顺子，即四个数字连续的骰子，如果有，那么锁定这四个骰子。
        for (let i = 0; i < 2; i++) {
            if (dice[i] + 1 === dice[i + 1] && dice[i + 1] + 1 === dice[i + 2] && dice[i + 2] + 1 === dice[i + 3]) {
                for (let j = i; j < i + 4; j++) {
                    locked[j] = true;
                }
                return;
            }
        }
        if(dice[0]+1 == dice[1] && dice[1]+1 == dice[3] && dice[3]+1 == dice[4]){
            locked[0] = true;
            locked[1] = true;
            locked[3] = true;
            locked[4] = true;
            return;
        }
        for (let i = 0; i < MAX_DICE; i++) {
            if(dice[i] == 5 || dice[i] == 6){
                locked[i] = true;
            }
        }
    }

    // 第一轮投掷
    if (roundCount === 1) {
        // 判断是否有五连，即五个骰子都相同，如果有，那么锁定所有骰子。
        if (dice[0] === dice[4]) {
            for (let i = 0; i < MAX_DICE; i++) {
                locked[i] = true;
            }
            return;
        }

        // 判断是否有四连，即四个骰子相同，如果有，那么锁定这四个骰子。
        if (dice[0] === dice[3] || dice[1] === dice[4]) {
            for (let i = 0; i < MAX_DICE - 1; i++) {
                if (dice[i] === dice[i + 1]) {
                    locked[i] = true;
                    locked[i + 1] = true;
                }
            }
            return;
        }
        // 判断是否有三连，即三个骰子相同，如果有，那么锁定这三个骰子。
        for (let i = 0; i < MAX_DICE - 2; i++) {
            if (dice[i] === dice[i + 1] && dice[i + 1] === dice[i + 2]) {
                for (let j = i; j < i + 3; j++) {
                    locked[j] = true;
                }
                return;
            }
        }
        // 判断是否有大顺子，即五个数字连续的骰子，如果有，那么锁定所有骰子。
        if (dice[0] + 1 === dice[1] && dice[1] + 1 === dice[2] && dice[2] + 1 === dice[3] && dice[3] + 1 === dice[4]) {
            for (let i = 0; i < MAX_DICE; i++) {
                locked[i] = true;
            }
            return;
        }

        // 判断是否有小顺子，即四个数字连续的骰子，如果有，那么锁定这四个骰子。
        for (let i = 0; i < 2; i++) {
            if (dice[i] + 1 === dice[i + 1] && dice[i + 1] + 1 === dice[i + 2] && dice[i + 2] + 1 === dice[i + 3]) {
                for (let j = i; j < i + 4; j++) {
                    locked[j] = true;
                }
                return;
            }
        }
        if(dice[0]+1 == dice[1] && dice[1]+1 == dice[3] && dice[3]+1 == dice[4]){
            locked[0] = true;
            locked[1] = true;
            locked[3] = true;
            locked[4] = true;
            return;
        }

        // 如果有3，4，5锁之
        for (let i = 1; i < MAX_DICE - 1; i++) {
            if (dice[i] == 4 && dice[i - 1] == 3) {
                if(dice[i+1] == 5){
                    locked[i - 1] = true;
                    locked[i] = true;
                    locked[i + 1] = true;
                    return;
                }
                if(i<=3){
                    if(dice[i + 2] == 5){
                    locked[i - 1] = true;
                    locked[i] = true;
                    locked[i + 2] = true;
                    return;
                    }
                }
            }
        }

        // 如果有2，3，4锁之
        for (let i = 1; i < MAX_DICE - 1; i++) {
            if (dice[i] == 3 && dice[i - 1] == 2) {
                if(dice[i+1] == 4){
                    locked[i - 1] = true;
                    locked[i] = true;
                    locked[i + 1] = true;
                    return;
                }
                if(i<=3){
                    if(dice[i + 2] == 4){
                    locked[i - 1] = true;
                    locked[i] = true;
                    locked[i + 2] = true;
                    return;
                    }
                }
            }
        }
        //如果有两个六，锁定之
        var flag = 0
        for (let i = 0; i < MAX_DICE - 1; i++) {
            if (dice[i] === dice[i + 1] && dice[i] == 6) {
                locked[i] = true;
                locked[i + 1] = true;
                flag = 1;
            }
        }
        //如果有两个五，锁定之
        for (let i = 0; i < MAX_DICE - 1; i++) {
            if (dice[i] === dice[i + 1] && dice[i] == 5) {
                locked[i] = true;
                locked[i + 1] = true;
                flag = 1;
            }
        }
        if(flag ==1){
            return;
        }
    }

}

function Computer_choose(){                   //帮助托管玩家和电脑选择倍率的函数
    calculate();
    let max_player="0";
    for(i = 0;i < playerCount - 1;i++){
        if(players[i].score < players[i + 1].score){
            max_player = i + 1;
        }
    }
    for(i = 0;i <= playerCount - 1;i++){
        if(players[i].isAi == 1){
            if(i == max_player && roundCount != 3){
                if(players[i].score>=40){
                    players[i].multiplier = 3;
                }
                else if (players[i].score >= 35){
                    players[i].multiplier = 2;
                }
                else{
                    players[i].multiplier = 1;
                }
            }
            else{
                players[i].multiplier = 0;
            }
        }
    }
}