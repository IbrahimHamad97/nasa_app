const HttpSignOut = (req, res) => {
  res.status(200).json({ message: "You are logged" });
};

const HttpGetSecret = (req, res) => {
  res.status(200).json({ message: "You are logged in!!!" });
};

const isLoggedIn = (req, res, next) => {
  const loggedIn = false;
  if (!loggedIn) return res.status(401).json({ error: "Please log in!" });
  next();
};

module.exports = {
  HttpGetSecret,
  isLoggedIn,
  HttpSignOut,
};
