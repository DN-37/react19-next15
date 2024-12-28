import { getIdleGames } from "@/entities/game/server";
import { Card, CardContent, CardTitle } from "@/shared/ui/card";

export async function GamesList() {
  const games = await getIdleGames();

  return (
    <div>
      {games.map((game) => {
        return (
          <Card key={game.id}>
            <CardTitle>Организатор: {game.creator.login}</CardTitle>
            <CardContent>Рейтинг: {game.creator.rating}</CardContent>
          </Card>
        );
      })}
    </div>
  );
}
