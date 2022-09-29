import { setupWorker, SetupWorkerApi } from "msw";
import { useEffect, useState } from "react";
import { FoodResponse } from "./DevTools";
import { getHandlers } from "./handlers";

export type WorkerConfig = {
  foodResponse: FoodResponse;
};

export function useWorker(config: WorkerConfig) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const worker = setupWorker(...getHandlers(config));

    const startWorker = async (worker: SetupWorkerApi) => {
      await worker.start();
      setIsReady(true);
    };

    startWorker(worker);
  }, []);

  return isReady;
}
