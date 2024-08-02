let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Палка"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    { name: 'Палка', power: 5 },
    { name: 'Кинжал', power: 30 },
    { name: 'Молот', power: 50 },
    { name: 'Меч', power: 100 }
];
const monsters = [
    {
    name: "Слизняк",
    level: 2,
    health: 15
    },
    {
    name: "Зубастый зверь",
    level: 8,
    health: 60
    },
    {
    name: "Дракон",
    level: 20,
    health: 300
    }
]
    const locations = [
    {
    name: "town square",
    "button text": ["Пойти на рынок", "Пойти в пещеру", "Сразиться с драконом"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Вы находитесь на городской площади. Вы видете знак, на котором написано \"Рынок\"."
    },
    {
    name: "store",
    "button text": ["Купить 10 здоровья (10 золота)", "Купить оружие(30 золота)", "Пойти на городскую площадь"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Вы вошли на рынок."
    },
    {
    name: "cave",
    "button text": ["Сразиться с слизняком", "Сразиться с зубастым зверем", "Перейти на городскую площадь"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Вы вошли в пещеру.Вы видете монстров."
    },
    {
    name: "fight",
    "button text": ["Атаковать", "Уклонитсь", "Убежать"],
    "button functions": [attack, dodge, goTown],
    text: "Вы сражаетесь с монстром."
    },
    {
    name: "kill monster",
    "button text": ["Пойти на городскую площадь", "Пойти на городскую площадь", "Пойти на городскую площадь"],
    "button functions": [goTown, goTown, goTown],
    text: 'Монстр кричит "Арр" и умирает. Вы получаете опыт и собираете золото.'
    },
    {
    name: "lose",
    "button text": ["Сыграть снова?", "Сыграть снова?", "Сыграть снова?"],
    "button functions": [restart, restart, restart],
    text: "Вы умерли. &#x2620;"
    },
    { 
    name: "win", 
    "button text": ["Сыграть снова?", "Сыграть снова?", "Сыграть снова?"], 
    "button functions": [restart, restart, restart], 
    text: "Вы победили дракона! ВЫ ПРОШЛИ ИГРУ! &#x1F389;" 
    },
    {
    name: "easter egg",
    "button text": ["2", "8", "Пойти на городскую площадьGo to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "ВЫ нашли секретную игру.Выберете число выше. !0 чисел будут выбраны случайным образом между 0 и 10. Если выбранное вами число входит в диапазон случайных чисели вы победили!"
    }
];

// initialize buttons
button1.onclick = goStore
button2.onclick = goCave
button3.onclick = fightDragon

function update(location) {
	monsterStats.style.display = 'none'
	button1.innerText = location['button text'][0]
	button2.innerText = location['button text'][1]
	button3.innerText = location['button text'][2]
	button1.onclick = location['button functions'][0]
	button2.onclick = location['button functions'][1]
	button3.onclick = location['button functions'][2]
	text.innerHTML = location.text
}

function goTown() {
	update(locations[0])
}

function goStore() {
	update(locations[1])
}

function goCave() {
	update(locations[2])
}

function buyHealth() {
	if (gold >= 10) {
		gold -= 10
		health += 10
		goldText.innerText = gold
		healthText.innerText = health
	} else {
		text.innerText = 'У вас недостаточно золота чтобы купить зоровье.'
	}
}

function buyWeapon() {
	if (currentWeapon < weapons.length - 1) {
		if (gold >= 30) {
			gold -= 30
			currentWeapon++
			goldText.innerText = gold
			let newWeapon = weapons[currentWeapon].name
			text.innerText = 'У вас есть ' + newWeapon + '.'
			inventory.push(newWeapon)
			text.innerText += ' У вашем инвинтаре имеется ' + inventory
		} else {
			text.innerText = 'У вас недостаточно золота чтобы купить оружие.'
		}
	} else {
		text.innerText = 'У вас уже есть самое мощное оружие!'
		button2.innerText = 'Продать оружие за 15 золота.'
		button2.onclick = sellWeapon
	}
}

function sellWeapon() {
	if (inventory.length > 1) {
		gold += 15
		goldText.innerText = gold
		let currentWeapon = inventory.shift()
		text.innerText = 'Вы продали ' + currentWeapon + '.'
		text.innerText += ' У вашем инвинтаре имеется ' + inventory
	} else {
		text.innerText = "Нельзя продать ваше единственное оружие!"
	}
}

function fightSlime() {
	fighting = 0
	goFight()
}

function fightBeast() {
	fighting = 1
	goFight()
}

function fightDragon() {
	fighting = 2
	goFight()
}

function goFight() {
	update(locations[3])
	monsterHealth = monsters[fighting].health
	monsterStats.style.display = 'block'
	monsterName.innerText = monsters[fighting].name
	monsterHealthText.innerText = monsterHealth
}

function attack() {
	text.innerText = monsters[fighting].name + ' атакует'
	text.innerText +=
		' Вы атакуете вашим ' + weapons[currentWeapon].name + '.'
	health -= getMonsterAttackValue(monsters[fighting].level)
	if (isMonsterHit()) {
		monsterHealth -=
			weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1
	} else {
		text.innerText += ' Вы промазали.'
	}
	healthText.innerText = health
	monsterHealthText.innerText = monsterHealth
	if (health <= 0) {
		lose()
	} else if (monsterHealth <= 0) {
		if (fighting === 2) {
			winGame()
		} else {
			defeatMonster()
		}
	}
	if (Math.random() <= 0.1 && inventory.length !== 1) {
		text.innerText += ' Ваш ' + inventory.pop() + ' Сломался.'
		currentWeapon--
	}
}

function getMonsterAttackValue(level) {
	const hit = level * 5 - Math.floor(Math.random() * xp)
	console.log(hit)
	return hit > 0 ? hit : 0
}

function isMonsterHit() {
	return Math.random() > 0.2 || health < 20
}

function dodge() {
	text.innerText = 'Вы уклонились от атаки ' + monsters[fighting].name
}

function defeatMonster() {
	gold += Math.floor(monsters[fighting].level * 6.7)
	xp += monsters[fighting].level
	goldText.innerText = gold
	xpText.innerText = xp
	update(locations[4])
}

function lose() {
	update(locations[5])
}

function winGame() {
	update(locations[6])
}

function restart() {
	xp = 0
	health = 100
	gold = 50
	currentWeapon = 0
	inventory = ['Палка']
	goldText.innerText = gold
	healthText.innerText = health
	xpText.innerText = xp
	goTown()
}

function easterEgg() {
	update(locations[7])
}

function pickTwo() {
	pick(2)
}

function pickEight() {
	pick(8)
}

function pick(guess) {
	const numbers = []
	while (numbers.length < 10) {
		numbers.push(Math.floor(Math.random() * 11))
	}
	text.innerText = 'Вы подобрали ' + guess + '. Случайное число:\n'
	for (let i = 0; i < 10; i++) {
		text.innerText += numbers[i] + '\n'
	}
	if (numbers.includes(guess)) {
		text.innerText += 'Правильно! Вы выиграли 20 золота!'
		gold += 20
		goldText.innerText = gold
	} else {
		text.innerText += 'Не правильно! Вы потеряли 20 здоровья!'
		health -= 10
		healthText.innerText = health
		if (health <= 0) {
			lose()
		}
	}
}
