const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://h2s-student-management.firebaseio.com"
});

const db = firebase.database();

/*
**	callback to display users from intra
*/

const display_users = (req, err) => {
	if (req){
		console.log(req.body);
	}
	else{ 
		console.log(err);
	}
}

/*
**	Make a request to intra, passing in a token for authorization
*/

const intraRequest = (token, requestString, callback) => {
	request({
		url: requestString,
		auth: {
			'bearer': token
		}
	}, callback);
}

/*
** authenticates with intra and performs a request
*/

const authenticateIntraRequest = (requestString, callback) => {
	let tokenRequest = {
		url: 'https://api.intra.42.fr/oauth/token',
		method: 'POST',
		form: {
			'client_id': 'dd62cec75a850d4785e2ff532a414f773a0493afbbe3e8790be69bf0f2260356',
			'client_secret': '1d73dedacbd2580beeb88da46586e7354f5bedf4e4583197d835c6fa77708b59',
			'grant_type': 'client_credentials'
		}
	};
	request(tokenRequest, (err, res) => {
		if (res) {
			let json = JSON.parse(res.body);
			console.log("Access Token:", json.access_token);
			let token = json.access_token;
      intraRequest(token, requestString, callback);
      // console.log()	
		}
		else {
			console.log("res undefined");
			console.log(err);
		}
	});
}

authenticateIntraRequest('https://api.intra.42.fr/v2/cursus/17/users', display_users);

/*
const save_user = (user) => {
	let docRef = db.collection('students').doc()	
} 
*/

// TODO: Add routes
/*
 * 0. POST Add new students (Takes CSV)
 *	-> Should iterate through CSV, check if student exists and create students
 *	-> Should
 *
 * 1. GET Students
 * 	-> Should get all HackHighSchool students' short details from our DB
 *
 * 2. GET Student:id
 * 	-> Should get student details from our DB and from Intra;
 * 	-> Will update projects & check to update user information
 *
 * 3. POST StudentReport:id (Takes JSON)
 * 	-> Send student reports
 *
 * 4. DELETE Student:id
 * 5. PATCH Student:id
 * 	-> Allows updates to student info; ?? Should we update in Intra
 */

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
