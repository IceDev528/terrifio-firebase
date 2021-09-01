/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /*All modifications and lines listed as Mod are not included in the above apache license 2.0.
  *
  *
  */
  'use strict';

  const functions = require('firebase-functions');
  const admin = require('firebase-admin');
  // const serviceAccount = require("./adminsdk.json");
  const serviceAccount = require("./testruslan-7e9ec-firebase-adminsdk-hwqck-9f601d8a00.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testruslan-7e9ec.firebaseio.com"
  });
  const logging = require('@google-cloud/logging');
  // const stripe = require('stripe')(functions.config().stripe.token);
  const stripe = require('stripe')('sk_test_Vdu9zyakiCQ9PjO1cnvHNLyM00sY9LQSVI');
  const currency = 'USD';
 // const endpointSecret = functions.config().keys.signing; //Mod
 var db = admin.database(); //Mod
// [START chargecustomer]
// Charge the Stripe customer whenever an amount is written to the Realtime database
exports.createStripeCharge = functions.firestore.document('stripe_customers/{userId}/charges/{id}').onCreate(async (snap, context) => {
  const val = snap.data();
  try {
        // Look up the Stripe customer id written in createStripeCustomer
        const snapshot = await admin.firestore().collection(`stripe_customers`).doc(context.params.userId).get()
        const snapval = snapshot.data();
        const customer = snapval.customer_id
        // Create a charge using the pushId as the idempotency key
        // protecting against double charges
        const discount = val.discount;
        const idempotencyKey = context.params.id;
        if (val.source !== null) {
          charge.source = val.source;
        }
        //I need to change this to take in a stripe charge.
        const userMeta = await admin.database().ref('user/' + context.params.userId + '/userMeta').once('value', async (snapshot)=>{
                   //If the user is currently not subscribed subscribe them.
                   if(snapshot.val().subscribed != true || typeof snapshot.val().subscribed === 'undefined'){
                     const response = await stripe.subscriptions.create({
                       customer: customer,
                       items: [{plan: 'plan_FPUaNV4lyoVwIO'}],
                       coupon: discount}, {idempotency_key: idempotencyKey}).then(function(response){
                         db.ref('user/' + context.params.userId + '/userMeta').update({
                           subscribed: response.plan.active,
                           subId: response.id,
                           current_period_end: response.current_period_end
                         }, function(){
                           console.log('RTDB Should be Updated');
                         });
                         return snap.ref.set(response, { merge: true });

                       }, async function(error){
                         console.log(error);
                         await snap.ref.set({error: userFacingMessage(error)}, { merge: true });
                         return reportError(error, {user: context.params.userId});
                       });
                      // If the result is successful, write it back to the database

                    }else {
                      console.log('User attempted to subscribe again')
                      return null;
                    }
        }); //Mod

        


        //Also update user info about subscription and plan.

        
      } catch(error) {
        // We want to capture errors and render them in a user-friendly way, while
        // still logging an exception with StackDriver
        console.log(error);
        await snap.ref.set({error: userFacingMessage(error)}, { merge: true });
        return reportError(error, {user: context.params.userId});
      }
    });
// [END chargecustomer]]

// When a user is created, register them with Stripe
exports.createStripeCustomer = functions.auth.user().onCreate(async (user) => {
  admin.database().ref('user/' + user.uid + '/userMeta').update({
    role : 'inventor',
    subscribed : true
  });
  const customer = await stripe.customers.create({email: user.email, metadata: {uid: user.uid}});
  return admin.firestore().collection('stripe_customers').doc(user.uid).set({customer_id: customer.id});
  
});

// Add a payment source (card) for a user by writing a stripe payment source token to Realtime database
exports.addPaymentSource = functions.firestore.document('/stripe_customers/{userId}/tokens/{pushId}').onCreate(async (snap, context) => {
  const source = snap.data();
  const token = source.token;
  if (source === null){
    return null;
  }

  try {
    const snapshot = await admin.firestore().collection('stripe_customers').doc(context.params.userId).get();
    const customer =  snapshot.data().customer_id;
    const response = await stripe.customers.createSource(customer, {source: token});
    return admin.firestore().collection('stripe_customers').doc(context.params.userId).collection("sources").doc(response.fingerprint).set(response, {merge: true});
  } catch (error) {
    await snap.ref.set({'error':userFacingMessage(error)},{merge:true});
    return reportError(error, {user: context.params.userId});
  }
});
//Webhook to capture failed/Cancled payment
// exports.endSub = functions.https.onRequest((req,res) => {

//   let sig = req.headers["stripe-signature"];

//   try {
//     let event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
//     console.log(event)
//     if (event.type == "invoice.payment_failed"){
//       // const planId = 
//       // const customerId = 


//     }
//     return res.json({received: true});

//     console.log(req);
//   } catch (err) {
//     return res.status(400).end();
//   }
  

// });//Mod


