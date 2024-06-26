export const getTeam = async (id: string): Promise<Team> => {
  try {
    const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${id}`,
      { cache: "no-cache" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch team with id: ${id}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching team:", error);
    throw error;
  }
};
