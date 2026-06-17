// Simple in-memory analytics store for the Admin Dashboard
// Uses globalThis to persist stats during development hot reloads

export interface LogEntry {
  id: string;
  timestamp: string;
  ip: string;
  tool: string;
  action: string;
  durationMs: number;
  fileSizeKb: number;
  status: 'SUCCESS' | 'FAILED';
  errorMessage?: string;
}

export interface AnalyticsStats {
  totalRequests: number;
  successCount: number;
  failCount: number;
  totalDurationMs: number;
  toolUsage: Record<string, number>;
  logs: LogEntry[];
}

const DEFAULT_STATS: AnalyticsStats = {
  totalRequests: 245, // Seeded mock data to make the dashboard look alive initially
  successCount: 238,
  failCount: 7,
  totalDurationMs: 382400,
  toolUsage: {
    'upscale': 98,
    'enhance': 64,
    'face-restoration': 45,
    'remove-bg': 28,
    'old-photo': 10,
  },
  logs: [
    {
      id: 'mock-1',
      timestamp: new Date(Date.now() - 500000).toISOString(),
      ip: '192.168.1.50',
      tool: 'upscale',
      action: '4x Upscale',
      durationMs: 1840,
      fileSizeKb: 1420,
      status: 'SUCCESS',
    },
    {
      id: 'mock-2',
      timestamp: new Date(Date.now() - 1200000).toISOString(),
      ip: '82.45.192.3',
      tool: 'face-restoration',
      action: 'GFPGAN Face Fix',
      durationMs: 2450,
      fileSizeKb: 890,
      status: 'SUCCESS',
    },
    {
      id: 'mock-3',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      ip: '104.22.4.9',
      tool: 'remove-bg',
      action: 'Background Removal',
      durationMs: 1200,
      fileSizeKb: 2150,
      status: 'SUCCESS',
    },
    {
      id: 'mock-4',
      timestamp: new Date(Date.now() - 2500000).toISOString(),
      ip: '185.12.88.2',
      tool: 'old-photo',
      action: 'Colorization & Restoring',
      durationMs: 3100,
      fileSizeKb: 1100,
      status: 'SUCCESS',
    },
    {
      id: 'mock-5',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      ip: '90.1.23.44',
      tool: 'enhance',
      action: 'Auto HDR Enhance',
      durationMs: 1550,
      fileSizeKb: 3400,
      status: 'FAILED',
      errorMessage: 'Upload file size exceeded max limit.',
    }
  ],
};

// Global cache object to survive NextJS hot reloads
const globalStore = globalThis as unknown as {
  __analytics_stats?: AnalyticsStats;
};

if (!globalStore.__analytics_stats) {
  globalStore.__analytics_stats = DEFAULT_STATS;
}

export const db = {
  getStats: (): AnalyticsStats => {
    return globalStore.__analytics_stats!;
  },

  logRequest: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
    const stats = globalStore.__analytics_stats!;
    const newEntry: LogEntry = {
      ...entry,
      id: `log-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
    };

    stats.totalRequests += 1;
    if (newEntry.status === 'SUCCESS') {
      stats.successCount += 1;
    } else {
      stats.failCount += 1;
    }
    stats.totalDurationMs += newEntry.durationMs;

    if (!stats.toolUsage[newEntry.tool]) {
      stats.toolUsage[newEntry.tool] = 0;
    }
    stats.toolUsage[newEntry.tool] += 1;

    // Prepend log to stack, keep last 100 entries
    stats.logs = [newEntry, ...stats.logs].slice(0, 100);
  },

  resetStats: () => {
    globalStore.__analytics_stats = {
      totalRequests: 0,
      successCount: 0,
      failCount: 0,
      totalDurationMs: 0,
      toolUsage: {},
      logs: [],
    };
  }
};
