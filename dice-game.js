// 定义一些常量和变量
const MAX_ROUNDS = 3; // 每局游戏的最大轮数
const MAX_DICE = 5; // 每个玩家的骰子数
const MAX_PLAYERS = 4; // 最大玩家数
const MIN_PLAYERS = 2; // 最小玩家数
const INITIAL_CHIPS = 100; // 每个玩家初始的筹码数
const BONUS_SCORES = [10, 10, 20, 40, 100, 30, 60, 0]; // 奖励分数
const BONUS_NAMES = ["双对", "三连", "葫芦", "四连", "五连", "小顺子", "大顺子"]; // 奖励名称
const bgmEl = document.getElementById('bgm'); //bgm

let arr=["<img src=photo/image2.jpg>","<img src=photo/image3.jpg>","<img src=photo/image4.jpg>","<img src=photo/image5.jpg>","<img src=photo/image6.jpg>","<img src=photo/image7.jpg>"];

let gameMode = ""; // 游戏模式，可以是"单人"或"多人"
let gameCount = 0; // 游戏局数
let currentgameCount = 1; // 当前游戏局数
let roundCount = 0; // 当前局的轮数
let playerCount = 0; // 玩家个数
let currentPlayer = 0; // 当前玩家的索引，从0开始
let players = []; // 玩家数组，每个元素是一个对象，包含name, chips, dice, locked, score, bonus, multiplier，isAi等属性
let totalMultiplier = 0; //总倍率，初始为0
let gameOver = false; // 游戏是否结束的标志
let player1name = "";
let player2name = "";
let player3name = "";
let player4name = "";



// 定义一些DOM元素的引用，方便操作

let player1Input = document.getElementById("play1-input");
let player2Input = document.getElementById("play2-input");
let player3Input = document.getElementById("play3-input");
let player4Input = document.getElementById("play4-input");
let countInput = document.getElementById("count-input"); // 游戏局数输入框
let chipsInput = document.getElementById("chips-input"); // 玩家筹码输入框
let startButton = document.getElementById("start-button"); // 开始游戏按钮
let topDiv = document.getElementById("topdata-div"); // 游戏上方区域的div元素
let gameDiv = document.getElementById("game-div"); // 游戏区域的div元素
let currentgameCountDiv = document.getElementById("gamecount-div"); // 当前局数的div元素
let roundDiv = document.getElementById("round-div"); // 当前轮数的div元素
let playerDiv = document.getElementById("player-div"); // 当前玩家的div元素
let chipsDiv = document.getElementById("chips-div"); // 当前玩家的筹码div元素
let diceDiv = document.getElementById("dice-div"); // 当前玩家的骰子div元素
let MagnificationsDiv = document.getElementById("Magnifications-div"); // 当前倍率
let lockButton = document.getElementById("lock-button"); // 锁定骰子按钮
let rollButton = document.getElementById("roll-button"); // 投掷骰子按钮
let nextButton = document.getElementById("next-button"); // 下一位玩家按钮
let multiplierSelect1 = 0;
let multiplierSelect2 = 0;
let multiplierSelect3 = 0;
let multiplierSelect4 = 0;
let use1 = document.getElementById("player-1"); // 玩家1操作区域
let use2 = document.getElementById("player-2"); // 玩家2操作区域
let use3 = document.getElementById("player-3"); // 玩家3操作区域
let use4 = document.getElementById("player-4"); // 玩家4操作区域
let name1 = document.getElementById("name1"); // 玩家1的姓名
let chips1 = document.getElementById("chips1"); // 玩家1的筹码
let isaiButton1 = document.getElementById("isai-button1"); // 玩家1托管按钮
let noaiButton1 = document.getElementById("noai-button1"); // 玩家1取消托管按钮
let dives1 = document.getElementById("dives1"); // 玩家1的存储骰子区域
let name2 = document.getElementById("name2"); // 玩家2的姓名
let chips2 = document.getElementById("chips2"); // 玩家2的筹码
let isaiButton2 = document.getElementById("isai-button2"); // 玩家2托管按钮
let noaiButton2 = document.getElementById("noai-button2"); // 玩家2取消托管按钮
let dives2 = document.getElementById("dives2"); // 玩家2的存储骰子区域
let name3 = document.getElementById("name3"); // 玩家3的姓名
let chips3 = document.getElementById("chips3"); // 玩家3的筹码
let isaiButton3 = document.getElementById("isai-button3"); // 玩家3托管按钮
let noaiButton3 = document.getElementById("noai-button3"); // 玩家3取消托管按钮
let dives3 = document.getElementById("dives3"); // 玩家3的存储骰子区域
let name4 = document.getElementById("name4"); // 玩家4的姓名
let chips4 = document.getElementById("chips4"); // 玩家4的筹码
let isaiButton4 = document.getElementById("isai-button4"); // 玩家4托管按钮
let noaiButton4 = document.getElementById("noai-button4"); // 玩家4取消托管按钮
let dives4 = document.getElementById("dives4"); // 玩家4的存储骰子区域
let confirmButton = document.getElementById("confirm-button"); // 确认倍率按钮
let resultDiv = document.getElementById("result-div"); // 结果区域的div元素
let play2Style = document.getElementById("play2-style");
let play3Style = document.getElementById("play3-style");
let play4Style = document.getElementById("play4-style");

