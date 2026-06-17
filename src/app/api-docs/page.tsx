'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, Code, Terminal, Clipboard, Check, 
  ArrowLeft, Key, Lock, ArrowRight, ShieldCheck 
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const endpoints = [
  {
    name: 'Upscale Image',
    path: '/api/upscale',
    method: 'POST',
    desc: 'Enhance and upscale image files up to 8x resolution.',
    params: [
      { name: 'image', type: 'string (base64)', req: true, desc: 'Image data URL with type headers (e.g., data:image/png;base64,...).' },
      { name: 'options.upscale', type: 'number', req: false, desc: 'Scaling multiplier. Supported: 2, 4, 8. Default: 4.' },
      { name: 'options.faceRestore', type: 'boolean', req: false, desc: 'Toggle facial details repair. Default: false.' },
    ],
    curl: `curl -X POST https://enhancepro.ai/api/upscale \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -d '{
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...",
    "options": {
      "upscale": 4,
      "faceRestore": true
    }
  }'`,
    javascript: `const response = await fetch('https://enhancepro.ai/api/upscale', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_TOKEN'
  },
  body: JSON.stringify({
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
    options: {
      upscale: 4,
      faceRestore: true
    }
  })
});

const data = await response.json();
console.log(data.image); // Processed image base64/URL`,
  },
  {
    name: 'Remove Background',
    path: '/api/remove-bg',
    method: 'POST',
    desc: 'Extract subjects and return a clean transparent PNG image.',
    params: [
      { name: 'image', type: 'string (base64)', req: true, desc: 'Image data URL.' },
      { name: 'options.bgColor', type: 'string', req: false, desc: 'Fill color behind cutout. Values: "transparent", "white", "black". Default: "transparent".' },
    ],
    curl: `curl -X POST https://enhancepro.ai/api/remove-bg \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -d '{
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...",
    "options": {
      "bgColor": "transparent"
    }
  }'`,
    javascript: `const response = await fetch('https://enhancepro.ai/api/remove-bg', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_TOKEN'
  },
  body: JSON.stringify({
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
    options: {
      bgColor: 'transparent'
    }
  })
});

const data = await response.json();
console.log(data.image); // Isolated transparent image`,
  }
];

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState<'curl' | 'js'>('curl');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <Navbar />

      <main className="animated-bg min-h-screen relative overflow-hidden flex flex-col justify-start py-12">
        <div className="absolute top-[10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center text-xs font-semibold text-zinc-500 hover:text-white transition-colors mb-3">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Back to Homepage
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center space-x-2">
              <Cpu className="w-9 h-9 text-violet-400" />
              <span>Developer API Documentation</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-3xl leading-relaxed">
              Integrate state-of-the-art AI upscaling, face restoration, and background removal directly into your applications, websites, or automation pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Guide Card - 4 Columns */}
            <div className="lg:col-span-4 space-y-6">
              {/* Getting started card */}
              <div className="glass-panel p-6 rounded-2xl border border-zinc-800/60">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <Key className="w-5 h-5 text-violet-400" />
                  <span>Authentication</span>
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  All REST endpoints require an Authorization Header containing your Bearer token.
                </p>
                <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-900 font-mono text-[11px] text-zinc-300">
                  Authorization: Bearer YOUR_API_TOKEN
                </div>
                <div className="mt-4 flex items-start space-x-2 text-[11px] text-zinc-500 bg-violet-950/10 border border-violet-900/30 p-3 rounded-lg">
                  <Lock className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                  <p>In-development API routes run without token verification for immediate testing.</p>
                </div>
              </div>

              {/* Rate Limits */}
              <div className="glass-panel p-6 rounded-2xl border border-zinc-800/60">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Rate Limiting</span>
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                  To protect server performance, requests are rate-limited on IP address and tokens:
                </p>
                <ul className="text-xs text-zinc-400 space-y-2 list-disc list-inside">
                  <li>60 requests per minute.</li>
                  <li>Max upload payload size: 10MB.</li>
                  <li>Overloaded buckets return <code className="text-amber-400">429 Too Many Requests</code>.</li>
                </ul>
              </div>
            </div>

            {/* Endpoints Documentation - 8 Columns */}
            <div className="lg:col-span-8 space-y-8">
              {endpoints.map((endpoint, index) => {
                const codeSnippet = activeTab === 'curl' ? endpoint.curl : endpoint.javascript;
                const copiedKey = `${index}-${activeTab}`;

                return (
                  <div key={index} className="glass-panel p-6 rounded-2xl border border-zinc-800/60 space-y-6">
                    <div>
                      <div className="flex items-center space-x-3.5">
                        <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-violet-500/10 border border-violet-500/30 text-violet-400 font-mono">
                          {endpoint.method}
                        </span>
                        <span className="text-sm font-bold font-mono text-zinc-200">
                          {endpoint.path}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white mt-3">{endpoint.name}</h2>
                      <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">{endpoint.desc}</p>
                    </div>

                    {/* Parameters Table */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Request Parameters</h4>
                      <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950/20">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-zinc-900 bg-zinc-950/40 text-zinc-500 font-bold">
                              <th className="p-3">Field</th>
                              <th className="p-3">Type</th>
                              <th className="p-3">Required</th>
                              <th className="p-3">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-900/40 text-zinc-300">
                            {endpoint.params.map((p, pIdx) => (
                              <tr key={pIdx}>
                                <td className="p-3 font-mono font-bold text-violet-400">{p.name}</td>
                                <td className="p-3 font-mono text-[11px] text-zinc-500">{p.type}</td>
                                <td className="p-3 font-semibold">{p.req ? 'Yes' : 'No'}</td>
                                <td className="p-3 text-zinc-400">{p.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Code Snippet */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Request Example</h4>
                        <div className="flex space-x-1.5 p-0.5 rounded-lg bg-zinc-950 border border-zinc-900">
                          <button
                            onClick={() => setActiveTab('curl')}
                            className={`px-3 py-1 rounded text-xs font-semibold ${
                              activeTab === 'curl' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            cURL
                          </button>
                          <button
                            onClick={() => setActiveTab('js')}
                            className={`px-3 py-1 rounded text-xs font-semibold ${
                              activeTab === 'js' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            JavaScript
                          </button>
                        </div>
                      </div>

                      <div className="relative rounded-xl border border-zinc-900 bg-zinc-950 p-4 font-mono text-xs overflow-x-auto text-zinc-300 select-all whitespace-pre">
                        <button
                          onClick={() => handleCopy(codeSnippet, copiedKey)}
                          className="absolute right-3 top-3 p-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 text-zinc-400 hover:text-white transition-colors"
                        >
                          {copiedId === copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Clipboard className="w-4 h-4" />}
                        </button>
                        {codeSnippet}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
