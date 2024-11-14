// NOTE: This file is not used on JavaScript, but used in Google Apps Script. Learn More: https://script.google.com/home/start
// Used chatGPT on this. To find your clientID and clientSecret, go to https://osu.ppy.sh/home/account/edit#:~:text=End%20Session-,OAuth,-authorized%20clients

const clientId = "client_ID";
const clientSecret = "client_SECRET";
let accessToken = "";

// Function to get a new access token from osu!
function getAccessToken() {
  const tokenUrl = "https://osu.ppy.sh/oauth/token";
  const payload = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
    scope: "public",
  };
  
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  };

  const response = UrlFetchApp.fetch(tokenUrl, options);
  const data = JSON.parse(response.getContentText());
  accessToken = data.access_token;
}

// Function to fetch a user's global ranking from osu!
function getUserRanking(username) {
  if (!accessToken) getAccessToken(); // Ensure we have a valid access token

  const url = `https://osu.ppy.sh/api/v2/users/${username}`;
  const options = {
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = UrlFetchApp.fetch(url, options);
  const userData = JSON.parse(response.getContentText());
  return userData.statistics.global_rank; // Returns the global rank of the user
}

// Main web app function to handle requests
function doGet(e) {
  const username = e.parameter.username; // Get username from URL parameter
  const globalRanking = getUserRanking(username);
  return ContentService.createTextOutput(`Global Ranking for ${username}: ${globalRanking}`);
}