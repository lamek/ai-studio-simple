import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => Math.max(0, prev - step));
  const reset = () => setCount(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'ArrowUp') {
        e.preventDefault();
        increment();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        decrement();
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        reset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  return (
    <main
      id="app-container"
      className="min-h-screen w-full flex flex-col items-center justify-between bg-stone-50 text-stone-900 px-6 py-12 select-none"
    >
      {/* Top Header */}
      <header id="app-header" className="text-center">
        <h1 id="app-title" className="text-xl font-medium tracking-tight text-stone-800">
          Counter
        </h1>
        <p id="app-subtitle" className="text-xs text-stone-400 mt-1">
          Tap circle or press Space to count
        </p>
      </header>

      {/* Center Interactive Counter */}
      <div id="counter-center" className="flex flex-col items-center justify-center my-auto">
        <motion.button
          id="increment-tap-target"
          type="button"
          onClick={increment}
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-white border border-stone-200 shadow-sm cursor-pointer hover:border-stone-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
          aria-label="Increment count"
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              id="count-display"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="text-6xl sm:text-7xl font-semibold tabular-nums text-stone-900 tracking-tight"
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* Quick controls directly underneath */}
        <div id="quick-controls" className="flex items-center gap-3 mt-8">
          <button
            id="decrement-button"
            type="button"
            onClick={decrement}
            disabled={count === 0}
            aria-label="Decrease count"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 shadow-xs"
          >
            <Minus className="w-4 h-4" />
          </button>

          <button
            id="increment-button"
            type="button"
            onClick={increment}
            aria-label="Increase count"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 shadow-xs"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            id="reset-button"
            type="button"
            onClick={reset}
            disabled={count === 0}
            aria-label="Reset counter"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer Step Selector */}
      <footer id="app-footer" className="flex items-center gap-2">
        <span className="text-xs text-stone-400 mr-1">Step:</span>
        {[1, 5, 10].map((stepValue) => (
          <button
            key={stepValue}
            id={`step-button-${stepValue}`}
            type="button"
            onClick={() => setStep(stepValue)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              step === stepValue
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            +{stepValue}
          </button>
        ))}
      </footer>
    </main>
  );
}

