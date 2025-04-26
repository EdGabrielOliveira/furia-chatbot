interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const furiaQuizData: QuizQuestion[] = [
  {
    id: "q1",
    question: "Em que ano a FURIA foi fundada?",
    options: ["2015", "2017", "2018", "2020"],
    correctAnswer: 1,
    explanation: "A FURIA Esports foi fundada em 2017 por Jaime Pádua e André Akkari.",
  },
  {
    id: "q2",
    question: "Quem é o IGL (In-Game Leader) da FURIA em 2025?",
    options: ["arT", "yuurih", "KSCERATO", "FalleN"],
    correctAnswer: 3,
    explanation: "Gabriel 'FalleN' Toledo é o IGL da FURIA em 2025, trazendo sua vasta experiência para a equipe.",
  },
  {
    id: "q3",
    question: "Qual foi o primeiro Major que a FURIA participou?",
    options: ["Berlin Major 2019", "Katowice Major 2019", "Stockholm Major 2021", "Rio Major 2022"],
    correctAnswer: 1,
    explanation: "A FURIA fez sua estreia em Majors no Katowice Major 2019, onde chegou à fase de grupos.",
  },
  {
    id: "q4",
    question: "Qual lendário jogador brasileiro se juntou à FURIA em 2023?",
    options: ["coldzera", "TACO", "fer", "FalleN"],
    correctAnswer: 3,
    explanation: 'Gabriel "FalleN" Toledo, considerado o "Pai do CS brasileiro", juntou-se à FURIA em 2023.',
  },
  {
    id: "q5",
    question: "Qual será o proximo campeonato que a FURIA irá participar?",
    options: ["PGL Astana 2025", "IEM Dallas 2025", "BLAST.tv Austin Major 2025", "IEM Rio 2025"],
    correctAnswer: 0,
    explanation:
      "A FURIA está se preparando para o PGL Astana Major 2025, um dos torneios mais importantes do cenário competitivo.",
  },
  {
    id: "q6",
    question: "Qual é foi  o melhor rank da FURIA na HLTV?",
    options: ["entre 1º a 5º", "Entre 20º a 30º", "Entre 6º a 10", "Entre 11º a 20"],
    correctAnswer: 2,
    explanation:
      "A FURIA alcançou o 8º lugar no ranking da HLTV em 2020, após uma série de desempenhos impressionantes.",
  },
];
