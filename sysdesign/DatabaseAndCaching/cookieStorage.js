/**
 * what ----> Storage to store data on persistent data on user device
 *
 * How it Works ---> Data can be set by client/server & cookie get transmitted
 * via http call.
 * server can read cookie data(server or client) but client can read client set data. client
 * may or may not be able to read server data.
 *
 *  there can be two types of cookies
 * 1. session cookies ---> deleted when browser is closed
 * 2. persistent cookies ---> deleted when expiry date is reached
 *
 * size limit ---> 4kb per cookie
 *
 * performance ---> HTTP request / response time can be effected if cookie is large
 * as it is sent with every request.
 *
 * Data persistence --> Expiration date(persistent cookies) or browser is closed (session cookies)
 *
 * Data structure --> key: Value (value is always a string)
 *
 * security ---> Keep it HTTP only(not accessible by JS), configure expiry, sameSite attribute, secure attribute
 * domain/path to which cookie belongs to. XSS, CSRF.
 *
 * when to use ---> Authorization, small user preferences
 *
 * when not to use ---> large datasets, dont put sensitive data without proper precautions.
 *
 */

function setCookie(name, value, hoursToExpire) {
  let expires = "";
  if (hoursToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + hoursToExpire * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;"; // set expiry to past date will immeditely delete cookie
}

function logout(req, res) {
  res.setHeader("Clear-Site-Data", ' "cache", "cookies", "storage"');
  res.status(200).send("Logged out successfully");
}
