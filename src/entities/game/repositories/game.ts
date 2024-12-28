import { prisma } from "@/shared/lib/db";
import { GameEntity, GameIdleEntity, GameOverEntity } from "../domain";
import { Game, GameStatus, Prisma, User } from "@prisma/client";
import { z } from "zod";

const fieldSchema = z.array(z.union([z.string(), z.null()]));

async function gamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    include: {
      winner: true,
      players: true,
    },
  });

  return games.map(dbGameToGameEntity);
}

function dbGameToGameEntity(
  game: Game & {
    players: User[];
    winner?: User | null;
  },
): GameEntity {
  switch (game.status) {
    case "idle": {
      const [creator] = game.players;
      if (!creator) {
        throw new Error("creator shoud be in game idle");
      }
      return {
        id: game.id,
        creator: creator,
        status: game.status,
        field: fieldSchema.parse(game.field),
      } satisfies GameIdleEntity;
    }
    case "inProgress":
    case "gameOverDraw": {
      return {
        id: game.id,
        players: game.players,
        status: game.status,
        field: fieldSchema.parse(game.field),
      };
    }
    case "gameOver": {
      if (!game.winner) {
        throw new Error("winner shoud be in game over");
      }
      return {
        id: game.id,
        players: game.players,
        status: game.status,
        field: fieldSchema.parse(game.field),
        winner: game.winner,
      } satisfies GameOverEntity;
    }
  }
}

export const gameRepository = {
  gamesList,
};
