import { prisma } from "@/shared/lib/db";
import { Button } from "@/shared/ui/button";

export default async function Home() {
  const games = await prisma.game.findMany();

  console.log(games);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="mb-3">
        <Button size="lg" variant="ghost">
          Hello!
        </Button>
      </div>

      <div>
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              {game.id} - {game.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
