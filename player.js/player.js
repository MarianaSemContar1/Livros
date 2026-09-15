// 🎧 LISTA DE MÚSICAS
const musicas = [
    { nome: "🌸 Melanie Martinez - EVITANTE", link: "https://www.youtube.com/embed/kjIuGUDvZkw" },
    { nome: "🌸 Melanie Martinez - Play Date", link: "https://www.youtube.com/embed/kknKs7cAcO8" },
    { nome: "🌸 Melanie Martinez - MILK OF THE SIREN", link: "https://www.youtube.com/embed/PytZs2ePxQw" },
    { nome: "🌸 Melanie Martinez - Highschool Sweethearts", link: "https://www.youtube.com/embed/dn5rSbHGsHY" },
    { nome: "🎸 Guns N' Roses - Sweet Child O' Mine", link: "https://www.youtube.com/embed/1w7OgIMMRc4" },
    { nome: "🎸 Nirvana - Smells Like Teen Spirit", link: "https://www.youtube.com/embed/hTWKbfoikeg" },
    { nome: "🎸 Weezer - Buddy Holly", link: "https://www.youtube.com/embed/kemivUKb4f4" },
    { nome: "🎸 Kittie - Brackish", link: "https://www.youtube.com/embed/yev3JqH6TpY" },
    { nome: "🌙 Phantom Siita - ZOKUZOKU", link: "https://www.youtube.com/embed/H-1oG5U0NAo" },
    { nome: "🌙 Phantom Siita - MEGURU", link: "https://www.youtube.com/embed/wP3Q3gqu4j8" },
    { nome: "🌙 Phantom Siita - HANAGATAMI", link: "https://www.youtube.com/embed/npygsyQAjNk" },
    { nome: "🌙 Phantom Siita - Bot Bakka", link: "https://www.youtube.com/embed/tJofqLSYjM8" },
    { nome: "🎧 NewJeans - Cool With You", link: "https://www.youtube.com/embed/kKsivrgoyDw" },
    { nome: "🎧 LE SSERAFIM - Perfect Night", link: "https://www.youtube.com/embed/hLvWy2b857I" },
    { nome: "🎧 ILLIT - Do The Dance", link: "https://www.youtube.com/embed/negtrQu5mTA" },
    { nome: "🎧 LE SSERAFIM - Hot", link: "https://www.youtube.com/embed/r9AEGPB6qIU" },
    { nome: "🎤 NAKISO - Retry Now", link: "https://www.youtube.com/embed/3iUgKH8c7p4" },
    { nome: "🎤 Hatsune Miku - Mesmerizer", link: "https://www.youtube.com/embed/19y8YTbvri8" },
    { nome: "🎤 Anamanaguchi - Miku", link: "https://www.youtube.com/embed/NocXEwsJGOQ" },
    { nome: "🎤 Hatsune Miku - The Intense Voice", link: "https://www.youtube.com/embed/VFtJk-vgti4" }
];

let musicaAtual = 0;
let modoAleatorio = false;

// 🛡️ ESPERA A PÁGINA CARREGAR ANTES DE RODAR
window.addEventListener("DOMContentLoaded", function() {
    
    console.log("✅ Player carregado!");

    const botaoAbrir = document.getElementById("abrir-player");
    const playerConteudo = document.getElementById("player-conteudo");
    const videoPlayer = document.getElementById("video-player");
    const listaMusicas = document.getElementById("lista-musicas");
    const btnAnterior = document.getElementById("btn-anterior");
    const btnProxima = document.getElementById("btn-proxima");
    const btnAleatorio = document.getElementById("btn-aleatorio");

    // Se algum elemento não existir, avisa no console
    if (!botaoAbrir) { console.log("❌ botaoAbrir não encontrado"); return; }
    if (!playerConteudo) { console.log("❌ playerConteudo não encontrado"); return; }
    if (!videoPlayer) { console.log("❌ videoPlayer não encontrado"); return; }
    if (!listaMusicas) { console.log("❌ listaMusicas não encontrado"); return; }

    // Abrir/fechar player
    botaoAbrir.addEventListener("click", () => {
        playerConteudo.classList.toggle("ativo");
        if (playerConteudo.classList.contains("ativo")) {
            botaoAbrir.textContent = "▼ Fechar Player";
            if (!videoPlayer.src) {
                tocarMusica(0);
            }
        } else {
            botaoAbrir.textContent = "▶ Abrir Player";
        }
    });

    // Tocar música
    function tocarMusica(indice) {
        musicaAtual = indice;
        videoPlayer.src = musicas[indice].link + "?autoplay=1";
        document.querySelectorAll(".lista-musicas li").forEach((li, i) => {
            li.classList.toggle("tocando", i === indice);
        });
    }

    // Criar lista
    function criarLista() {
        listaMusicas.innerHTML = "";
        musicas.forEach((musica, indice) => {
            const li = document.createElement("li");
            li.textContent = musica.nome;
            li.addEventListener("click", () => tocarMusica(indice));
            listaMusicas.appendChild(li);
        });
    }

    // Anterior
    btnAnterior.addEventListener("click", () => {
        const anterior = musicaAtual === 0 ? musicas.length - 1 : musicaAtual - 1;
        tocarMusica(anterior);
    });

    // Próxima
    btnProxima.addEventListener("click", () => {
        let proxima;
        if (modoAleatorio) {
            proxima = Math.floor(Math.random() * musicas.length);
        } else {
            proxima = (musicaAtual + 1) % musicas.length;
        }
        tocarMusica(proxima);
    });

    // Aleatório
    btnAleatorio.addEventListener("click", () => {
        modoAleatorio = !modoAleatorio;
        btnAleatorio.textContent = modoAleatorio ? "🔀 Aleatório ON" : "🔀 Aleatório";
        btnAleatorio.style.background = modoAleatorio ? "rgba(255, 105, 180, 0.6)" : "rgba(255, 105, 180, 0.2)";
    });

    // Inicializar
    criarLista();
});