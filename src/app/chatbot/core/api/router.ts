import { FURIA_GUIDELINES } from "../types/diretrizes";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

interface GeminiResponse {
  text: string;
  success: boolean;
}

export const createPrompt = (userMessage: string): string => {
  return `Você é o chatbot oficial da FURIA Esports, organização de esports do Brasil.
  
  ${FURIA_GUIDELINES}
  
  Pergunta do usuário: "${userMessage}"`;
};

const generationConfig = {
  temperature: 0.5,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 200,
};

export const fetchAIResponse = async (userMessage: string): Promise<GeminiResponse> => {
  try {
    if (!GEMINI_API_KEY) {
      console.error("API key não encontrada");
      return {
        text: "Desculpe, estou temporariamente indisponível. Por favor, tente novamente mais tarde ou visite nosso site oficial: furia.gg",
        success: false,
      };
    }

    const prompt = createPrompt(userMessage);

    const body = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig,
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Erro na API:", response.status, errorData);
      return {
        text: `Desculpe, não consegui processar sua pergunta. Por favor, tente novamente ou visite furia.gg para mais informações. (Erro: ${response.status})`,
        success: false,
      };
    }

    const data = await response.json();
    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Desculpe, não consegui processar sua solicitação. Visite furia.gg para informações atualizadas.";

    return { text: responseText, success: true };
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    return {
      text: "Estamos com dificuldades técnicas no momento. Por favor, tente novamente mais tarde ou visite nosso site oficial furia.gg.",
      success: false,
    };
  }
};
