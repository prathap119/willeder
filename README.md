# willeder

1. env
# .env.prod
NODE_ENV=true


# sendgrid
SENDGRID_API_KEY=SG.AIzaSyBrZ3FM3lbnAX6-F1F-Kb6eq8U8zHTx6dE
# SENDGRID_FROM_EMAIL=

# jwt
JWT_SECRET="SECRET"
JWT_REFRESH_SECRET='refresh'
REFRESH_TOKEN_EXPIRED_IN=15m 
JWT_ACCESS_SECRET='access'
ACCESS_TOKEN_EXPIRED_IN=7d 


2. src/utils/serviceAccounts/firebase-dev-json

 {
  "apiKey": "AIzaSyDNrzbdQDWHs0OH9Wgn2SxUiRmArV6iaZA",
  "authDomain": "node-task-23e5e.firebaseapp.com",
  "projectId": "node-task-23e5e",
  "storageBucket": "node-task-23e5e.appspot.com",
  "messagingSenderId": "977391925475",
  "appId": "1:977391925475:web:404ce1a6c2542082fc6dd6",
  "measurementId": "G-S9DEWB1MHG"
  }

 3.commend 
 # npm run serve:dev
 # npm test

 4.firebase
  https://console.firebase.google.com/project/node-task-23e5e/overview