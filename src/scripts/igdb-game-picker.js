// This was an attempt at a fetching data from an external api
// I keep running into a network error that I don't understand,
// and will come back to this if I have time or patience to work it out

// This is depreciated, but it is to show that I made an attempt
// and learned more about OAuth and how APIs work in the process

// Also, the reason why this fails, I think, is due to an issue with CORS
// that I cannot get around while using codesandbox. It does work on my local
// machine, just not when it is deployed to this website

//Imports
import axios from "axios";
import apicalypse from "apicalypse";

// Twitch authorization information
const twitchClientID = "9kxlcuiwcz8l4e3au161s9gs6xy379";
const twitchClientSecret = "7c6v0k4h3bs883f49j02rinpuqffud";
const authURL = `https://id.twitch.tv/oauth2/token?client_id=${twitchClientID}&client_secret=${twitchClientSecret}&grant_type=client_credentials`;

// A rough estimate of the numbe of unique games in the IGDB database
const igdbNumGames = 235950;
const rpgGenreID = 12;

// Generate a random integer, given a maximum
// Assuming there
function genRandInt(max) {
  return Math.floor(Math.random() * max);
}

// Is this object empty?
function isObjectEmpty(object) {
  return !Object.keys(object).length;
}

// Get the OAuth 2.0 authorization token for the IGDB API
async function getOAuthToken() {
  try {
    const resp = await axios({
      url: authURL,
      method: "POST"
    });

    return resp.data["access_token"];
  } catch (err) {
    console.log("An error occurred getting the auth token -> " + err);
  }
}

/**
 *
 * @param offset
 * @param genreID defaults to RPGs, but can be changed if functionality needs to change or dropped entirely
 * @returns {Promise<*>}
 */
async function getIGDBGameData(offset, genreID = rpgGenreID) {
  const twitchOAuthToken = await getOAuthToken();
  console.log(twitchOAuthToken);
  console.log(offset);
  // let genres = [genreID];
  // const genrePresent = !isNaN(genreID)
  // console.log(genres)
  let query = `fields *; limit 1; offset ${offset};`;
  let url = "http://api.igdb.com/v4/games";
  const resp = await apicalypse({
    queryMethod: "body"
  })
    .fields(["name"])
    .limit(1)
    .offset(offset)
    .request(url);
}

export default {
  /**
   * Picks a random game from the IGDB database
   * @returns {Promise<*>}
   */
  pickRandomGame: async function () {
    let offset = genRandInt(igdbNumGames);
    let game = await getIGDBGameData(offset, rpgGenreID);
    //We do not want to return an empty game
    while (isObjectEmpty(game)) {
      offset = genRandInt(igdbNumGames);
      game = await getIGDBGameData(offset, rpgGenreID);
    }
    console.log(game);
    return game;
  }
};
