export const getEvent = async (id: string): Promise<Team> => {
  try {
    const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${id}`,
      { cache: "no-cache" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch event with id: ${id}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};
