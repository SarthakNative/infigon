import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          Something went wrong
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}