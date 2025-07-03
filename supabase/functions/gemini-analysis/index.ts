
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, contractCode } = await req.json();
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const analysisPrompt = `Sebagai AI Security Analyst untuk smart contract Web3, analisis kode kontrak berikut untuk kerentanan keamanan dan berikan wawasan real-time:

Kode Kontrak:
${contractCode}

Pertanyaan User: ${prompt}

Silakan berikan analisis komprehensif dalam bahasa Indonesia dengan:

1. **Penilaian Risiko Keamanan**
   - Identifikasi semua kerentanan potensial
   - Tingkat severity (Critical, High, Medium, Low)
   - Analisis dampak dan exploitability

2. **Kerentanan Spesifik yang Ditemukan**
   - Reentrancy attacks
   - Integer overflow/underflow
   - Access control issues
   - Front-running vulnerabilities
   - Gas griefing attacks
   - Timestamp dependence
   - DoS attacks

3. **Rekomendasi Perbaikan**
   - Solusi konkret untuk setiap kerentanan
   - Best practices implementation
   - Penggunaan library keamanan (OpenZeppelin, dll)

4. **Optimasi Gas**
   - Identifikasi bagian kode yang boros gas
   - Saran optimasi struktur data
   - Rekomendasi pattern yang lebih efisien

5. **Best Practices**
   - Coding standards untuk Solidity
   - Security patterns yang harus diikuti
   - Testing dan audit recommendations

Format respons Anda dalam bentuk terstruktur dan mudah dipahami. Berikan penjelasan yang detail namun praktis untuk developer. Jika ada kerentanan kritis, berikan prioritas tinggi dan solusi segera.

Jika user menanyakan hal spesifik, fokuskan jawaban pada pertanyaan tersebut sambil tetap memberikan konteks keamanan yang relevan.`;

    console.log('Sending request to Gemini API...');
    
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': geminiApiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: analysisPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response received successfully');
    
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, tidak ada respons dari AI saat ini. Silakan coba lagi.';

    // Enhanced response with metadata
    const enhancedResponse = {
      analysis: aiResponse,
      timestamp: new Date().toISOString(),
      model: 'gemini-2.0-flash',
      contractAnalyzed: contractCode.length > 0,
      queryType: prompt.toLowerCase().includes('kerentanan') ? 'vulnerability' : 
                 prompt.toLowerCase().includes('gas') ? 'optimization' : 
                 prompt.toLowerCase().includes('audit') ? 'audit' : 'general',
      responseTime: Date.now()
    };

    return new Response(JSON.stringify(enhancedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in gemini-analysis function:', error);
    
    // Enhanced error response
    const errorResponse = {
      error: 'Analisis gagal',
      details: error.message,
      timestamp: new Date().toISOString(),
      suggestion: 'Silakan periksa koneksi internet Anda dan coba lagi. Jika masalah berlanjut, hubungi support.'
    };
    
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
