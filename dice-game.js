// 定义一些常量和变量
const MAX_ROUNDS = 3; // 每局游戏的最大轮数
const MAX_DICE = 5; // 每个玩家的骰子数
const MAX_PLAYERS = 4; // 最大玩家数
const MIN_PLAYERS = 2; // 最小玩家数
const INITIAL_CHIPS = 100; // 每个玩家初始的筹码数
const BONUS_SCORES = [10, 10, 20, 40, 100, 30, 60, 0]; // 奖励分数
const BONUS_NAMES = ["双对", "三连", "葫芦", "四连", "五连", "小顺子", "大顺子"]; // 奖励名称

let gameMode = ""; // 游戏模式，可以是"单人"或"多人"
let gameCount = 0; // 游戏局数
let roundCount = 0; // 当前局的轮数
let playerCount = 0; // 玩家个数
let currentPlayer = 0; // 当前玩家的索引，从0开始
let players = []; // 玩家数组，每个元素是一个对象，包含name, chips, dice, locked, score, bonus, multiplier等属性
let gameOver = false; // 游戏是否结束的标志

// 定义一些DOM元素的引用，方便操作
let modeSelect = document.getElementById("mode-select"); // 游戏模式选择框
let countInput = document.getElementById("count-input"); // 游戏局数输入框
let chipsInput = document.getElementById("chips-input"); // 玩家筹码输入框
//去除弹窗
let playerInput = document.getElementById("player-input"); // 游戏人数输入框
let startButton = document.getElementById("start-button"); // 开始游戏按钮
let gameDiv = document.getElementById("game-div"); // 游戏区域的div元素
let roundDiv = document.getElementById("round-div"); // 当前轮数的div元素
let playerDiv = document.getElementById("player-div"); // 当前玩家的div元素
let chipsDiv = document.getElementById("chips-div"); // 当前玩家的筹码div元素
let diceDiv = document.getElementById("dice-div"); // 当前玩家的骰子div元素
let lockButton = document.getElementById("lock-button"); // 锁定骰子按钮
let rollButton = document.getElementById("roll-button"); // 投掷骰子按钮
let multiplierSelect = document.getElementById("multiplier-select"); // 倍率选择框
let confirmButton = document.getElementById("confirm-button"); // 确认倍率按钮
let resultDiv = document.getElementById("result-div"); // 结果区域的div元素
let divesDiv = document.getElementById("dives-div"); // 存储骰子区域的div元素

//这是界面切换
let settingDiv = document.getElementById("setting-div");
let sceneStartgame = document.getElementById("scene-startgame"); // 开始游戏的界面
let sceneGamerule = document.getElementById("scene-gamerule"); // 规则介绍的界面
let start = document.getElementById("start"); // 开始游戏按钮
let understand = document.getElementById("understand"); // 进入游戏设置按钮 

// 给开始游戏按钮添加点击事件，用来切换到游戏规则介绍场景
start.addEventListener("click", function() {
    // 隐藏初始界面
    sceneStartgame.style.display = "none";
    // 显示游戏规则介绍
    sceneGamerule.style.display = "flex";
});

// 给返回按钮添加点击事件，用来切换到初始界面场景
understand.addEventListener("click", function() {
    // 隐藏游戏规则介绍
    sceneGamerule.style.display = "none";
    // 显示游戏设置界面
    settingDiv.style.display = "block";
});


modeSelect.addEventListener("change", function() {
        gameMode = modeSelect.value; // 获取用户选择的游戏模式
        if (gameMode === "单人") {
            playerCount = 2; // 单人模式下，玩家个数为2，其中一个是电脑玩家
        } else if (gameMode === "多人") {
            playerInput.style.display = "inline"; // 显示输入玩家提示
            document.querySelector('[for="player-input"]').style.display='inline' // 显示输入玩家人数框
            playerInput.addEventListener("keyup", function(event) {
                if (event.keyCode === 13) { // 如果用户按下回车键
                    getPlayers(); // 调用获取玩家个数的函数
                }
            });
            playerInput.addEventListener("blur", function() { // 如果用户失去焦点
                getPlayers(); // 调用获取玩家个数的函数
            });
        }
    });
    
