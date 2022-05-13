module.exports = {
  port: process.env.PORT,
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.REMOTE_APP_URL
      : process.env.LOCAL_APP_URL,
  mongoUrl: process.env.MONGO_URL,
};