//这是界面切换
let settingDiv = document.getElementById("setting-div");
let sceneStartgame = document.getElementById("scene-startgame"); // 开始游戏的界面
let sceneGamerule = document.getElementById("scene-gamerule"); // 规则介绍的界面
let rule = document.getElementById("rule"); // 规则介绍
let understand = document.getElementById("understand"); // 进入游戏设置按钮 
let singlePlayers = document.getElementById("singlePlayers"); // 规则介绍
let twoPlayers = document.getElementById("twoPlayers"); // 规则介绍
let threePlayers = document.getElementById("threePlayers"); // 规则介绍
let fourPlayers = document.getElementById("fourPlayers"); // 规则介绍

//倍率选择按钮
let player10 = document.getElementById("1-0");
let player11 = document.getElementById("1-1");
let player12 = document.getElementById("1-2");
let player13 = document.getElementById("1-3");
let player20 = document.getElementById("2-0");
let player21 = document.getElementById("2-1");
let player22 = document.getElementById("2-2");
let player23 = document.getElementById("2-3");
let player30 = document.getElementById("3-0");
let player31 = document.getElementById("3-1");
let player32 = document.getElementById("3-2");
let player33 = document.getElementById("3-3");
let player40 = document.getElementById("4-0");
let player41 = document.getElementById("4-1");
let player42 = document.getElementById("4-2");
let player43 = document.getElementById("4-3");

player10.addEventListener("click", function() {
    multiplierSelect1 = 0;
});
player11.addEventListener("click", function() {
    multiplierSelect1 = 1;
});
player12.addEventListener("click", function() {
    multiplierSelect1 = 2;
});
player13.addEventListener("click", function() {
    multiplierSelect1 = 3;
});

player20.addEventListener("click", function() {
    multiplierSelect2 = 0;
});
player21.addEventListener("click", function() {
    multiplierSelect2 = 1;
});
player22.addEventListener("click", function() {
    multiplierSelect2 = 2;
});
player23.addEventListener("click", function() {
    multiplierSelect2 = 3;
});

player30.addEventListener("click", function() {
    multiplierSelect3 = 0;
});
player31.addEventListener("click", function() {
    multiplierSelect3 = 1;
});
player32.addEventListener("click", function() {
    multiplierSelect3 = 2;
});
player33.addEventListener("click", function() {
    multiplierSelect3 = 3;
});

player40.addEventListener("click", function() {
    multiplierSelect4 = 0;
});
player41.addEventListener("click", function() {
    multiplierSelect4 = 1;
});
player42.addEventListener("click", function() {
    multiplierSelect4 = 2;
});
player43.addEventListener("click", function() {
    multiplierSelect4 = 3;
});

let bgmStarted = false;
const startPlayBGM = () => {
  if (bgmStarted) return;
  bgmStarted = true;
  bgmEl.play();
  document.body.removeEventListener('click', startPlayBGM);
  window.removeEventListener('keydown', startPlayBGM);
};

