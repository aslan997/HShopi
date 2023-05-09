// Create and send token and save it in cookie

const sendToken = (user, statusCode, res) => {
  //Create jwt token
  const token = user.getJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // It should be true else it wont be httponly and can be accessed using frontend
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