function getPlayers() {
    playerCount = playerInput.value; // 获取用户输入的玩家个数
    console.log(playerCount)
    playerCount = parseInt(playerCount); // 将输入转换为整数
    if (isNaN(playerCount) || playerCount < MIN_PLAYERS || playerCount > MAX_PLAYERS) {
        errorSpan.style.display = "inline"; // 显示错误信息
        errorSpan.textContent = "无效的输入，请重新输入！"; // 设置错误信息内容
        modeSelect.value = "";
        gameMode = "";
        playerInput.focus(); // 让输入框重新获得焦点
        return;
    } else {
        errorSpan.style.display = "none"; // 隐藏错误信息
    }
}


// 创建一个span元素来显示错误信息，并添加到HTML中
let errorSpan = document.createElement("span");
errorSpan.id = "error-span";
errorSpan.style.display = "none"; // 默认隐藏错误信息
errorSpan.style.color = "red"; // 设置错误信息颜色为红色
errorSpan.style.fontWeight = "bold"; // 设置错误信息字体为粗体
errorSpan.style.marginLeft = "10px"; // 设置错误信息左边距为10px
document.body.appendChild(errorSpan); // 将错误信息元素添加到body中


startButton.addEventListener("click", function() {
    gameCount = countInput.value; // 获取用户输入的游戏局数
    console.log(gameCount)
    gameCount = parseInt(gameCount); // 将输入转换为整数
    if (isNaN(gameCount) || gameCount <= 0) {
        alert("无效的输入，请重新输入游戏局数！"); // 如果输入不合法，弹出提示，并清空游戏局数输入框
        countInput.value = "";
        return;
    }
    let initialChips = chipsInput.value; // 获取用户输入的玩家筹码数
    initialChips = parseInt(initialChips); // 将输入转换为整数
    if (isNaN(initialChips) || initialChips <= 0) {
        alert("无效的输入，请重新输入玩家筹码数！"); // 如果输入不合法，弹出提示，并清空玩家筹码数输入框
        chipsInput.value = "";
        return;
    }
    if (gameMode === "") {
        alert("请选择游戏模式！"); // 如果没有选择游戏模式，弹出提示
        return;
    }
    initGame(initialChips); // 初始化游戏
});

lockButton.addEventListener("click", function() {
    lockDice(); // 锁定骰子
});

rollButton.addEventListener("click", function() {
    rollDice(); // 投掷骰子
});

confirmButton.addEventListener("click", function() {
    confirmMultiplier(); // 确认倍率
});

// 定义一些函数，实现游戏的逻辑

// 初始化游戏
function initGame(initialChips) {
    // 隐藏游戏设置区域，显示游戏区域
    document.getElementById("setting-div").style.display = "none";
    gameDiv.style.display = "block";
    divesDiv.style.display = "block";

    // 初始化玩家数组
    players = [];
    for (let i = 0; i < playerCount; i++) {
        let player = {}; // 创建一个玩家对象
        if (gameMode === "单人" && i === 1) {
            player.name = "电脑"; // 单人模式下，第二个玩家是电脑
        } else {
            player.name = prompt("请输入玩家" + (i + 1) + "的姓名：", "玩家" + (i + 1)); // 多人模式下，让用户输入每个玩家的姓名
        }
        player.chips = initialChips; // 设置玩家的初始筹码数
        player.dice = []; // 设置玩家的骰子数组，初始为空
        player.locked = []; // 设置玩家的锁定数组，初始为空，用来记录哪些骰子被锁定了
        player.score = 0; // 设置玩家的得分，初始为0
        player.bonus = -1; // 设置玩家的奖励类型，初始为-1，表示没有奖励
        player.multiplier = 0; // 设置玩家的倍率，初始为0
        players.push(player); // 将玩家对象添加到玩家数组中
    }

    // 开始第一局游戏
    startGame();
}

