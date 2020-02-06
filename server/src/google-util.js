const { google } = require('googleapis');

/*******************/
/** CONFIGURATION **/
/*******************/

// const googleConfig = {
//     clientId: process.env.GOOGLE_CLIENT_ID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET, // e.g. _ASDFA%DFASDFASDFASD#FAD-
//     redirect: process.env.GOOGLE_REDIRECT, // this must match your google api settings
// };

const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/plus.me',
];

/*************/
/** HELPERS **/
/*************/

const oauth2 = google.oauth2('v2');

const Oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT
);

function getConnectionUrl() {
    return Oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope
    });
}
// Create a Google URL and send to the client to log in the user.

function urlGoogle() {
    const url = getConnectionUrl();
    return url;
}

async function getUserDetails(code) {
    const { tokens } = await Oauth2Client.getToken(code);
    Oauth2Client.setCredentials(tokens);
    //retreive user info
    const user_info = await oauth2.userinfo.get({ auth: Oauth2Client });
    if (user_info.status == 200)
        return user_info;
    throw new Error(user_info.status);
}

module.exports = {
    urlGoogle,
    getUserDetails,
};