document.body.addEventListener('click', startPlayBGM);
window.addEventListener('keydown', startPlayBGM);
// 给开始游戏按钮添加点击事件，用来切换到游戏规则介绍场景
rule.addEventListener("click", function() {
    // 隐藏开始界面
    sceneStartgame.style.display = "none";
    // 显示游戏规则介绍
    sceneGamerule.style.display = "flex";
});

// 给返回按钮添加点击事件，用来切换到初始界面场景
understand.addEventListener("click", function() {
    // 隐藏游戏规则介绍
    sceneGamerule.style.display = "none";
    // 返回开始界面
    sceneStartgame.style.display = "flex";
});

// 点击单人玩家（电脑作战）按钮，切换到游戏开始界面，并设置好玩家数量
singlePlayers.addEventListener("click",function() {
    // 隐藏开始界面
    sceneStartgame.style.display = "none";
    // 进入游戏界面
    settingDiv.style.display = "flex";
    playerCount = 2; // 设置玩家数为2
    gameMode = "单人";
});

// 点击双人对战按钮，切换到游戏开始界面，并设置好玩家数量
twoPlayers.addEventListener("click",function() {
    // 隐藏开始界面
    sceneStartgame.style.display = "none";
    // 进入游戏界面
    settingDiv.style.display = "flex";
    playerCount = 2; // 设置玩家数为2
    play2Style.style.display = "flex";
});

// 点击三人对战按钮，切换到游戏开始界面，并设置好玩家数量
threePlayers.addEventListener("click",function() {
    // 隐藏开始界面
    sceneStartgame.style.display = "none";
    // 进入游戏界面
    settingDiv.style.display = "flex";
    playerCount = 3; // 设置玩家数为3
    play2Style.style.display = "flex";
    play3Style.style.display = "flex";
});

// 点击四人对战按钮，切换到游戏开始界面，并设置好玩家数量
fourPlayers.addEventListener("click",function() {
    // 隐藏开始界面
    sceneStartgame.style.display = "none";
    // 进入游戏界面
    settingDiv.style.display = "flex";
    playerCount = 4; // 设置玩家数为4
    player3Input.style.display = "inline";
    player4Input.style.display = "inline";
    play2Style.style.display = "flex";
    play3Style.style.display = "flex";
    play4Style.style.display = "flex";
});


