let health = document.getElementById('health');
let cash = document.getElementById('cash');
let healthBar = document.getElementById('health-bar');
let healthValue = document.getElementById('health-value');
let suspectBlock = document.getElementById('suspect-block');
let armorBar = document.getElementById('armorbar');



cef.emit("game:hud:setComponentVisible", "interface", false);
cef.emit("game:data:pollPlayerStats", true, 50);




cef.on("game:data:playerStats", (hp, maxHp, arm, breath, wanted, weapon, ammo, max_ammo, money, speed, maxArm) => {


    cef.emit('updategame_sa'); //отправляем событие в игру 

    cash.innerHTML = divideNumberByPieces(money, "");

    updateHealthBar(hp, maxHp);
    updateArmorBar(arm, maxArm);


    if (wanted > 0) {
        suspectBlock.style.opacity = 1;
        document.getElementById('wanted-level').textContent = wanted;
    } else {
        suspectBlock.style.opacity = 0;
    }
    

    function divideNumberByPieces(x, delimiter) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
    }

    function updateHealthBar(currentHp, maxHp) {
        const percent = currentHp / maxHp * 100;
        const offset = (100 - percent) / 100 * 141.372;
        healthBar.style.setProperty('--dashoffset', offset);
        healthValue.textContent = `${Math.round(currentHp)}`;
    }

    function updateArmorBar(currentArmor, maxArmor) { 
        const percent = currentArmor / maxHp * 100;
        const offset = (100 - percent) / 100 * 141.372;
        armorBar.style.setProperty('--dashoffset', offset);
        document.getElementById('armor-value').textContent = `${Math.round(currentArmor)}`;
    } 

    document.getElementById('ammo').src = "./assets/weapons/" + weapon +".png";
    document.getElementById('weapon').textContent = ammo;
    document.getElementById('max-weapon').textContent = max_ammo;

});
cef.on("update_sa", (s1, s2, s3, s4, s5) => {


    updateBurgerBar(s5,100);

    document.getElementById("online").innerText = s1;
    document.getElementById("playerid").innerText = s2;
    document.getElementById("xpayday").innerText = `X${s3}`;
    document.getElementById("server").innerText = `${s4}`;

    function updateBurgerBar(currentBurger, maxBurger) { 
    const percent = currentBurger / maxBurger * 100;
    const offset = (100 - percent) / 100 * 141.372;
    document.getElementById('eda-bar').style.setProperty('--dashoffset', offset);
    document.getElementById('eda-value').textContent = `${Math.round(currentBurger)}`;
    } 
});