// 开始一局游戏
function startGame() {
    gameOver = false; // 设置游戏结束标志为false
    roundCount = 1; // 设置当前轮数为0
    currentPlayer = 0; // 设置当前玩家为第一个玩家

    // 遍历每个玩家，重置他们的骰子数组，锁定数组，得分，奖励类型和倍率
    for (let player of players) {
        player.dice = [];
        player.locked = [];
        player.score = 0;
        player.bonus = -1;
        player.multiplier = 0;
    }

    // 更新界面上的信息
    updateUI();

    // 开始第一轮投掷骰子
    startRound();
    lockButton.style.display = "none";
}

// 开始一轮投掷骰子
function startRound() {

    // 更新界面上的信息
    updateUI();

// 如果当前轮数小于最大轮数，那么显示锁定骰子按钮和投掷骰子按钮，否则隐藏它们
    if (roundCount < MAX_ROUNDS +1) {
        lockButton.style.display = "inline";
        rollButton.style.display = "inline";
    } else {
        lockButton.style.display = "none";
        rollButton.style.display = "none";
    }

    // 如果当前玩家是电脑玩家，那么调用电脑玩家的逻辑函数
    if (players[currentPlayer].name === "电脑") {
        computerPlayerLogic();
    }
}

// 锁定骰子
function lockDice() {
    // 获取当前玩家的骰子数组和锁定数组
    let dice = players[currentPlayer].dice;
    let locked = players[currentPlayer].locked;

    // 遍历每个骰子元素，如果被选中了，那么将对应的锁定数组元素设为true
    for (let i = 0; i < diceDiv.children.length; i++) {
        let diceElement = diceDiv.children[i];
        if (diceElement.classList.contains("selected")) {
            locked[i] = true;
        }
    }

    // 更新界面上的信息
    updateUI();

    // 如果当前轮数小于最大轮数，那么显示倍率选择框和确认倍率按钮，否则隐藏它们
    if (roundCount < MAX_ROUNDS + 1) {
        multiplierSelect.style.display = "inline";
        confirmButton.style.display = "inline";
    } else {
        multiplierSelect.style.display = "none";
        confirmButton.style.display = "none";
    }
}

// 投掷骰子
function rollDice() {
    // 获取当前玩家的骰子数组和锁定数组
    let dice = players[currentPlayer].dice;
    let locked = players[currentPlayer].locked;

    // 遍历每个骰子元素，如果没有被锁定，那么随机生成一个1~6之间的整数，并更新骰子数组
    for (let i = 0; i < diceDiv.children.length; i++) {
        let diceElement = diceDiv.children[i];
        if (!locked[i]) {
            let randomNum = Math.floor(Math.random() * 6) + 1;
            dice[i] = randomNum;
            diceElement.textContent = randomNum;
        }
    }

    // 更新界面上的信息
    let str1="<span>"+players[currentPlayer].dice[0]+"</span>"
    let str2="<span>"+players[currentPlayer].dice[1]+"</span>"
    let str3="<span>"+players[currentPlayer].dice[2]+"</span>"
    let str4="<span>"+players[currentPlayer].dice[3]+"</span>"
    let str5="<span>"+players[currentPlayer].dice[4]+"</span>"
    divesDiv.innerHTML += "<p>"+players[currentPlayer].name+"第"+roundCount+"轮"+str1+str2+str3+str4+str5+"</p>";
    updateUI();

    // 如果当前轮数小于最大轮数，那么显示倍率选择框和确认倍率按钮，否则隐藏它们
    if (roundCount < MAX_ROUNDS + 1) {
        multiplierSelect.style.display = "inline";
        confirmButton.style.display = "inline";
    } else {
        multiplierSelect.style.display = "none";
        confirmButton.style.display = "none";
    }
    lockButton.style.display = "inline";
    rollButton.style.display = "none";
}

