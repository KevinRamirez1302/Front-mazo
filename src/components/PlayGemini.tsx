import { useState, useEffect, useRef, useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { playgroundTemplates } from '../data/playgroundTemplates'

type Tab = 'html' | 'css' | 'js'

type LogEntry = {
  id: number
  msg: string
  type: 'log' | 'error' | 'warn'
}

export default function PlayGemini() {
  const [activeTab, setActiveTab] = useState<Tab>('html')
  const getInitialFiles = (): { html: string; css: string; js: string } => {
    try {
      const saved = localStorage.getItem('playGemini_files')
      if (saved) return JSON.parse(saved)
    } catch { /* ignore */ }
    return {
      html: playgroundTemplates[0].html,
      css: playgroundTemplates[0].css,
      js: playgroundTemplates[0].js
    }
  }

  const [templateId, setTemplateId] = useState(() => {
    try {
      if (localStorage.getItem('playGemini_files')) return 'custom'
    } catch { /* ignore */ }
    return playgroundTemplates[0].id
  })
  
  const [files, setFiles] = useState(getInitialFiles)

  const [previewDoc, setPreviewDoc] = useState('')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [copied, setCopied] = useState(false)
  const [showConsole, setShowConsole] = useState(false)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)



  const buildPreview = useCallback(() => {
    // Interceptor script to catch console logs from the iframe and send them to parent window
    const interceptor = `
      <script>
        (function(){
          const oLog = console.log;
          const oWarn = console.warn;
          const oError = console.error;
          console.log = function(...args){ window.parent.postMessage({source: 'play-console', type: 'log', args}, '*'); oLog.apply(console, args); };
          console.warn = function(...args){ window.parent.postMessage({source: 'play-console', type: 'warn', args}, '*'); oWarn.apply(console, args); };
          console.error = function(...args){ window.parent.postMessage({source: 'play-console', type: 'error', args}, '*'); oError.apply(console, args); };
          window.onerror = function(msg, url, line){ console.error(msg + ' en linea ' + line); return false; };
        })();
      </script>
    `;

    const fullDoc = `
      <!DOCTYPE html>
      <html>
        <head>
          ${interceptor}
          <style>${files.css}</style>
        </head>
        <body>
          ${files.html}
          <script>${files.js}</script>
        </body>
      </html>
    `;
    setPreviewDoc(fullDoc)
  }, [files])

  // Save to LocalStorage and update preview on change
  useEffect(() => {
    if (templateId === 'custom') {
      localStorage.setItem('playGemini_files', JSON.stringify(files))
    }
    
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      buildPreview()
    }, 500)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [files, buildPreview, templateId])

  // Listen to messages from iframe (console interception)
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.source === 'play-console') {
        const { type, args } = e.data
        const msg = args.join(' ')
        setLogs(prev => [...prev, { id: Date.now(), msg, type }])
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined) return
    if (templateId !== 'custom') setTemplateId('custom')
    setFiles(prev => ({ ...prev, [activeTab]: value }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
    
    // Add custom keybinding for formatting (Cmd+S or Ctrl+S)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      formatCode()
    })
  }

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run()
    }
  }

  const changeTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    setTemplateId(id)
    if (id === 'custom') return
    const t = playgroundTemplates.find(t => t.id === id)
    if (t) {
      setFiles({ html: t.html, css: t.css, js: t.js })
      setLogs([]) // Clear console when changing template
      localStorage.removeItem('playGemini_files')
    }
  }

  const handleCopy = () => {
    const fullCode = `<style>\n${files.css}\n</style>\n\n${files.html}\n\n<script>\n${files.js}\n</script>`
    navigator.clipboard.writeText(fullCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleReset = () => {
    const base = playgroundTemplates.find(t => t.id === 'base') || playgroundTemplates[0]
    setTemplateId(base.id)
    setFiles({ html: base.html, css: base.css, js: base.js })
    setLogs([])
    localStorage.removeItem('playGemini_files')
  }

  const clearConsole = () => setLogs([])

  // Determine Monaco language
  const monacoLanguage = activeTab === 'js' ? 'javascript' : activeTab

  return (
    <div className="flex flex-col bg-[#1e1e1e]" style={{ height: '100dvh' }}>

      {/* ── Top Bar ── */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3.5
        bg-[#18181b] border-b border-white/5 shadow-lg shrink-0">

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>

          {/* Template Selector */}
          <select 
            value={templateId}
            onChange={changeTemplate}
            className="ml-0 sm:ml-4 bg-[#27272a] text-white/90 text-[0.8rem] px-3 py-1.5 rounded-md border border-white/10 outline-none hover:border-white/20 transition-colors"
          >
            <option value="custom">Código Personalizado</option>
            {playgroundTemplates.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-[#28c840] animate-pulse" />
            <span className="text-[0.72rem] text-white/50 font-medium">En vivo</span>
          </div>

          <button onClick={formatCode} title="Autoformatear Código" className="text-[0.8rem] text-accent hover:text-accent-deep font-semibold px-3 py-1.5 rounded-lg border border-accent/20 hover:bg-accent/10 transition-colors duration-150">
            ✨ Formatear
          </button>

          <button onClick={handleReset} title="Resetear código" className="hidden sm:block text-[0.8rem] text-white/50 hover:text-white/80 font-medium px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 transition-colors duration-150">
            Resetear
          </button>

          <button onClick={handleCopy} title="Copiar integrado" className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold bg-accent text-white px-3 sm:px-4 py-1.5 rounded-lg hover:bg-accent-dark transition-colors duration-150">
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>
      </header>

      {/* ── Main Split ── */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">

        {/* ── Editor Pane ── */}
        <div className="flex flex-col md:w-1/2 flex-1 min-h-0 min-w-[300px] bg-[#1e1e1e]">
          {/* Tabs */}
          <div className="flex items-center bg-[#18181b] border-b border-white/5 shrink-0 px-2 sm:px-4">
            {(['html', 'css', 'js'] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-[0.75rem] font-mono tracking-wider uppercase border-b-2 transition-colors ${
                  activeTab === tab 
                    ? 'border-accent text-accent bg-white/5' 
                    : 'border-transparent text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
              >
                {tab === 'js' ? 'JavaScript' : tab}
              </button>
            ))}
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 min-h-0 pt-2 relative">
            <Editor
              height="100%"
              language={monacoLanguage}
              theme="vs-dark"
              value={files[activeTab]}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineHeight: 24,
                padding: { top: 16 },
                scrollbar: {
                  vertical: 'visible',
                  horizontal: 'visible',
                  verticalScrollbarSize: 8,
                },
                wordWrap: 'on',
                formatOnPaste: true,
                suggestOnTriggerCharacters: true
              }}
            />
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-1 md:w-1 md:h-full bg-black shrink-0 relative flex items-center justify-center cursor-row-resize md:cursor-col-resize z-10 group">
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/40 transition-colors" />
          {/* A small handler icon could go here for drag effect */}
        </div>

        {/* ── Preview & Console Pane ── */}
        <div className="flex flex-col md:w-1/2 flex-1 min-h-0 bg-white">
          {/* Preview Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-fp-primary border-b border-divider/50 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[0.75rem] text-fp-muted font-bold uppercase tracking-wider">
                Vista Previa
              </span>
            </div>
            <button 
              onClick={() => setShowConsole(!showConsole)}
              className={`text-[0.7rem] px-2 py-1 rounded font-bold uppercase tracking-widest ${showConsole ? 'bg-fp-dark text-white' : 'bg-divider/40 text-fp-dark hover:bg-divider/60'}`}
            >
              Consola {logs.length > 0 && <span className="ml-1 bg-accent/20 text-accent-deep px-1.5 rounded-full">{logs.length}</span>}
            </button>
          </div>

          {/* Iframe */}
          <div className={`flex-1 min-h-0 relative ${showConsole ? 'basis-2/3' : 'basis-full'}`}>
            <iframe
              ref={iframeRef}
              srcDoc={previewDoc}
              title="Preview"
              sandbox="allow-scripts allow-modals allow-same-origin"
              className="absolute inset-0 w-full h-full border-none bg-white"
            />
          </div>

          {/* Console */}
          {showConsole && (
            <div className="basis-1/3 flex flex-col bg-[#1e1e1e] border-t-2 border-black overflow-hidden shadow-inner">
              <div className="flex justify-between items-center px-3 py-1.5 bg-[#252526] shrink-0 border-b border-white/5">
                <span className="text-[0.7rem] font-mono text-white/50 uppercase">Consola de Desarrollo</span>
                <button onClick={clearConsole} className="text-[0.7rem] text-white/40 hover:text-white/80">🚫 Limpiar</button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 font-mono text-[0.8rem]">
                {logs.length === 0 ? (
                  <div className="text-white/20 p-2 italic">Sin mensajes todavía...</div>
                ) : (
                  logs.map(log => (
                    <div 
                      key={log.id} 
                      className={`px-3 py-1.5 border-b border-white/5 ${
                        log.type === 'error' ? 'text-red-400 bg-red-500/5' : 
                        log.type === 'warn' ? 'text-yellow-400 bg-yellow-500/5' : 
                        'text-white/80'
                      }`}
                    >
                      {log.msg}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
