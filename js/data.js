// ── Sample data — replace with your own content ──

const POSTS = [
  {
    id: 1,
    title: "Por que escrever muda a forma como você pensa",
    excerpt: "Escrever não é apenas registrar ideias — é um processo de descoberta. Quando colocamos pensamentos em palavras, organizamos o caos interno.",
    body: `<p>Escrever não é apenas registrar ideias — é um processo de descoberta. Quando colocamos pensamentos em palavras, organizamos o caos interno e encontramos conexões que nunca perceberíamos de outra forma.</p>
<p>Filósofos, cientistas e artistas sempre souberam disso. Einstein escrevia cartas longas para si mesmo. Darwin mantinha diários obsessivos. Virginia Woolf acreditava que o ato de escrever era indistinguível do ato de pensar.</p>
<p>Você não precisa ser escritor para se beneficiar disso. Alguns minutos por dia registrando o que você sente, observa ou questiona podem transformar sua relação com o mundo.</p>
<p>Experimente: escreva três frases sobre algo que te incomoda hoje. Depois releia. Você vai se surpreender com o que descobriu sobre si mesmo.</p>`,
    category: "Reflexão",
    date: "2026-06-10",
    author: "Você",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    likes: 24,
    comments: [
      { name: "Ana", text: "Que texto lindo! Me identifiquei muito.", time: "10/06 · 14h" },
      { name: "Pedro", text: "Comecei a escrever diário depois de ler isso.", time: "10/06 · 16h" }
    ]
  },
  {
    id: 2,
    title: "O silêncio como prática: redescobri a quietude",
    excerpt: "Vivemos cercados de ruído. Notificações, músicas, podcasts — preenchemos cada lacuna de silêncio com algum estímulo.",
    body: `<p>Vivemos cercados de ruído. Notificações, músicas, podcasts — preenchemos cada lacuna de silêncio com algum estímulo. Ficamos desconfortáveis com o vazio.</p>
<p>Há três meses comecei uma prática simples: 10 minutos por dia em silêncio total. Sem celular, sem música, sem fones. Só eu e o ambiente.</p>
<p>No começo era insuportável. A mente queria fugir para qualquer direção. Mas com o tempo aprendi a ficar. E descobri que o silêncio não é vazio — é presença.</p>
<p>É no silêncio que as ideias mais importantes aparecem. É onde você escuta a si mesmo.</p>`,
    category: "Bem-estar",
    date: "2026-06-08",
    author: "Você",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    likes: 18,
    comments: [
      { name: "Carla", text: "Preciso muito disso na minha vida.", time: "08/06 · 09h" }
    ]
  },
  {
    id: 3,
    title: "Leituras que mudaram meu olhar sobre o mundo",
    excerpt: "Alguns livros não entram pela mente — entram pela vida. Aqui estão os que me transformaram nos últimos anos.",
    body: `<p>Alguns livros não entram pela mente — entram pela vida. Eles chegam no momento certo e alteram algo fundamental na forma como você vê o mundo.</p>
<p><strong>1. Sapiens (Yuval Noah Harari)</strong> — Me fez questionar tudo o que achava óbvio sobre a humanidade.</p>
<p><strong>2. O Poder do Hábito (Charles Duhigg)</strong> — Entender como hábitos funcionam mudou minha rotina completamente.</p>
<p><strong>3. Cartas a um Jovem Poeta (Rilke)</strong> — Talvez o mais humano dos três. Uma série de cartas sobre criar, sobre duvidar, sobre viver.</p>
<p>Qual livro mudou o seu olhar? Me conta nos comentários.</p>`,
    category: "Leituras",
    date: "2026-06-05",
    author: "Você",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    likes: 31,
    comments: [
      { name: "Lucas", text: "Sapiens é incrível mesmo! Li duas vezes.", time: "05/06 · 11h" },
      { name: "Marta", text: "Adorei a sugestão do Rilke!", time: "06/06 · 08h" },
      { name: "João", text: "Tem alguma sugestão de ficção?", time: "06/06 · 20h" }
    ]
  },
  {
    id: 4,
    title: "Gratidão não é positivi​toxismo — é ciência",
    excerpt: "A prática da gratidão virou clichê. Mas antes de descartá-la, vale entender o que a neurociência diz sobre ela.",
    body: `<p>A prática da gratidão virou clichê. Memes de "seja grato e tudo muda" acabaram com a seriedade do assunto. Mas antes de descartá-la, vale entender o que a neurociência diz sobre ela.</p>
<p>Estudos da Universidade de Berkeley mostram que pessoas que escrevem regularmente sobre coisas pelas quais são gratas apresentam maior atividade no córtex pré-frontal medial — região ligada ao aprendizado e tomada de decisão.</p>
<p>Não se trata de fingir que tudo está bem. Trata-se de treinar o cérebro a notar o que funciona, equilibrando a tendência natural de focar no que falta.</p>
<p>Experimento desta semana: anote uma coisa específica — não genérica — pela qual você é grato. Não "minha família", mas "a mensagem que minha mãe me mandou ontem de manhã".</p>`,
    category: "Ciência",
    date: "2026-06-02",
    author: "Você",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    likes: 42,
    comments: []
  }
];

// ── Media items ──
const MEDIA_ITEMS = [
  {
    id: 1,
    type: "photo",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
    thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70",
    caption: "Vista da montanha ao amanhecer",
    date: "2026-06-12"
  },
  {
    id: 2,
    type: "photo",
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
    thumb: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=70",
    caption: "Floresta ao entardecer",
    date: "2026-06-12"
  },
  {
    id: 3,
    type: "video",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumb: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=70",
    caption: "Vídeo do dia — natureza",
    date: "2026-06-12"
  },
  {
    id: 4,
    type: "photo",
    src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=900&q=80",
    thumb: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400&q=70",
    caption: "Lago no início da manhã",
    date: "2026-06-11"
  },
  {
    id: 5,
    type: "photo",
    src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80",
    thumb: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=70",
    caption: "Caderno e café — hora de escrever",
    date: "2026-06-11"
  },
  {
    id: 6,
    type: "video",
    src: "https://www.w3schools.com/html/movie.mp4",
    thumb: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=70",
    caption: "Cenas do fim de tarde",
    date: "2026-06-10"
  },
  {
    id: 7,
    type: "photo",
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80",
    thumb: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=70",
    caption: "Pilha de livros favoritos",
    date: "2026-06-10"
  },
  {
    id: 8,
    type: "photo",
    src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=80",
    thumb: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=70",
    caption: "Mesa de trabalho",
    date: "2026-06-09"
  },
  {
    id: 9,
    type: "photo",
    src: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=80",
    thumb: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=70",
    caption: "Caminho na neve",
    date: "2026-06-07"
  },
  {
    id: 10,
    type: "video",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumb: "https://images.unsplash.com/photo-1467189741299-4f2a8f5acacd?w=400&q=70",
    caption: "Time-lapse do pôr do sol",
    date: "2026-06-06"
  }
];
