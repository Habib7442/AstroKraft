"use client";

interface OfflineControlsProps {
  retryText: string;
  backHomeText: string;
  locale: string;
}

export function OfflineControls({ retryText, backHomeText, locale }: OfflineControlsProps) {
  const handleRetry = () => {
    window.location.reload();
  };

  const handleBackHome = () => {
    window.location.href = `/${locale}`;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
      <button
        onClick={handleRetry}
        className="w-full sm:w-auto px-6 py-3 bg-[#FFC000] text-black font-black border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] rounded-xl transition-all cursor-pointer text-sm"
      >
        {retryText}
      </button>
      <button
        onClick={handleBackHome}
        className="w-full sm:w-auto px-6 py-3 bg-white text-black font-black border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] rounded-xl transition-all cursor-pointer text-sm"
      >
        {backHomeText}
      </button>
    </div>
  );
}
