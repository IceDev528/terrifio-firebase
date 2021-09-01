	const app = new Vue({
		el: '#app',
		data() {
			return {
				numAccount: '',
				numReport: '5',
				avgTime: '0:5:43s',
				avgScore: 300,
				avgProg: 1.5,
				avgRepo: 75,
				avgBudget: '15,000',
				campaignId:'',
				accounts: [],
				emails: []
				// emails:[]

			}
		},



		methods: {
			setCampaign:async function(){
				this.campaignId = getQueryVariable('cid');

			},

			getCampaign: function(){
		      // console.log("bbb",firebase.database().ref('/leadGen/'));
		      firebase.database().ref('/leadGen/').on('value', function (snapshot) {
		      	this.accounts = snapshot.val();
		      	console.log("aaa", this.accounts);
		      // return snapshot.val();
  				});
  			},

			getEmailList:  function (temp)
			{
				  // const FIREBASE_FUNCTION = 'http://localhost:5001/testruslan-7e9ec/us-central1/getEmail';
				  const FIREBASE_FUNCTION = 'https://us-central1-testruslan-7e9ec.cloudfunctions.net/getEmail';
			  	  const res =  fetch(FIREBASE_FUNCTION, {
			          method: 'POST',
			          headers: { 'Content-Type': 'application/json' },
			          body: JSON.stringify({ user_id: temp.uid})
			        }).then( async function (res){
			        	jMail = await res.json();
			        	console.log(temp.uid + " : " + jMail.uEmail);
			        	temp.email = jMail.uEmail;
			        	app.accounts.push( temp );
			        });

			  	  
			  	  return "";
			},
			 
		},


created() {

	this.setCampaign();
  // this.addCampaign();
  // const FIREBASE_FUNCTION = 'https://us-central1-testruslan-7e9ec.cloudfunctions.net/getEmail';
  
  var self = this;

  firebase.database().ref('/leadGen/' + this.campaignId + '/accounts').once('value', function (snapshot) {

  	console.log("key", snapshot.numChildren());
  	for(i=0; i<snapshot.numChildren(); i++){
  		console.log("aaa",snapshot.val());
  	}
  	this.numAccount = snapshot.numChildren();
 	let reportsCnt=0;
  	snapshot.forEach(  function(child) {
  		var temp = {};
  		temp = child.val();
  		const vdv = app.getEmailList(temp);

	});
	this.numReport = reportsCnt;


  }.bind(this)); 


}

});
