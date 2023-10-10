// 电脑玩家的逻辑函数
function computerPlayerLogic() {
    // 获取电脑玩家的骰子数组和锁定数组
    let dice = players[currentPlayer].dice;

    let locked = players[currentPlayer].locked;

    if (roundCount === 3) {
        players[currentPlayer].multiplier = 0;
        return;
    }

    if (roundCount !== 3){

        // 判断是否有五连，即五个骰子都相同，如果有，那么锁定所有骰子，并选择最高倍率
        if (dice[0] === dice[4]) {
            for (let i = 0; i < MAX_DICE; i++) {
                locked[i] = true;
            }
            players[currentPlayer].multiplier = 3;
            return;
        }

        // 判断是否有四连，即四个骰子相同，如果有，那么锁定这四个骰子，并选择中等倍率
        if (dice[0] === dice[3] || dice[1] === dice[4]) {
            for (let i = 0; i < MAX_DICE - 1; i++) {
                if (dice[i] === dice[i + 1]) {
                    locked[i] = true;
                    locked[i + 1] = true;
                }
            }
            players[currentPlayer].multiplier = 2;
            return;
        }

        // 判断是否有葫芦，即三个骰子相同加一个对子，如果有，那么锁定这五个骰子，并选择中等倍率
        if ((dice[0] === dice[2] && dice[3] === dice[4]) || (dice[0] === dice[1] && dice[2] === dice[4])) {
            for (let i = 0; i < MAX_DICE; i++) {
                locked[i] = true;
            }
            players[currentPlayer].multiplier = 2;
            return;
        }

        // 判断是否有三连，即三个骰子相同，如果有，那么锁定这三个骰子，并选择低等倍率
        for (let i = 0; i < MAX_DICE - 2; i++) {
            if (dice[i] === dice[i + 1] && dice[i + 1] === dice[i + 2]) {
                for (let j = i; j < i + 3; j++) {
                    locked[j] = true;
                }
                players[currentPlayer].multiplier = 1;
                return;
            }
        }

        // 判断是否有双对，即两对一样的骰子，如果有，那么锁定这四个骰子，并选择低等倍率
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
            players[currentPlayer].multiplier = 1;
            return;
        }

        // 判断是否有大顺子，即五个数字连续的骰子，如果有，那么锁定所有骰子，并选择最高倍率
        if (dice[0] + 1 === dice[1] && dice[1] + 1 === dice[2] && dice[2] + 1 === dice[3] && dice[3] + 1 === dice[4]) {
            for (let i = 0; i < MAX_DICE; i++) {
                locked[i] = true;
            }
            players[currentPlayer].multiplier = 3;
            return;
        }

        // 判断是否有小顺子，即四个数字连续的骰子，如果有，那么锁定这四个骰子，并选择中等倍率
        for (let i = 0; i < 2; i++) {
            if (dice[i] + 1 === dice[i + 1] && dice[i + 1] + 1 === dice[i + 2] && dice[i + 2] + 1 === dice[i + 3]) {
                for (let j = i; j < i + 4; j++) {
                    locked[j] = true;
                }
                players[currentPlayer].multiplier = 1;
                return;
            }
        }
        if(dice[0]+1 == dice[1] && dice[1]+1 == dice[3] && dice[3]+1 == dice[4]){
            locked[0] = true;
            locked[1] = true;
            locked[3] = true;
            locked[4] = true;
            players[currentPlayer].multiplier = 1;
            return;
        }
    }

    // 如果没有以上任何一种情况，那么根据当前轮数和骰子点数来决定是否锁定某些骰子或者重新投掷

    // 如果是第二轮投掷，那么锁定点数为4或以上的骰子，并选择低等倍率
    if (roundCount === 2) {
        for (let i = 0; i < MAX_DICE; i++) {
            if (dice[i] >= 4) {
                locked[i] = true;
            }
        }
        players[currentPlayer].multiplier = 1;
        return;
    }

    // 如果是第一轮投掷，那么锁定点数为5或6的骰子，并选择低等倍率
    if (roundCount === 1) {
        for (let i = 0; i < MAX_DICE; i++) {
            if (dice[i] >= 5) {
                locked[i] = true;
            }
        }
        players[currentPlayer].multiplier = 1;
        return;
        
    }

}