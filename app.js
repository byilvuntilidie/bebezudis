// Estado atual do Tamagotchi
let petState = {
    sabor: 0,
    afeto: 0,
    level: 1
};

// "Banco de dados" dos códigos que você vai entregar fisicamente
const validTokens = {
    "JAPONEZAO": { type: "sabor", amount: 25, message: "A barra de Sabor aumentou!" },
    "CHAMEGO": { type: "afeto", amount: 50, message: "Muito chamego! Afeto subiu!" },
    "PIQUENIQUE": { type: "sabor", amount: 30, message: "Lanchinho bom! Sabor subiu." }
};

// Elementos da UI
const avatarEl = document.getElementById('avatar');
const inputEl = document.getElementById('token-input');
const btnEl = document.getElementById('submit-token');
const messageEl = document.getElementById('message-log');
const saborFill = document.getElementById('sabor-fill');
const afetoFill = document.getElementById('afeto-fill');

// Função principal de atualizar a tela
function updateUI() {
    saborFill.style.width = `${petState.sabor}%`;
    afetoFill.style.width = `${petState.afeto}%`;

    // Lógica de evolução visual do Avatar
    let totalStats = petState.sabor + petState.afeto;
    if (totalStats >= 100 && petState.level < 3) {
        petState.level = 3;
        avatarEl.innerText = "🐉"; // Estágio final
        messageEl.innerText = "Wow! O pet evoluiu para o nível máximo!";
    } else if (totalStats >= 50 && petState.level < 2) {
        petState.level = 2;
        avatarEl.innerText = "🐥"; // Estágio 2
        messageEl.innerText = "O pet evoluiu!";
    }
}

// Lógica de inserir o código
btnEl.addEventListener('click', () => {
    const token = inputEl.value.trim().toUpperCase();
    
    if (validTokens[token]) {
        const reward = validTokens[token];
        
        // Atualiza o estado
        if (reward.type === "sabor") petState.sabor += reward.amount;
        if (reward.type === "afeto") petState.afeto += reward.amount;
        
        // Limita a 100%
        if (petState.sabor > 100) petState.sabor = 100;
        if (petState.afeto > 100) petState.afeto = 100;

        // Feedback visual
        messageEl.innerText = reward.message;
        inputEl.value = "";
        
        // Inutiliza o código para não usar duas vezes (lógica simples no front)
        delete validTokens[token]; 

        updateUI();
    } else {
        messageEl.innerText = "Código inválido ou já utilizado.";
    }
});

// Ação do botão voltar (apenas ilustrativo por enquanto)
document.getElementById('back-btn').addEventListener('click', () => {
    console.log("Voltar ao menu principal");
});

// Inicia a interface
updateUI();
