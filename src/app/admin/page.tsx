'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Laptop, RefreshCw, LogIn, AlertTriangle, CheckCircle, 
  Clock, ShieldAlert, Trash2, Cpu, BarChart2, Activity,
  Server, HardDrive
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AnalyticsStats, LogEntry } from '@/services/db';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'logs'>('overview');

  const fetchStats = async (authPass: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/analytics?p=${encodeURIComponent(authPass)}`);
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Incorrect admin password.');
        }
        throw new Error('Failed to fetch analytics metrics.');
      }

      const data = await response.json();
      setStats(data);
      setIsAuthenticated(true);
      // Store password temporarily in session storage
      sessionStorage.setItem('admin_key', authPass);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStats(password);
  };

  const handleRefresh = () => {
    const savedKey = sessionStorage.getItem('admin_key') || password;
    if (savedKey) {
      fetchStats(savedKey);
    }
  };

  const handleResetStats = async () => {
    const savedKey = sessionStorage.getItem('admin_key') || password;
    if (!savedKey || !confirm('Are you sure you want to completely reset all analytics logs?')) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/analytics?p=${encodeURIComponent(savedKey)}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Reset failed.');
      
      // Fetch fresh empty stats
      fetchStats(savedKey);
    } catch (err: any) {
      setError(err.message || 'Failed to reset.');
    } finally {
      setIsLoading(false);
    }
  };

  // Attempt auto-login on load if session key is saved
  useEffect(() => {
    const savedKey = sessionStorage.getItem('admin_key');
    if (savedKey) {
      setPassword(savedKey);
      fetchStats(savedKey);
    }
  }, []);

  // Calculate stats parameters
  const avgDurationSec = stats 
    ? (stats.totalDurationMs / (stats.totalRequests || 1) / 1000).toFixed(2)
    : '0';

  const successRate = stats
    ? ((stats.successCount / (stats.totalRequests || 1)) * 100).toFixed(1)
    : '0';

  return (
    <>
      <Navbar />

      <main className="animated-bg min-h-screen relative overflow-hidden flex flex-col justify-start py-12">
        <div className="absolute top-[10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            {!isAuthenticated ? (
              // Login Screen
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-md w-full mx-auto glass-panel p-8 rounded-3xl border border-zinc-800 shadow-2xl space-y-6"
              >
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mx-auto">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <h1 className="text-2xl font-bold text-white">Admin Dashboard Secure Login</h1>
                  <p className="text-xs text-zinc-400">Enter your credentials to monitor server metrics.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <div className="p-3 text-xs rounded-xl bg-red-950/20 border border-red-900/40 text-red-400">
                      {error}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Admin Secret Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-805 bg-zinc-950/50 text-sm text-white focus:outline-none focus:border-violet-500"
                      required
                    />
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Check <code className="text-violet-400">.env.example</code> or docker setup for default passwords.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 disabled:opacity-50 transition-all shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Verifying credentials...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 mr-2" />
                        Access Analytics Server
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              // Dashboard Console
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full space-y-8"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-900">
                  <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold text-white flex items-center space-x-2">
                      <Activity className="w-8 h-8 text-violet-400" />
                      <span>Console Command Center</span>
                    </h1>
                    <p className="text-xs text-zinc-400">
                      Real-time usage analytics and error monitoring logs.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleRefresh}
                      disabled={isLoading}
                      className="inline-flex items-center justify-center p-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 text-zinc-400 hover:text-white transition-colors"
                      title="Refresh Logs"
                    >
                      <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>

                    <button
                      onClick={handleResetStats}
                      disabled={isLoading}
                      className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold border border-red-900/30 rounded-lg hover:border-red-900 bg-red-950/10 text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                      Reset Metrics
                    </button>

                    <button
                      onClick={() => {
                        sessionStorage.removeItem('admin_key');
                        setIsAuthenticated(false);
                      }}
                      className="px-4 py-2.5 text-xs font-bold border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>

                {/* Metrics Grid Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1 */}
                  <div className="glass-panel p-6 rounded-2xl border border-zinc-800/60 relative overflow-hidden">
                    <div className="absolute right-4 top-4 text-violet-500/10">
                      <Activity className="w-16 h-16" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Upload Requests</span>
                    <h2 className="text-3xl font-extrabold text-white mt-2 font-mono">{stats?.totalRequests}</h2>
                    <p className="text-[10px] text-zinc-500 mt-2">Aggregated hits across all tool endpoints.</p>
                  </div>

                  {/* Card 2 */}
                  <div className="glass-panel p-6 rounded-2xl border border-zinc-800/60 relative overflow-hidden">
                    <div className="absolute right-4 top-4 text-emerald-500/10">
                      <CheckCircle className="w-16 h-16" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Success Rate</span>
                    <h2 className="text-3xl font-extrabold text-emerald-400 mt-2 font-mono">{successRate}%</h2>
                    <p className="text-[10px] text-zinc-500 mt-2">{stats?.successCount} successes • {stats?.failCount} failed</p>
                  </div>

                  {/* Card 3 */}
                  <div className="glass-panel p-6 rounded-2xl border border-zinc-800/60 relative overflow-hidden">
                    <div className="absolute right-4 top-4 text-pink-500/10">
                      <Clock className="w-16 h-16" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Avg Response Delay</span>
                    <h2 className="text-3xl font-extrabold text-white mt-2 font-mono">{avgDurationSec}s</h2>
                    <p className="text-[10px] text-zinc-500 mt-2">Time to execute deep neural predictions.</p>
                  </div>

                  {/* Card 4 */}
                  <div className="glass-panel p-6 rounded-2xl border border-zinc-800/60 relative overflow-hidden">
                    <div className="absolute right-4 top-4 text-blue-500/10">
                      <Server className="w-16 h-16" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Server Health</span>
                    <h2 className="text-3xl font-extrabold text-emerald-400 mt-2 flex items-center font-mono">
                      99.8%
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ml-2.5"></span>
                    </h2>
                    <p className="text-[10px] text-zinc-500 mt-2">Containers status: 100% active operational.</p>
                  </div>
                </div>

                {/* Main Grid split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - 2 Blocks */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Tool Breakdown Chart Panel */}
                    <div className="glass-panel p-6 rounded-2xl border border-zinc-800/60">
                      <div className="flex items-center space-x-2 text-white font-bold pb-4 border-b border-zinc-900 mb-6">
                        <BarChart2 className="w-5 h-5 text-violet-400" />
                        <h3>Tool Usage breakdown</h3>
                      </div>

                      {/* Custom SVG/Glassmorphic Bar Chart */}
                      {stats && (
                        <div className="space-y-4">
                          {Object.entries(stats.toolUsage).map(([tool, count]) => {
                            const total = Object.values(stats.toolUsage).reduce((a, b) => a + b, 0) || 1;
                            const percentage = ((count / total) * 100).toFixed(1);
                            return (
                              <div key={tool} className="space-y-1">
                                <div className="flex justify-between text-xs font-semibold">
                                  <span className="capitalize text-zinc-300 font-medium">{tool.replace('-', ' ')}</span>
                                  <span className="text-zinc-500 font-mono">
                                    {count} requests ({percentage}%)
                                  </span>
                                </div>
                                <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-900 p-0.5">
                                  <div 
                                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-pink-500"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Recent Transaction Logs */}
                    <div className="glass-panel p-6 rounded-2xl border border-zinc-800/60">
                      <div className="flex justify-between items-center pb-4 border-b border-zinc-900 mb-6">
                        <div className="flex items-center space-x-2 text-white font-bold">
                          <Cpu className="w-5 h-5 text-pink-400" />
                          <h3>API Request Stream</h3>
                        </div>
                        <div className="flex space-x-1.5 p-0.5 bg-zinc-950 border border-zinc-900 rounded-lg">
                          <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-3 py-1 rounded text-xs font-semibold ${
                              activeTab === 'overview' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            Stats Overview
                          </button>
                          <button
                            onClick={() => setActiveTab('logs')}
                            className={`px-3 py-1 rounded text-xs font-semibold ${
                              activeTab === 'logs' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            Detailed Logs ({stats?.logs.length})
                          </button>
                        </div>
                      </div>

                      {/* Logs Table */}
                      <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950/20 max-h-[300px] overflow-y-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-zinc-900 bg-zinc-950/40 text-zinc-500 font-bold sticky top-0">
                              <th className="p-3">Time</th>
                              <th className="p-3">IP Address</th>
                              <th className="p-3">Tool</th>
                              <th className="p-3">Action</th>
                              <th className="p-3">Size</th>
                              <th className="p-3">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-900/40 text-zinc-300">
                            {stats?.logs.map((log) => (
                              <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-3 font-mono text-zinc-500">
                                  {new Date(log.timestamp).toLocaleTimeString()}
                                </td>
                                <td className="p-3 font-mono">{log.ip}</td>
                                <td className="p-3 capitalize font-semibold text-violet-400">{log.tool.replace('-', ' ')}</td>
                                <td className="p-3 text-zinc-400">{log.action}</td>
                                <td className="p-3 font-mono text-zinc-500">{(log.fileSizeKb / 1024).toFixed(2)} MB</td>
                                <td className="p-3">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                                    log.status === 'SUCCESS' 
                                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                  }`}>
                                    {log.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - System Status */}
                  <div className="space-y-6">
                    {/* Error Monitoring Card */}
                    <div className="glass-panel p-6 rounded-2xl border border-zinc-800/60 space-y-4">
                      <div className="flex items-center space-x-2 text-white font-bold pb-4 border-b border-zinc-900">
                        <ShieldAlert className="w-5 h-5 text-red-400" />
                        <h3>Error Logs</h3>
                      </div>

                      <div className="space-y-3 max-h-[200px] overflow-y-auto">
                        {stats?.logs.filter(l => l.status === 'FAILED').map((log) => (
                          <div key={log.id} className="p-3 rounded-xl bg-red-950/20 border border-red-900/30 space-y-1">
                            <div className="flex justify-between text-[10px] font-bold text-red-400 uppercase">
                              <span>{log.tool}</span>
                              <span className="font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <p className="text-xs text-zinc-300 leading-normal">{log.errorMessage || 'AI Prediction failed.'}</p>
                          </div>
                        ))}

                        {stats?.logs.filter(l => l.status === 'FAILED').length === 0 && (
                          <p className="text-xs text-zinc-500 text-center py-6">No system anomalies reported.</p>
                        )}
                      </div>
                    </div>

                    {/* Server Metrics card */}
                    <div className="glass-panel p-6 rounded-2xl border border-zinc-800/60 space-y-4">
                      <div className="flex items-center space-x-2 text-white font-bold pb-4 border-b border-zinc-900">
                        <HardDrive className="w-5 h-5 text-blue-400" />
                        <h3>Server Resource Utilization</h3>
                      </div>

                      <div className="space-y-4">
                        {/* CPU */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-zinc-350">CPU Usage</span>
                            <span className="text-zinc-500 font-mono">18% (4x Intel Xeon)</span>
                          </div>
                          <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden p-0.5">
                            <div className="h-full rounded-full bg-blue-500" style={{ width: '18%' }} />
                          </div>
                        </div>

                        {/* GPU memory */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-zinc-350">GPU VRAM (1x NVIDIA A100)</span>
                            <span className="text-zinc-500 font-mono">12.4 GB / 40.0 GB (31%)</span>
                          </div>
                          <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden p-0.5">
                            <div className="h-full rounded-full bg-violet-500" style={{ width: '31%' }} />
                          </div>
                        </div>

                        {/* Memory */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-zinc-350">System RAM</span>
                            <span className="text-zinc-500 font-mono">8.2 GB / 32.0 GB (25%)</span>
                          </div>
                          <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden p-0.5">
                            <div className="h-full rounded-full bg-emerald-500" style={{ width: '25%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </>
  );
}
