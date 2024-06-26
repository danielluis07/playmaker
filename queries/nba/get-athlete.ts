export const getNbaAthlete = async (id: string): Promise<Athlete> => {
  try {
    const res = await fetch(
      `https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/athletes/${id}?lang=en&region=us`,
      { cache: "no-cache" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch nba team with id: ${id}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching team:", error);
    throw error;
  }
};
