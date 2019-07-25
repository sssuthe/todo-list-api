const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

var router = express.Router();


// Set up Auth0 configuration
const authConfig = {
  domain: "dev-b6-e-5pf.auth0.com",
  audience: "https://api.shark-ops.com"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-b6-e-5pf.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

// Define an endpoint that must be called with an access token
router.get("/", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  });
});

module.exports = router;
