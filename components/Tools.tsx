
import React, { useState } from 'react';

const Tools: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const pythonScript = `
import requests
import json
import sys

# === LEVELUP ENGLISH B1 STUDY BUDDY ===
# A terminal-based AI Tutor for Software Engineers
# Required: pip install requests

# 1. Replace this with your actual API key
API_KEY = "REPLACE_WITH_YOUR_GEMINI_API_KEY"
MODEL = "gemini-3-flash-preview"

def get_tutor_response(prompt, history=[]):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"
    
    # Structure history for the API
    contents = history + [{"role": "user", "parts": [{"text": prompt}]}]
    
    payload = {
        "contents": contents,
        "systemInstruction": {
            "parts": [{
                "text": "You are a professional English Tutor for IT experts. "
                        "You help students move from A2 to B1. "
                        "Correct errors gently and suggest B1-level technical synonyms."
            }]
        }
    }
    
    try:
        response = requests.post(url, json=payload, timeout=15)
        response.raise_for_status()
        data = response.json()
        return data['candidates'][0]['content']['parts'][0]['text']
    except Exception as e:
        return f"Error: {str(e)}"

def main():
    print("-" * 50)
    print("Welcome to LevelUp English B1 CLI!")
    print("Practice your technical English here.")
    print("Type 'exit' to end the session.")
    print("-" * 50)
    
    history = []
    
    while True:
        try:
            user_input = input("\\nYou: ").strip()
            if not user_input: continue
            if user_input.lower() in ['exit', 'quit']:
                print("Keep practicing! Goodbye.")
                break
                
            print("Tutor is thinking...", end="\\r")
            response = get_tutor_response(user_input, history)
            
            # Update history
            history.append({"role": "user", "parts": [{"text": user_input}]})
            history.append({"role": "model", "parts": [{"text": response}]})
            
            # Print response
            print(f"Tutor: {response}")
            
        except KeyboardInterrupt:
            print("\\nSession ended.")
            break

if __name__ == "__main__":
    if API_KEY == "REPLACE_WITH_YOUR_GEMINI_API_KEY":
        print("Error: Please set your API_KEY in the script first.")
        sys.exit(1)
    main()
  `.trim();

  const downloadPython = () => {
    const blob = new Blob([pythonScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'levelup_b1_tutor.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="animate-fade-in space-y-8 pb-12">
      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <i className="fa-brands fa-python text-[12rem]"></i>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-slate-900 text-2xl">
              <i className="fa-brands fa-python"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Python CLI Study Buddy</h2>
              <p className="text-slate-400 text-sm">Automate your learning with a custom terminal script.</p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 font-mono text-sm border border-slate-700 max-h-64 overflow-y-auto custom-scrollbar">
            <pre className="text-blue-300">{pythonScript}</pre>
          </div>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={downloadPython}
              className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-download"></i>
              Download .py File
            </button>
            
            <button 
              onClick={() => {
                navigator.clipboard.writeText(pythonScript);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
            >
              <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
              {copied ? 'Copied to Clipboard!' : 'Copy Script Content'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl">
              <i className="fa-solid fa-window-maximize"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Generate .exe</h2>
              <p className="text-slate-500 text-xs">Run as a standalone Windows app.</p>
            </div>
          </div>

          <ol className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">1</span>
              <p className="text-slate-600 leading-tight">Install the compiler tool:<br/><code className="bg-slate-100 px-2 py-1 rounded text-blue-600 font-mono inline-block mt-1">pip install pyinstaller</code></p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">2</span>
              <p className="text-slate-600 leading-tight">Open your terminal in the same folder as the script.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">3</span>
              <p className="text-slate-600 leading-tight">Compile the script:<br/><code className="bg-slate-100 px-2 py-1 rounded text-blue-600 font-mono inline-block mt-1">pyinstaller --onefile levelup_b1_tutor.py</code></p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">4</span>
              <p className="text-slate-600 leading-tight">Your <b>.exe</b> will be in the <code className="text-slate-800 font-bold">dist/</code> folder.</p>
            </li>
          </ol>
        </div>

        <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 flex flex-col justify-center">
          <div className="text-center">
            <i className="fa-solid fa-circle-info text-blue-400 text-4xl mb-4"></i>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Pro Tip: Technical Prep</h3>
            <p className="text-blue-700 text-sm leading-relaxed">
              Using a terminal script is exactly how B1 level engineers demonstrate proficiency. 
              By practice coding and practicing English simultaneously, you reach your goal 2x faster!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
