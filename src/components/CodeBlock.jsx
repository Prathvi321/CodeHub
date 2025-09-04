import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const CodeBlock = ({ code, language = 'javascript', title }) => {
  const [copied, setCopied] = useState(false);
  const { isDark } = useTheme();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  return (
    <div className="relative group">
      {title && (
        <div className="bg-dark-800 dark:bg-dark-700 text-cream-100 px-4 py-2 text-sm font-medium rounded-t-lg border-b border-dark-600">
          {title}
        </div>
      )}
      
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="absolute top-3 right-3 z-10 p-2 bg-dark-700 hover:bg-dark-600 text-cream-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
          title="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </motion.button>

        <SyntaxHighlighter
          language={language}
          style={isDark ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            borderRadius: title ? '0 0 0.5rem 0.5rem' : '0.5rem',
            fontSize: '14px',
            lineHeight: '1.5',
            padding: '1rem',
            backgroundColor: isDark ? '#0f0f23' : '#fafafa',
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            color: isDark ? '#6b7280' : '#9ca3af',
            fontSize: '12px',
            paddingRight: '1rem',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;