const { google } = require('googleapis');

const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/plus.me',
];

const oauth2 = google.oauth2('v2');

const Oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT
);

async function getConnectionUrl() {
    const url= await Oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope
    });
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
    getConnectionUrl,
    getUserDetails,
};