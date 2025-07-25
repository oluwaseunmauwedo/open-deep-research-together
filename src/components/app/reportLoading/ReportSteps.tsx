import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type ReportStepType = {
  id: string;
  title: string;
  status: "pending" | "completed" | "loading";
};

export const ReportSteps = ({
  chatId,
  researchStartedAt,
  steps,
}: {
  chatId: string;
  researchStartedAt: Date;
  steps: ReportStepType[];
}) => {
  const router = useRouter();
  const [isCanceling, setIsCanceling] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedSeconds(
        Math.floor((Date.now() - researchStartedAt.getTime()) / 1000)
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [researchStartedAt]);

  const onCancel = async () => {
    setIsCanceling(true);
    await fetch("/api/cancel", {
      method: "POST",
      body: JSON.stringify({ chatId: chatId }),
    });
    router.replace("/");
    router.refresh();
    setIsCanceling(false);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white border-[0.7px] border-[#d1d5dc] md:min-w-[206px] h-fit md:sticky z-[20] md:top-5">
      <div className="flex-shrink-0 h-[68px] p-4 flex flex-col justify-center border-b-[0.7px] border-[#d1d5dc]">
        <p className="text-base font-medium text-left text-[#101828]">
          Generating Report
        </p>
        <p className="text-xs text-left text-[#6a7282]">
          <span className="text-sm font-light text-left text-[#6a7282]">
            Time elapsed:
          </span>
          <span className="text-sm text-left text-[#6a7282] ml-1">
            {elapsedSeconds < 120
              ? `${elapsedSeconds}s ago`
              : `${Math.floor(elapsedSeconds / 60)}m ago`}
          </span>
        </p>
      </div>
      <div className="flex flex-col px-2 py-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="flex items-center gap-2 px-2 py-2.5 rounded"
          >
            <img
              src={
                step.status === "completed"
                  ? "/reportStep/completed.svg"
                  : step.status === "loading"
                  ? "/reportStep/loading.svg"
                  : "/reportStep/pending.svg"
              }
              className={cn(
                "size-3",
                step.status === "loading" ? "animate-spin" : ""
              )}
              alt={`${step.status} icon`}
            />
            <p
              className={`text-sm text-left ${
                step.status === "pending" ? "text-[#d1d5dc]" : ""
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>

      <button
        disabled={isCanceling}
        onClick={onCancel}
        className="px-4 py-3 text-sm font-light text-left text-[#826a6a] cursor-pointer"
      >
        {isCanceling ? <>Cancelling search...</> : <>Cancel search</>}
      </button>
    </div>
  );
};
