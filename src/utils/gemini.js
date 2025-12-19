import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/* ---------------------------------------------
   RAG: Retrieve legal context (mock version)
   Replace this later with vector DB retrieval
---------------------------------------------- */
async function retrieveLegalContext(query) {
  const q = query.toLowerCase();

  if (q.includes("fir")) {
    return `
LAW:
Section 154 of the Criminal Procedure Code (CrPC)

EXPLANATION:
Police are legally required to register an FIR for all cognizable offences.
The complaint can be given orally or in writing, and a copy must be provided
to the informant free of cost.

IMPORTANT POINTS:
- Police cannot refuse to register an FIR for cognizable offences
- FIR can be registered at any police station (Zero FIR)
- FIR sets the criminal law process in motion

IF POLICE REFUSE:
- You may approach the Superintendent of Police
- You may file a complaint before a Judicial Magistrate
`;
  }

  if (q.includes("theft") || q.includes("stolen")) {
    return `
LAW:
Section 378 and Section 379 of the Indian Penal Code (IPC)

EXPLANATION:
Theft means dishonestly taking movable property out of someone's possession
without their consent.

PUNISHMENT:
Imprisonment up to three years, or fine, or both.

COMMON EXAMPLES:
- Mobile phone theft
- Vehicle theft
- Pickpocketing
`;
  }

  if (q.includes("cyber")) {
    return `
LAW:
Information Technology Act, 2000 and relevant IPC provisions

EXPLANATION:
Cyber crimes include online fraud, identity theft, hacking, and misuse of
digital information.

PROCEDURE:
- Complaint can be filed online through the cyber crime portal
- FIR can also be registered at a police station
`;
  }

  return `
GENERAL LEGAL GUIDANCE:
Indian criminal law is governed by the IPC (offences) and CrPC (procedure).
`;
}

/* ---------------------------------------------
   System prompt: Personal Assistant behavior
---------------------------------------------- */
const SYSTEM_PROMPT = `
You are a calm, supportive AI Legal Assistant for Indian citizens.

Your role:
- Act like a personal legal assistant
- Explain legal concepts in simple language
- Be polite, reassuring, and clear

Rules:
- Use ONLY the provided legal context
- Do NOT invent laws or sections
- Do NOT give personal legal advice
- If information is insufficient, say so honestly

Response style:
- Write detailed, long explanations
- Use paragraphs and bullet points where helpful
- Explain procedures step by step
- End with what the citizen can do next
`;

/* ---------------------------------------------
   Main response generator
---------------------------------------------- */
export const generateAIResponse = async (userInput) => {
  try {
    // Step 1: RAG retrieval
    const legalContext = await retrieveLegalContext(userInput);

    // Step 2: Model with tool support
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      tools: [
        {
          functionDeclarations: [
            {
              name: "generateFIRDraft",
              description: "Generate a simple FIR draft for a citizen",
              parameters: {
                type: "object",
                properties: {
                  incident: {
                    type: "string",
                    description: "Incident description provided by the user"
                  }
                },
                required: ["incident"]
              }
            }
          ]
        }
      ]
    });

    // Step 3: Final prompt
    const prompt = `
${SYSTEM_PROMPT}

LEGAL CONTEXT:
${legalContext}

USER QUESTION:
${userInput}

INSTRUCTIONS:
Explain clearly, in detail, and in a personal assistant tone.
`;

    // Step 4: Generate response
    const result = await model.generateContent(prompt);

    // Step 5: Tool handling
    const call = result.response.functionCalls?.()?.[0];

    if (call?.name === "generateFIRDraft") {
      return `
Here is a simple FIR draft for your reference.

${call.args.incident}

Please note:
This draft is for informational purposes only.
You may modify it before submitting it at the police station.
`;
    }

    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I couldn't process your request right now. Please try again.";
  }
};
