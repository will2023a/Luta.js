document.addEventListener('DOMContentLoaded', function() {
    const playerHealthSpan = document.querySelector('.player-health');
    const playerAttackSpan = document.querySelector('.player-attack');
    const monsterHealthSpan = document.querySelector('.monster-health');
    const monsterAttackSpan = document.querySelector('.monster-attack');
    const logList = document.querySelector('.log-list');
    const attackPlayerButton = document.querySelector('.attack-player'); // Corrigido o seletor
    const healPlayerButton = document.querySelector('.heal-player');
    const attackMonsterButton = document.querySelector('.attack-monster'); // Corrigido o seletor
    const healMonsterButton = document.querySelector('.heal-monster');

    let playerHealth = 100;
    const playerAttack = 10;
    let monsterHealth = 100;
    const monsterAttack = 10;

    // Função para atualizar a exibição da saúde do jogador e do monstro
    function updateHealthDisplay() {
        playerHealthSpan.textContent = playerHealth;
        monsterHealthSpan.textContent = monsterHealth;

        // Calcula a largura das barras de saúde com base na saúde atual
        const playerHealthPercent = (playerHealth / 100) * 100;
        const monsterHealthPercent = (monsterHealth / 100) * 100;

        // Define a largura das barras de saúde
        document.querySelector('.player-health-bar').style.width = `${playerHealthPercent}%`;
        document.querySelector('.monster-health-bar').style.width = `${monsterHealthPercent}%`;
    }

    // Função para adicionar uma mensagem ao log de batalha
    function addToLog(message) {
        const li = document.createElement('li');
        li.textContent = message;
        logList.appendChild(li);
    }

    // Função para o ataque do jogador
    function playerAttackAction() {
        const damage = Math.floor(Math.random() * playerAttack) + 1;
        monsterHealth -= damage;
        addToLog(`Player attacked Monster for ${damage} damage`);
        if (monsterHealth <= 0) {
            monsterHealth = 0;
            addToLog('Monster was defeated!');
            attackMonsterButton.disabled = true;
            displayWinner("Player");
        }
        updateHealthDisplay();
    }

    // Função para a cura do jogador
    function healPlayerAction() {
        const healAmount = 10;
        // Verifica se a saúde do jogador não está no máximo (100)
        if (playerHealth < 100) {
            playerHealth += healAmount;
            addToLog(`${player} healed for ${healAmount} health`);
            updateHealthDisplay();
        } else {
            addToLog(`${player} is already at full health!`);
        }
    }

    // Função para o ataque do monstro
    function monsterAttackAction() {
        const damage = Math.floor(Math.random() * monsterAttack) + 1;
        playerHealth -= damage;
        addToLog(`Monster attacked Player for ${damage} damage`);
        if (playerHealth <= 0) {
            playerHealth = 0;
            addToLog('Player was defeated!');
            attackPlayerButton.disabled = true;
            healPlayerButton.disabled = true; // Desativa o botão de cura do jogador
            displayWinner("Monster");
        }
        updateHealthDisplay();
    }

    // Função para a cura do monstro
    function healMonsterAction() {
        const healAmount = 10;
        if (monsterHealth < 100) {
            monsterHealth += healAmount;
            addToLog(`Monster healed for ${healAmount} health`);
            updateHealthDisplay();
        } else {
            addToLog('Monster is already at full health!');
        }
    }

       // Função para exibir o vencedor
       function displayWinner(winner) {
        const winnerMessage = document.createElement('div');
        winnerMessage.textContent = `${winner} wins!`;
        winnerMessage.style.fontSize = '24px';
        winnerMessage.style.fontWeight = 'bold';
        winnerMessage.style.color = 'white';
        winnerMessage.style.backgroundColor = 'black';
        winnerMessage.style.padding = '20px';
        winnerMessage.style.position = 'absolute';
        winnerMessage.style.top = '50%';
        winnerMessage.style.left = '50%';
        winnerMessage.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(winnerMessage);
    }

    // Adiciona event listeners para os botões de ataque e cura
    attackPlayerButton.addEventListener('click', playerAttackAction);
    healPlayerButton.addEventListener('click', healPlayerAction);
    attackMonsterButton.addEventListener('click', monsterAttackAction);
    healMonsterButton.addEventListener('click', healMonsterAction);

    // Inicializa a exibição da saúde
    updateHealthDisplay();
});

function goBack() {
    window.history.back();
}