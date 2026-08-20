// --- SISTEMA DE SIMULADOR (JOGAR SUSTENTABILIDADE) ---
let state = { prod: 50, nat: 50, gold: 100, turn: 0 };
const scenarios = [
    {
        text: "O mercado de soja está em alta, mas a área atual é pequena. O que fazer?",
        options: [
            { text: "Expandir área sobre a mata", p: +20, n: -20, g: +10 },
            { text: "Investir em Sementes de Precisão", p: +15, n: 0, g: -40 },
            { text: "Criar Corredor Ecológico", p: 0, n: +20, g: -30 }
        ]
    },
    {
        text: "Uma seca severa foi prevista para o próximo mês!",
        options: [
            { text: "Instalar Irrigação Inteligente", p: +5, n: +5, g: -50 },
            { text: "Extrair mais água do rio local", p: +5, n: -25, g: 0 },
            { text: "Não fazer nada e torcer para dar certo", p: -30, n: 0, g: 0 }
        ]
    },
    {
        text: "Animais silvestres estão cruzando sua lavoura.",
        options: [
            { text: "Cercar tudo com arame", p: +5, n: -10, g: -20 },
            { text: "Implementar Refúgio Biológico", p: -5, n: +30, g: -40 },
            { text: "Ignorar e seguir o trabalho", p: -5, n: 0, g: 0 }
        ]
    }
];

function openGameModal() {
    document.getElementById('game-modal').style.display = 'flex';
    resetSimulator();
}

function closeGameModal() {
    document.getElementById('game-modal').style.display = 'none';
}

function closeGameModalExterno(e) {
    if (e.target.id === 'game-modal') closeGameModal();
}

function updateUI() {
    document.getElementById('prod-val').innerText = state.prod;
    document.getElementById('nat-val').innerText = state.nat;
    document.getElementById('gold-val').innerText = state.gold;

    // Cores dinâmicas
    document.getElementById('nat-val').className = state.nat < 30 ? "text-xl font-game text-red-600" : "text-xl font-game";
    document.getElementById('prod-val').className = state.prod < 30 ? "text-xl font-game text-orange-600" : "text-xl font-game";
}

function playTurn(optIdx) {
    const opt = scenarios[state.turn].options[optIdx];
    state.prod += opt.p;
    state.nat += opt.n;
    state.gold += opt.g;
    state.turn++;

    if (state.turn >= scenarios.length || state.nat <= 0 || state.gold < 0) {
        endGame();
    } else {
        showScenario();
    }
    updateUI();
}

function showScenario() {
    document.getElementById('sim-scenario').innerText = scenarios[state.turn].text;
    const buttons = document.querySelectorAll('#sim-options button');
    scenarios[state.turn].options.forEach((opt, i) => {
        buttons[i].innerText = opt.text;
    });
}

function endGame() {
    document.getElementById('sim-main').classList.add('hidden');
    document.getElementById('sim-result').classList.remove('hidden');

    const title = document.getElementById('sim-title');
    const desc = document.getElementById('sim-desc');
    const icon = document.getElementById('sim-icon');

    if (state.nat >= 60 && state.prod >= 50) {
        icon.innerText = "👑";
        title.innerText = "Herói do Agro Sustentável!";
        desc.innerText = "Você provou que é possível produzir muito respeitando a natureza. Pontuação Máxima!";
        showToast("Mestre da Green Frontier!");
    } else if (state.nat <= 0) {
        icon.innerText = "💀";
        title.innerText = "Desastre Ecológico";
        desc.innerText = "Você focou apenas no lucro e a fazenda entrou em colapso ambiental.";
    } else if (state.gold < 0) {
        icon.innerText = "📉";
        title.innerText = "Falência";
        desc.innerText = "Suas boas intenções não pagaram as contas. Equilibre melhor suas finanças.";
    } else {
        icon.innerText = "🚜";
        title.innerText = "Fazendeiro Aprendiz";
        desc.innerText = "Você sobreviveu, mas ainda há muito o que melhorar no equilíbrio.";
    }
}

function resetSimulator() {
    state = { prod: 50, nat: 50, gold: 100, turn: 0 };
    document.getElementById('sim-main').classList.remove('hidden');
    document.getElementById('sim-result').classList.add('hidden');
    updateUI();
    showScenario();
}

// --- SISTEMA ORIGINAL DE DASHBOARD E MISSÃO RÁPIDA ---

function animateProgress(id, target) {
    const bar = document.getElementById(id);
    if (bar) bar.style.width = target + '%';
}

function gameChoice(type) {
    const container = document.getElementById('game-content');
    if (type === 'good') {
        container.innerHTML = `
                    <div class="animate-bounce text-6xl mb-4">🐞</div>
                    <h4 class="text-2xl font-bold text-green-700 mb-2">Excelente Escolha!</h4>
                    <p class="text-gray-800">O controle biológico mantém o ecossistema saudável e economiza recursos. +100 Pontos Verdes!</p>
                    <button onclick="resetQuickGame()" class="mt-6 text-sm font-bold underline">Outro cenário</button>
                `;
        showToast("Expert em Biotecnologia!");
    } else {
        container.innerHTML = `
                    <div class="text-6xl mb-4">⚠️</div>
                    <h4 class="text-2xl font-bold text-red-700 mb-2">Cuidado, Fazendeiro!</h4>
                    <p class="text-gray-800">Uso sem análise gera resistência e poluição. -50 Pontos.</p>
                    <button onclick="resetQuickGame()" class="mt-6 text-sm font-bold underline">Tentar novamente</button>
                `;
    }
}

function resetQuickGame() {
    document.getElementById('game-content').innerHTML = `
                <p class="text-2xl mb-6 font-bold text-sky-900">O solo está compactado e sem nutrientes. O que você faz?</p>
                <div class="flex flex-col md:flex-row gap-4">
                    <button onclick="gameChoice('bad')" class="btn-game bg-red-500 border-red-700">Adubar com químicos pesados</button>
                    <button onclick="gameChoice('good')" class="btn-game bg-green-600 border-green-800">Plantio Direto e Rotação</button>
                </div>
            `;
}

function unlockMedal() {
    showToast("Protetor da Biosfera Ativado!");
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').innerText = msg;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgress('p1', 70);
            animateProgress('p2', 85);
            animateProgress('p3', 100);
        }
    });
}, { threshold: 0.5 });

window.onload = () => {
    observer.observe(document.getElementById('dados'));
};
