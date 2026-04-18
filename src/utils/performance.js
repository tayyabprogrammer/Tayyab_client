/**
 * Performance Monitoring Utility
 * Tracks Core Web Vitals in production
 * Usage: Import and call logWebVitals() in main.jsx
 */

// Store vitals data
const vitals = [];

/**
 * Get Core Web Vitals using web-vitals library
 * Requires: npm install web-vitals
 */
export const logWebVitals = async () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[DevMode] Web Vitals monitoring disabled');
    return;
  }

  try {
    // Dynamically import web-vitals to keep bundle small
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

    // Largest Contentful Paint (LCP) - How quickly main content loads
    getLCP((metric) => {
      console.log('LCP (Largest Contentful Paint):', metric.value + 'ms');
      trackMetric(metric);
    });

    // First Input Delay (FID) - How quickly page responds to user
    getFID((metric) => {
      console.log('FID (First Input Delay):', metric.value + 'ms');
      trackMetric(metric);
    });

    // Cumulative Layout Shift (CLS) - How much layout shifts unexpectedly
    getCLS((metric) => {
      console.log('CLS (Cumulative Layout Shift):', metric.value);
      trackMetric(metric);
    });

    // First Contentful Paint (FCP) - When first content appears
    getFCP((metric) => {
      console.log('FCP (First Contentful Paint):', metric.value + 'ms');
      trackMetric(metric);
    });

    // Time to First Byte (TTFB) - Server response time
    getTTFB((metric) => {
      console.log('TTFB (Time to First Byte):', metric.value + 'ms');
      trackMetric(metric);
    });
  } catch (error) {
    console.warn('Web vitals monitoring error:', error);
  }
};

/**
 * Track individual metrics
 * In production, send to analytics service like:
 * - Google Analytics
 * - Sentry
 * - LogRocket
 * - Datadog
 */
const trackMetric = (metric) => {
  vitals.push(metric);

  // Send to analytics service (example)
  if (window.gtag && process.env.VITE_PRODUCTION) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'web-vitals',
    });
  }

  // Send to custom endpoint
  if (process.env.VITE_ANALYTICS_ENDPOINT) {
    navigator.sendBeacon(
      process.env.VITE_ANALYTICS_ENDPOINT,
      JSON.stringify({
        metric: metric.name,
        value: metric.value,
        timestamp: new Date().toISOString(),
      })
    );
  }
};

/**
 * Get all tracked vitals
 */
export const getTrackedVitals = () => vitals;

/**
 * Performance marks for custom measurements
 * Usage: markStart('operation'); ... markEnd('operation');
 */
export const markStart = (name) => {
  if (performance.mark) {
    performance.mark(`${name}-start`);
  }
};

export const markEnd = (name) => {
  if (performance.mark && performance.measure) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);

    const measures = performance.getEntriesByName(name);
    if (measures.length > 0) {
      console.log(`${name}: ${measures[0].duration.toFixed(2)}ms`);
    }
  }
};

/**
 * Check if user has requested reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Monitor long tasks (operations taking > 50ms)
 * Requires browser support
 */
export const initLongTaskMonitoring = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn('Long task detected:', {
            name: entry.name,
            duration: entry.duration + 'ms',
            startTime: entry.startTime + 'ms',
          });
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
    } catch (error) {
      console.log('Long task monitoring not supported');
    }
  }
};

/**
 * Memory usage monitoring (experimental)
 */
export const getMemoryUsage = () => {
  if (performance.memory) {
    return {
      usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
      totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
      jsHeapSizeLimit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB',
    };
  }
  return null;
};

/**
 * Get memory usage percentage
 */
export const getMemoryPercentage = () => {
  if (performance.memory) {
    const percentage = (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100;
    return percentage.toFixed(2) + '%';
  }
  return null;
};

/**
 * Warns if memory usage exceeds threshold (default: 80%)
 */
export const checkMemoryThreshold = (threshold = 80) => {
  const percentage = getMemoryPercentage();
  if (percentage && parseFloat(percentage) > threshold) {
    console.warn(`Memory usage high: ${percentage}`);
    return true;
  }
  return false;
};

export default {
  logWebVitals,
  getTrackedVitals,
  markStart,
  markEnd,
  prefersReducedMotion,
  initLongTaskMonitoring,
  getMemoryUsage,
  getMemoryPercentage,
  checkMemoryThreshold,
};
