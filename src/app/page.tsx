import { GamesList } from "@/features/games-list/server";

export default async function Home() {
  return (
    <div>
      <GamesList />
    </div>
  );
}
