const development = {
    name: 'development',
    port: process.env.PORT,
    db: process.env.db,
    session_cookie_key: 'codiel',
    google_client_id: "333195709464-3fa098bvp9s0sgm3mrm4olg5grtch9ff.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    GITHUB_CLIENT_ID: "fa69b3705b0036303c41",
    GITHUB_CLIENT_SECRET: "511a191c1ea1dfb926e545fafc6b29da553b5005",
    GITHUB_CALLBACK_URL: "http://localhost:8000/users/auth/github/callback"
}

module.exports = development;