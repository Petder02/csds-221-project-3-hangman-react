// Attempting to fetch random game data via rawger api
import axios from "axios";

const rawgAPIKey = "9d9730d8590b4ffbbbd3a9e539238fcd";

// Generate a random integer, given a maximum
function genRandInt(max) {
  return Math.floor(Math.random() * max);
}

// Generates a random page number from Rawg (i.e., the count)
// This page will contain the random game that we will select
async function getRawgCount() {
  try {
    const response = await axios({
      url: `https://api.rawg.io/api/games?key=${rawgAPIKey}&page_size=1`,
      method: "GET",
      headers: { "User-Agent": "Random Game Picker" }
    });

    return response.data.count;
  } catch (err) {
    console.error("An error occurred when getting the page number -> " + err);
  }
}

// Gets the rawg slug for the game
// This consists of the title of the game, all lower case, with spaces as dashes
async function getRawgSlug(number) {
  try {
    const resp = await axios({
      url: `https://api.rawg.io/api/games?key=${rawgAPIKey}&page=${number}&page_size=1`,
      method: "GET",
      headers: { "User-Agent": "Random Game Picker" }
    });

    return resp.data.results[0].slug;
  } catch (err) {
    console.error("An error occured when getting the slug -> " + err);
  }
}

// Function which picks a random game from the rawg api and returns a
// promise containing the data for the game
export async function pickRandGame() {
  let count = await getRawgCount();
  console.log(count);
  let randNumber = genRandInt(count);
  console.log(randNumber);
  let slug = await getRawgSlug(randNumber);
  return slug;
}
