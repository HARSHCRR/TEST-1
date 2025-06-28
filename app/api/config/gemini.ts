const GEMINI_API_KEY = 'AIzaSyBUrj3bRp-k96-hw3m0LVS7jrmo3mVagZM';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const getGeminiResponse = async (messages: any[] = [], patientData: any = null, isGeneralQuery: boolean = false) => {
  try {
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid messages format');
    }

    // Format the conversation history
    const conversationHistory = messages.map(msg => {
      if (!msg || typeof msg.role !== 'string' || typeof msg.content !== 'string') {
        return '';
      }
      return `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`;
    }).filter(Boolean).join('\n');

    // Prepare context based on whether this is a general query or patient-specific
    let context = '';
    if (isGeneralQuery) {
      context = `You are a medical AI assistant. You can provide general medical information and answer healthcare-related questions. 
Please note that this is for informational purposes only and does not replace professional medical advice.`;
    } else if (patientData && typeof patientData === 'object') {
      context = `
Patient Information:
- Name: ${patientData.name || 'N/A'}
- Age: ${patientData.age || 'N/A'}
- Gender: ${patientData.gender || 'N/A'}
- Blood Type: ${patientData.bloodType || 'N/A'}
- Allergies: ${Array.isArray(patientData.allergies) ? patientData.allergies.join(', ') : 'None'}
      `;
    } else {
      context = 'You are a medical AI assistant. No specific patient data is available.';
    }

    // Prepare the prompt
    const prompt = `
${context}

Previous conversation:
${conversationHistory}

Please respond as a medical assistant. Keep the response professional and medical-focused.
    `.trim();

    // Make the API request
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response text from the Gemini API response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!generatedText) {
      throw new Error('Empty response from Gemini');
    }

    return {
      role: "assistant",
      content: generatedText
    };
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    return {
      role: "assistant",
      content: "I apologize, but I'm having trouble processing your request at the moment. Please try again."
    };
  }
}; 