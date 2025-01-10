import { GameDomain } from "@/entities/game";
import { GameId } from "@/kernel/ids";
import { useEventsSource } from "@/shared/lib/sse/client";
import { routes } from "@/kernel/routes";

export function useGame(gameId: GameId) {
  const { isPending, dataStream } = useEventsSource<GameDomain.GameEntity>(
    routes.gameStream(gameId),
  );

  return {
    game: dataStream,
    isPending,
  };
}