// 确认倍率
function confirmMultiplier() {
    // 获取用户选择的倍率，并更新当前玩家的倍率属性
    let multiplier = multiplierSelect.value;
    multiplier = parseInt(multiplier);
    players[currentPlayer].multiplier = multiplier;

    // 隐藏倍率选择框和确认倍率按钮
    multiplierSelect.style.display = "none";
    confirmButton.style.display = "none";

    // 切换到下一个玩家
    switchPlayer();
}

// 切换到下一个玩家
function switchPlayer() {
    currentPlayer++; // 增加当前玩家的索引

    // 如果当前玩家的索引等于玩家个数，说明一轮投掷结束了，那么判断是否需要进行下一轮或者计算结果
    if (currentPlayer === playerCount) {
        currentPlayer = 0; // 重置当前玩家的索引为0

        // 如果当前轮数小于最大轮数，那么开始下一轮投掷骰子，否则计算结果
        if (roundCount < MAX_ROUNDS) {
            roundCount++; // 增加当前轮数
            startRound();
        } else {
            roundCount++; // 增加当前轮数
            calculate();
            showResult();
        }
    } else {
        // 否则，更新界面上的信息，并开始当前玩家的投掷骰子
        updateUI();
        startRound();
    }
    lockButton.style.display = "none";
}

// 更新界面上的信息
function updateUI() {
    roundDiv.textContent = "第" + roundCount + "轮"; // 显示当前轮数
    playerDiv.textContent = "当前玩家：" + players[currentPlayer].name; // 显示当前玩家的姓名
    chipsDiv.textContent = "筹码数：" + players[currentPlayer].chips; // 显示当前玩家的筹码数

    // 获取当前玩家的骰子数组和锁定数组
    let dice = players[currentPlayer].dice;
    let locked = players[currentPlayer].locked;

    // 如果骰子数组为空，那么初始化为五个1，并更新锁定数组
    if (dice.length === 0) {
        for (let i = 0; i < MAX_DICE; i++) {
            dice.push(1);
            locked.push(false);
        }
    }

    // 遍历每个骰子元素，根据骰子数组和锁定数组更新它们的内容和样式
    for (let i = 0; i < diceDiv.children.length; i++) {
        let diceElement = diceDiv.children[i];
        diceElement.textContent = dice[i];
        if (locked[i]) {
            diceElement.classList.add("locked");
            diceElement.classList.remove("selected");
        } else {
            diceElement.classList.remove("locked");
        }
    }
}


