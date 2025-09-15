import { useEffect } from 'react';

export function Celebration({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow text-center space-y-4">
        <div className="text-5xl animate-bounce">🎉</div>
        <p className="text-lg">Congratulations! All sections passed!</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Celebration;