exports.campaignSubscribeUser = functions.database.ref('/leadGen/{campaignId}/accounts/{accountRef}').onCreate(async (snapshot, context) => {
	if(snapshot.val()){
		//If a user is added with a code, subscribe them 
		//ToDo: Add a point for reason (Trial / Condition) 
		admin.database().ref('/user/'+ snapshot.val().uid + '/userMeta/').update({subscribed: true}, (err) => {
			if(err){
				console.log(err);
			}
		}); 
	}
});

// Delete sub element in database, unsubscribe stripe

exports.cancelSubscription = functions.database.ref('/user/{userId}/userMeta/').onUpdate(async (snapshot, context) => {

  //Send cancel event, endSub will recieve the webhook which will be programmed to update the details in firestore
  if (snapshot.after.val().cancel_sub === null){
    console.log('null, nothing was set');
    return null
  }else if (snapshot.after.val().cancel_sub == true && (typeof snapshot.after.val().cancel_at_period_end === 'undefined' || snapshot.after.val().cancel_at_period_end == false)){
    try{
      await stripe.subscriptions.update(snapshot.after.val().subId, {cancel_at_period_end: true}).then((response)=>{
        console.log(response)
        return db.ref('user/' + context.params.userId + '/userMeta').update({
          cancel_at_period_end: response.cancel_at_period_end,
          period_end: response.current_period_end
        });
      });

    }
    catch (err)
    {
      db.ref('user/' + context.params.userId + '/userMeta').update({
        error: 'Error unsubscribing from plan'
      }, function(){
        console.log('RTDB Should be Updated');
      });
      return console.log(err)

    } 
  }else {

    console.log('False or other value in cancel');
    return null;

  }
// Need to add a 'resubscribe' option when cancel set to false.



}); //Mod

// When a user deletes their account, clean up after them
exports.cleanupUser = functions.auth.user().onDelete(async (user) => {
  const snapshot = await admin.firestore().collection('stripe_customers').doc(user.uid).get();
  const customer = snapshot.data();
  await stripe.customers.del(customer.customer_id);
  return admin.firestore().collection('stripe_customers').doc(user.uid).delete();
});

// To keep on top of errors, we should raise a verbose error report with Stackdriver rather
// than simply relying on console.error. This will calculate users affected + send you email
// alerts, if you've opted into receiving them.
// [START reporterror]
function reportError(err, context = {}) {
  // This is the name of the StackDriver log stream that will receive the log
  // entry. This name can be any valid log stream name, but must contain "err"
  // in order for the error to be picked up by StackDriver Error Reporting.
  const logName = 'errors';
  const log = logging.log(logName);

  // https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
  const metadata = {
    resource: {
      type: 'cloud_function',
      labels: {function_name: process.env.FUNCTION_NAME},
    },
  };

  // https://cloud.google.com/error-reporting/reference/rest/v1beta1/ErrorEvent
  const errorEvent = {
    message: err.stack,
    serviceContext: {
      service: process.env.FUNCTION_NAME,
      resourceType: 'cloud_function',
    },
    context: context,
  };

  // Write the error log entry
  return new Promise((resolve, reject) => {
    log.write(log.entry(metadata, errorEvent), (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
}
// [END reporterror]

// Sanitize the error message for the user
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// function send(res, code, body) {
//     res.send({
//         statusCode: code,
//         headers: {'Access-Control-Allow-Origin': '*'},
//         body: JSON.stringify(body),
//     });
// }
// app.use((req, res, next) => {
//      res.header("Access-Control-Allow-Origin", "*");
//      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//      if (req.method === 'OPTIONS') {
//          res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
//          return res.status(200).json({});
//      }
//      next();
// });


app.post('/', (request, response) => {
  console.log("aaa", request.body.user_id);
  const uid = request.body.user_id;
  let useremail;
  // admin.auth().getUser(uid)
  // .then(function(userRecord) {
  //   // See the tables below for the contents of userRecord
  //   console.log("Successfully fetched user data:", userRecord.toJSON());
  // })
  // .catch(function(error) {
  //   console.log("Error fetching user data:", error);
  // })
 
  // return response.send(listAllUsers());
  // console.log("totoal", await listAllUsers());
  listAllUsers();
  
  function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken)
    .then(async function(listUsersResult) {
      var uEmail="";
      
      let promise = new Promise((resolve, reject)=> {
        listUsersResult.users.forEach(function(userRecord) {
          if(uid == userRecord.toJSON().uid){
            uEmail = userRecord.toJSON().email;
            console.log('userEmail', uEmail);
            // return JSON.stringify(uEmail);
            resolve(uEmail);
            return response.send({"uEmail": uEmail});
          }
        });
      }); 
       useremail = await promise;
       console.log("result", useremail);

      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
    });
  }



  // return JSON.stringify(request.user_id);
});



exports.getEmail = functions.https.onRequest(app);

function userFacingMessage(error) {
  return error.type ? error.message : 'An error occurred, developers have been alerted';
}