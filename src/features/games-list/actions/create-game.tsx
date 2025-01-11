"use server";

import { createGame } from "@/entities/game/server";
import { prisma } from "@/shared/lib/db";
import { left } from "@/shared/lib/either";
import { redirect } from "next/navigation";
import { routes } from "@/kernel/routes";

export const createGameAction = async () => {
  const user = await prisma.user.findFirst();

  if (!user) {
    return left("user-not-found" as const);
  }

  const gameResult = await createGame(user);

  if (gameResult.type === "right") {
    redirect(routes.game(gameResult.value.id));
  }

  return gameResult;
};
