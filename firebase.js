var admin = require("firebase-admin");

var serviceAccount = require("./key/blog-cbc99-firebase-adminsdk-kpift-c30ba35785.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