// 计算所有玩家当前得分
function calculate() {
    for (let player of players) {
        let dice = player.dice; // 获取玩家的骰子数组
        let score = 0; // 初始化玩家的得分为0
        let bonus = 7; // 初始化玩家的奖励类型为7

        // 对骰子数组进行排序，方便判断奖励类型
        dice.sort();

        // 计算骰子的点数总和
        for (let num of dice) {
            score += num;
        }

        // 判断是否有五连，即五个骰子都相同
        if (dice[0] === dice[4]) {
            bonus = 4; // 设置奖励类型为4，对应五连
        } else {
            // 判断是否有四连，即四个骰子相同
            if (dice[0] === dice[3] || dice[1] === dice[4]) {
                bonus = 3; // 设置奖励类型为3，对应四连
            } else {
                // 判断是否有葫芦，即三个骰子相同加一个对子
                if ((dice[0] === dice[2] && dice[3] === dice[4]) || (dice[0] === dice[1] && dice[2] === dice[4])) {
                    bonus = 2; // 设置奖励类型为2，对应葫芦
                } else {
                    // 判断是否有三连，即三个骰子相同
                    if (dice[0] === dice[2] || dice[1] === dice[3] || dice[2] === dice[4]) {
                        bonus = 1; // 设置奖励类型为1，对应三连
                    } else {
                        // 判断是否有双对，即两对一样的骰子
                        if ((dice[0] === dice[1] && dice[2] === dice[3]) || (dice[0] === dice[1] && dice[3] === dice[4]) || (dice[1] === dice[2] && dice[3] === dice[4])) {
                            bonus = 0; // 设置奖励类型为0，对应双对
                        } else {
                            // 判断是否有大顺子，即五个数字连续的骰子
                            if (dice[0] + 1 === dice[1] && dice[1] + 1 === dice[2] && dice[2] + 1 === dice[3] && dice[3] + 1 === dice[4]) {
                                bonus = 6; // 设置奖励类型为6，对应大顺子
                            } else {
                                // 判断是否有小顺子，即四个数字连续的骰子
                                // 考虑23345这种中间有重复的小顺子
                                let dic = dice;
                                for (i = 2; i <= 4; i++) {
                                    if(dic[i] == dic[i-1]){
                                        dic[i] = dic[i + 1]
                                    }
                                }
                                if ((dic[0] + 1 === dic[1] && dic[1] + 1 === dic[2] && dic[2] + 1 === dic[3]) || (dic[1] + 1 === dic[2] && dic[2] + 1 === dic[3] && dic[3] + 1 === dic[4])) {
                                    bonus = 5; // 设置奖励类型为5，对应小顺子
                                }
                            }
                        }
                    }
                }
            }
        }
        player.score = score + BONUS_SCORES[bonus];
    }
}
// 计算总倍率
function calculateMultiplier() {
    // 计算总倍率，即所有玩家的倍率之和
    let totalMultiplier = 1;
    for (let player of players) {
        totalMultiplier += player.multiplier;
    }
    return totalMultiplier;
}
// 显示游戏结果
function showResult() {

    let maxScore = -Infinity; // 初始化最高得分为负无穷
    let maxPlayer = null; // 初始化得分最高的玩家为null

    for (let player of players) {
        if (player.score > maxScore) {
            maxScore = player.score; // 更新最高得分
            maxPlayer = player; // 更新得分最高的玩家
        }
    }
    
    totalMultiplier = calculateMultiplier();
    // 遍历每个玩家，更新他们的筹码数，并判断是否有玩家被击飞或者赢得游戏
    var chipsadd = 0;
    for (let player of players) {
        if (player !== maxPlayer){
            chipsChange = (maxScore - player.score) * totalMultiplier;
            player.chips -= chipsChange;
            // 输家扣筹码
            chipsadd += chipsChange;
        }
    }
    for (let player of players) {
        if (player === maxPlayer){
            // 赢家加筹码
            player.chips += chipsadd;
        }
    }
    for (let player of players) {
        // 如果有玩家的筹码小于等于0，那么设置游戏结束标志为true，并显示结果区域
        if (player.chips <= 0) {
            gameOver = true;
            resultDiv.style.display = "block";
            break;
        }
    }

    // 如果游戏没有结束，那么判断是否还有剩余的局数，如果有，那么开始下一局游戏，否则设置游戏结束标志为true，并显示结果区域
    if (!gameOver) {
        gameCount--; // 减少剩余的局数
        if (gameCount > 0) {
            startGame();
        } else {
            gameOver = true;
            resultDiv.style.display = "block";
        }
    }

    // 如果游戏结束了，那么找出筹码最多的玩家，并显示他们的姓名和筹码数
    if (gameOver) {
        let maxChips = -Infinity; // 初始化最多筹码数为负无穷
        let winners = []; // 初始化赢家数组为空

        for (let player of players) {
            if (player.chips > maxChips) {
                maxChips = player.chips; // 更新最多筹码数
                winners = [player]; // 重置赢家数组为只包含当前玩家
            } else if (player.chips === maxChips) {
                winners.push(player); // 如果有多个玩家筹码相同，那么添加到赢家数组中
            }
        }

        // 显示赢家的姓名和筹码数
        resultDiv.innerHTML = "<h3>游戏结束！</h3>";
        resultDiv.innerHTML += "<p>赢家是：</p >";
        for (let winner of winners) {
            resultDiv.innerHTML += "<p>" + winner.name + "（" + winner.chips + "）</p >";
        }
    }
}