startButton.addEventListener("click", function() {
    gameCount = countInput.value; // 获取用户输入的游戏局数
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

    player1name = player1Input.value; // 获取玩家1姓名
    if (gameMode!=="单人"){
        if(playerCount>=2){
            player2name = player2Input.value;
        }
        if(playerCount>=3){
            player3name = player3Input.value;
        }
        if(playerCount>=4){
            player4name = player4Input.value;
        }
    }

    initGame(initialChips,player1name,player2name,player3name,player4name); // 初始化游戏
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

nextButton.addEventListener("click", function() {
    switchPlayer(); // 下一位玩家
});

isaiButton1.addEventListener("click", function() {            //玩家1的托管按钮
    if(gameOver){
        window.alert("已经结束嘞！");
        return;
    }
    players[0].isAi = 1;
    isaiButton1.style.display = "none";
    noaiButton1.style.display = "flex";
    if(currentPlayer == 0){
        if(rollButton.style.display == "flex"){             //区分投掷前投掷后托管
            rollDice();
        }
        computerPlayerLogic();
        updateUI();
        switchPlayer();
    }
});

noaiButton1.addEventListener("click", function() {            //玩家1的取消托管按钮
    players[0].isAi = 0;
    noaiButton1.style.display = "none";
    isaiButton1.style.display = "flex";
});

isaiButton2.addEventListener("click", function() {            //玩家2的托管按钮
    if(gameOver){
        window.alert("已经结束嘞！");
        return;
    }
    if(players[1].name == "电脑"){
        window.alert("你点这个干嘛?");
        return;
    }
    players[1].isAi = 1;
    isaiButton2.style.display = "none";
    noaiButton2.style.display = "flex";
    if(currentPlayer == 1){
        if(rollButton.style.display == "flex"){             //区分投掷前投掷后托管
            rollDice();
        }
        computerPlayerLogic();
        updateUI();
        switchPlayer();
    }
});

noaiButton2.addEventListener("click", function() {            //玩家2的取消托管按钮
    players[1].isAi = 0;
    noaiButton2.style.display = "none";
    isaiButton2.style.display = "flex";
});

isaiButton3.addEventListener("click", function() {            //玩家3的托管按钮
    if(gameOver){
        window.alert("已经结束嘞！");
        return;
    }
    players[2].isAi = 1;
    isaiButton3.style.display = "none";
    noaiButton3.style.display = "flex";
    if(currentPlayer == 2){
        if(rollButton.style.display == "flex"){             //区分投掷前投掷后托管
            rollDice();
        }
        computerPlayerLogic();
        updateUI();
        switchPlayer();
    }
});

noaiButton3.addEventListener("click", function() {            //玩家3的取消托管按钮
    players[2].isAi = 0;
    noaiButton3.style.display = "none";
    isaiButton3.style.display = "flex";
});

isaiButton4.addEventListener("click", function() {            //玩家4的托管按钮
    if(gameOver){
        window.alert("已经结束嘞！");
        return;
    }
    players[3].isAi = 1;
    isaiButton4.style.display = "none";
    noaiButton4.style.display = "flex";
    if(currentPlayer == 3){
        if(rollButton.style.display == "flex"){             //区分投掷前投掷后托管
            rollDice();
        }
        computerPlayerLogic();
        updateUI();
        switchPlayer();
    }
});

noaiButton4.addEventListener("click", function() {            //玩家4的取消托管按钮
    players[3].isAi = 0;
    noaiButton4.style.display = "none";
    isaiButton4.style.display = "flex";
});


// 初始化游戏
function initGame(initialChips,player1name,player2name,player3name,player4name) {
    // 隐藏游戏设置区域，显示游戏区域
    document.getElementById("setting-div").style.display = "none";
    topDiv.style.display = "block";
    gameDiv.style.display = "block";
    use1.style.display = "block";
    use2.style.display = "block";
    if (playerCount >=3 ){
        use3.style.display = "block";
    }
    if (playerCount ==4 ){
        use4.style.display = "block";
    }

    // 初始化玩家数组
    players = [];
    for (let i = 0; i < playerCount; i++) {
        let player = {}; // 创建一个玩家对象
        if (gameMode === "单人" && i === 1) {
            player.name = "电脑"; // 单人模式下，第二个玩家是电脑
            player.isAi = 1; // 是由电脑控制的
        } else if(i === 0){
            player.isAi = 0;
            player.name = player1name; // 获取用户输入的玩家1姓名
        } else if(gameMode !=="单人" && i === 1){
            player.isAi = 0;
            player.name = player2name; // 获取用户输入的玩家2姓名
        } else if(gameMode !=="单人" && i === 2){
            player.isAi = 0;
            player.name = player3name; // 获取用户输入的玩家3姓名
        } else if(gameMode !== "单人" && i === 3){
            player.isAi = 0;
            player.name = player4name; // 获取用户输入的玩家4姓名
        } 
        player.chips = initialChips; // 设置玩家的初始筹码数
        player.dice = []; // 设置玩家的骰子数组，初始为空
        player.locked = []; // 设置玩家的锁定数组，初始为空，用来记录哪些骰子被锁定了
        player.score = 0; // 设置玩家的得分，初始为0
        player.bonus = -1; // 设置玩家的奖励类型，初始为-1，表示没有奖励
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
    totalMultiplier = 1; //设置当前倍率为1
    name1.innerHTML = "<strong1>姓名：" + players[0].name +"</strong1>"; // 显示玩家1的姓名
    chips1.innerHTML = "<strong1>筹码数：" + players[0].chips+"</strong1>"; // 显示并更新玩家1的筹码数
    name2.innerHTML = "<strong1>姓名：" + players[1].name+"</strong1>"; // 显示玩家2的姓名
    chips2.innerHTML = "<strong1>筹码数：" + players[1].chips+"</strong1>"; // 显示并更新玩家2的筹码数
    if(playerCount >= 3){
        name3.innerHTML = "<strong1>姓名：" + players[2].name+"</strong1>"; // 显示玩家3的姓名
        chips3.innerHTML = "<strong1>筹码数：" + players[2].chips+"</strong1>"; // 显示并更新玩家3的筹码数
    }
    if(playerCount == 4){
        name4.innerHTML = "<strong1>姓名：" + players[3].name+"</strong1>"; // 显示玩家4的姓名
        chips4.innerHTML = "<strong1>筹码数：" + players[3].chips+"</strong1>"; // 显示并更新玩家4的筹码数
    }
    // 遍历每个玩家，重置他们的骰子数组，锁定数组，得分，奖励类型和倍率
    for (let player of players) {
        player.dice = [];
        player.locked = [];
        player.score = 0;
        player.bonus = -1;
    }

    // 更新界面上的信息
    updateUI();

    // 开始第一轮投掷骰子
    startRound();
    lockButton.style.display = "none";       //游戏开始时隐藏锁定按钮和下一位玩家按钮
    nextButton.style.display = "none";
}

// 开始新一个玩家回合
function startRound() {

    // 更新界面上的信息
    updateUI();
    lockButton.style.display = "none";
    rollButton.style.display = ("flex");

    // 如果当前玩家是电脑玩家，那么调用电脑玩家的逻辑函数
    if (players[currentPlayer].isAi === 1) {
        rollDice();
        computerPlayerLogic();
        updateUI();
        switchPlayer();
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

    // 对骰子数组进行排序，方便判断奖励类型
    for (i = 0; i < 4;i ++)//size-1是因为不用与自己比较，所以比的数就少一个
	{
		var count = 0;
		for (j = 0; j < 4 - i; j++)	//size-1-i是因为每一趟就会少一个数比较
		{
			if (dice[j] > dice[j+1])//这是升序排法，前一个数和后一个数比较，如果前数大则与后一个数换位置
			{
				tem = dice[j];
                tem0 = locked[j];
				dice[j] = dice[j+1];
				dice[j+1] = tem;
                locked[j] = locked[j+1];
                locked[j+1] = tem0;
				count = 1;
				
			}
		}
		if (count == 0)			//如果某一趟没有交换位置，则说明已经排好序，直接退出循环
				break;	
	}

    if(roundCount == 3){
        locked[0]=true;
        locked[1]=true;
        locked[2]=true;
        locked[3]=true;
        locked[4]=true;
    }

    updateUI();
    if(roundCount != 3){
        lockButton.style.display = "flex";      //显示锁定骰子按钮
    }
    if (currentPlayer !== playerCount - 1) {
        nextButton.style.display = "flex";      //显示下一位玩家按钮
    } else{
        confirmButton.style.display = "flex";
    }
    rollButton.style.display = "none";      //隐藏投掷骰子按钮
}

// 确认倍率
function confirmMultiplier() {
    // 获取所有用户选择的倍率，并更新当前总倍率
    if(roundCount == 3){
        multiplierSelect1 = 0;
        multiplierSelect2 = 0;
        multiplierSelect3 = 0;
        multiplierSelect4 = 0;
    }
    
    if (players[0].isAi === 0){
        players[0].multiplier = multiplierSelect1;
    }
    if (players[1].isAi === 0){
        players[1].multiplier = multiplierSelect2;
    }
    if (playerCount >= 3){
        if (players[2].isAi === 0){
            players[2].multiplier = multiplierSelect3;
        }
    }
    if (playerCount === 4){
        if (players[3].isAi === 0){
            players[3].multiplier = multiplierSelect4;
        }
    }
    currentPlayer = playerCount - 1;       //防bug用的
    console.log(currentPlayer);
    Computer_choose();
    let multiplier = 0;
    for (let player of players){
        
        multiplier += parseInt(player.multiplier);
    }

    totalMultiplier += multiplier;
    //确认倍率按钮
    confirmButton.style.display = "none";
    switchPlayer();
    currentPlayer = 0; // 重置当前玩家的索引为0
    if (roundCount < MAX_ROUNDS) {
        roundCount++; // 增加当前轮数
        startRound();
    } else {
        lockButton.style.display = "none";
        calculate();
        showResult();
    }
}

// 切换到下一个玩家
function switchPlayer() {
    // 更新骰子存储区域上的信息
    if(players[currentPlayer].locked[0] == true){
        var str1="<span>"+players[currentPlayer].dice[0]+"</span>";
    }
    else{
        var str1='<span>?</span>';
    }
    if(players[currentPlayer].locked[1] == true){
        var str2="<span>"+players[currentPlayer].dice[1]+"</span>";
    }
    else{
        var str2='<span>?</span>';
    }
    if(players[currentPlayer].locked[2] == true){
        var str3="<span>"+players[currentPlayer].dice[2]+"</span>";
    }
    else{
        var str3='<span>?</span>';
    }
    if(players[currentPlayer].locked[3] == true){
        var str4="<span>"+players[currentPlayer].dice[3]+"</span>";
    }
    else{
        var str4='<span>?</span>';
    }
    if(players[currentPlayer].locked[4] == true){
        var str5="<span>"+players[currentPlayer].dice[4]+"</span>";
    }
    else{
        var str5='<span>?</span>';
    }

    if(currentPlayer == 0){
        dives1.innerHTML = "<p>"+str1+str2+str3+str4+str5+"</p>";
    }
    if(currentPlayer == 1){
        dives2.innerHTML = "<p>"+str1+str2+str3+str4+str5+"</p>";
    }
    if(currentPlayer == 2){
        dives3.innerHTML = "<p>"+str1+str2+str3+str4+str5+"</p>";
    }
    if(currentPlayer == 3){
        dives4.innerHTML = "<p>"+str1+str2+str3+str4+str5+"</p>";
    }

    currentPlayer++; // 增加当前玩家的索引
    // 如果当前玩家的索引等于玩家个数，说明一轮投掷结束了，未结束时更新UI并开启下一轮投掷
    if (currentPlayer !== playerCount) {
        updateUI();
        startRound();
    } 
    lockButton.style.display = "none";
    nextButton.style.display = "none";
}

// 更新界面上的信息，使锁定的骰子变为绿色，更新
function updateUI() {
    currentgameCountDiv.innerHTML = "<strong1>第" + currentgameCount + "局</strong1>"; // 显示当前局数
    roundDiv.innerHTML = "<strong1>第" + roundCount + "轮</strong1>"; // 显示当前轮数
    playerDiv.innerHTML = "<strong1>当前玩家：" + players[currentPlayer].name + "</strong1>"; // 显示当前玩家的姓名
    chipsDiv.innerHTML = "<strong1>筹码数：" + players[currentPlayer].chips + "</strong1>"; // 显示当前玩家的筹码数
    MagnificationsDiv.innerHTML = "<strong1>当前倍率：" + totalMultiplier + "</strong1>";

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
        diceElement.innerHTML = arr[dice[i]-1];
        //document.write(arr[dice[i]]);
        if (locked[i]) {
            diceElement.classList.add("locked");
            diceElement.classList.remove("selected");
        } else {
            diceElement.classList.remove("locked");
        }
    }
}

// 计算所有玩家的得分
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
                                for (let i = 0; i < 2; i++) {
                                    if (dice[i] + 1 === dice[i + 1] && dice[i + 1] + 1 === dice[i + 2] && dice[i + 2] + 1 === dice[i + 3]) {
                                        bonus = 5; // 设置奖励类型为5，对应小顺子
                                    }
                                }
                                if(dice[0]+1 == dice[1] && dice[1]+1 == dice[3] && dice[3]+1 == dice[4]){
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

    chips1.innerHTML = "<strong1>筹码数：" + players[0].chips + "</strong1>"; // 显示并更新玩家1的筹码数
    chips2.innerHTML = "<strong1>筹码数：" + players[1].chips + "</strong1>"; // 显示并更新玩家2的筹码数
    if(playerCount >= 3){
        chips3.innerHTML = "<strong1>筹码数：" + players[2].chips + "</strong1>"; // 显示并更新玩家3的筹码数
    }
    if(playerCount == 4){
        chips4.innerHTML = "<strong1>筹码数：" + players[3].chips + "</strong1>"; // 显示并更新玩家4的筹码数
    }

    // 如果游戏没有结束，那么判断是否还有剩余的局数，如果有，那么开始下一局游戏，否则设置游戏结束标志为true，并显示结果区域
    if (!gameOver) {
        gameCount--; // 减少剩余的局数
        currentgameCount++;
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