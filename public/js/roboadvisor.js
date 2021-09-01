jQuery(function(){
	jQuery('.datePicker').dateDropper();
  jQuery('input[name="inwhich"]').click(function(){
    console.log(jQuery('.uk-radio[name="inwhich"]:checked').val())
    if(jQuery('.uk-radio[name="inwhich"]:checked').val() == "Other"){
      jQuery("#extraCountry").show();

      jQuery("#extraCountry > select").attr("name","country");

      jQuery( "#extraCountry > select" ).change(function () {
        var str = "";
        jQuery( "#extraCountry > select > option:selected" ).each(function() {
          str += $( this ).val();
          console.log(str)
        });
        jQuery( "#otherCountry" ).val( str );
      }).change();
    }
    else{
      jQuery("#extraCountry").hide();

      jQuery("#extraCountry > select[name='country']").removeAttr("name","country");

      jQuery("#otherCountry").val("Other");
    }
  });
});

function navControl(item){
	switch(item){
		case 'showDis':
		jQuery('#disclosureItem').show();
		jQuery('#secretNext').attr('uk-switcher-item','next');
		
    jQuery('#tab_6_prev').attr('uk-switcher-item', 'previous')
    break;
    case 'hideDis':
    jQuery('#secretNext').attr('uk-switcher-item','6');
    jQuery('#disclosureItem').hide();
    jQuery('#tab_6_prev').attr('uk-switcher-item', '4')
    break;
    case 'showComm':
    jQuery('#commercialItem').show();
    jQuery('#commercialNext').attr('uk-switcher-item','next');
    jQuery('#sub_prev').attr('uk-switcher-item', 'previous');
    break;
    case 'hideComm':
    jQuery('#commercialItem').hide();
    jQuery('#commercialNext').attr('uk-switcher-item','8');
    jQuery('#sub_prev').attr('uk-switcher-item','6')
    break;
    case 'showCommLess':
    jQuery('#tab_5_next').attr('uk-switcher-item','next');
    jQuery('#sub_prev').attr('uk-switcher-item', 'previous');
    jQuery('#commRoot').show();
    break;
    case 'hideCommMore':
    jQuery('#tab_5_next').attr('uk-switcher-item','8');
    jQuery('#sub_prev').attr('uk-switcher-item','5')
    jQuery('#commRoot').hide();
    break;
    default:
    break;
  }
};

function disableInput(state){
  if(state == false){
    jQuery('#datePicker').show(); 
    jQuery('#less').removeAttr('disabled'); 
    jQuery('#lessValid').removeAttr('disabled');
  }
  else{
    jQuery('#datePicker').hide(); 
    jQuery('#less').prop('disabled', true); 
    jQuery('#lessValid').prop('disabled', true);

  }
}

function disableInputLaunch(state){
  if(state == false){
    jQuery('#datePickerLaunch').show(); 
    jQuery('#lessLaunch').removeAttr('disabled'); 
    jQuery('#lessValidLaunch').removeAttr('disabled');
  }
  else{
    jQuery('#datePickerLaunch').hide(); 
    jQuery('#lessLaunch').prop('disabled', true); 
    jQuery('#lessValidLaunch').prop('disabled', true);
  }
}

function disableInputComm(state){
  if(state == false){
    jQuery('#datePickerComm').show(); 
    jQuery('#lessComm').removeAttr('disabled'); 
    jQuery('#lessValidComm').removeAttr('disabled');
  }
  else{
    jQuery('#datePickerComm').hide(); 
    jQuery('#lessComm').prop('disabled', true); 
    jQuery('#lessValidComm').prop('disabled', true);
  }
}


var i = 1;
function validate(tab){
  console.log('ran validation');
  switch(tab){
    case 'tab1':
    if(jQuery('#formname').val() == null || jQuery('#formname').val() == ''){
      jQuery('#formname').addClass('uk-form-danger');
      jQuery('#formname').removeClass('uk-form-success');
      jQuery('#switcher-nav .uk-active').removeClass('uk-active');
      jQuery('#switcher-nav li:nth-child(2)').addClass('uk-active');
      return false;


    }else{
      jQuery('#formname').addClass('uk-form-success');
      jQuery('#formname').removeClass('uk-form-danger');
      return true;
    }
    break;
    case 'tab2':
    if(jQuery('.uk-radio[name="whatkind"]:checked').val() == null || jQuery('.uk-radio[name="whatkind"]:checked').val() == ''){
      jQuery('#switcher-nav .uk-active').removeClass('uk-active');
      jQuery('#switcher-nav li:nth-child(3)').addClass('uk-active');

      jQuery('#type h4').removeClass('uk-hidden');
                    // jQuery(el).attr('uk-switcher-item', '');
                    // jQuery(el).addClass('uk-disabled');
                    console.log('validation incorrect');
                    return false;


                  }else{
                    //console.log(jQuery('.uk-radio[name="whatkind"]').val());
                    jQuery('#type h4').addClass('uk-hidden');
                    
                    // jQuery(el).attr('uk-switcher-item', 'next');
                    // jQuery(el).removeClass('uk-disabled');
                    if(jQuery('.uk-radio[name="whatkind"]:checked').val() == 'Combo'){
                    	jQuery('typeCheckNav').removeClass('uk-hidden');
                    	jQuery('typeCheck').removeClass('uk-hidden');
                    	i=i+1;
                    }else{

                    	if(i == 2){
                    		i = 1;
                    		jQuery('typeCheckNav').addClass('uk-hidden');
                    		jQuery('typeCheck').addClass('uk-hidden');
                    	}
                    }
                    console.log('Validation correct');
                    return true;
                  }
                  break;

                  case 'tab3':
                  if(jQuery('.uk-radio[name="inwhich"]:checked').val() == null || jQuery('.uk-radio[name="inwhich"]:checked').val() == ''){
                    jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                    jQuery('#switcher-nav li:nth-child(4)').addClass('uk-active');
                    jQuery('#where h4').removeClass('uk-hidden');

                    // jQuery(el).attr('uk-switcher-item', '');
                    // jQuery(el).addClass('uk-disabled');
                    console.log('validation incorrect');
                    return false;


                  }else{
                    console.log(jQuery('.uk-radio[name="inwhich"]').val());
                    jQuery('#where h4').addClass('uk-hidden');

                    // jQuery(el).attr('uk-switcher-item', 'next');
                    // jQuery(el).removeClass('uk-disabled');
                    console.log('Validation correct');
                    return true;
                  }
                  break;
                  case 'tab4':
                  if(jQuery('.uk-radio[name="isyour"]:checked').val() == null || jQuery('.uk-radio[name="isyour"]:checked').val() == ''){
                    jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                    jQuery('#switcher-nav li:nth-child(5)').addClass('uk-active');
                    jQuery('#secret h4').removeClass('uk-hidden');
                    console.log('tab4 failed')
                    return false;


                  }else if (jQuery('.uk-radio[name="isyour"]:checked').val() == 'yes'){
                    console.log(jQuery('.uk-radio[name="isyour"]').val());
                    jQuery('#secret h4').addClass('uk-hidden');
                    jQuery('#comSecret').removeClass('uk-hidden');


                    console.log('yes event')


                    jQuery('#secretYes').removeClass('uk-hidden');
                    jQuery('#secretNo').addClass('uk-hidden');
                    jQuery('')
                    return true;



                  }else if(jQuery('.uk-radio[name="isyour"]:checked').val() == 'no'){
                    jQuery('#disclosure').removeClass('uk-disabled');
                    jQuery('#secret h4').addClass('uk-hidden');
                    jQuery('#secretNo').removeClass('uk-hidden');
                    jQuery('#secretYes').addClass('uk-hidden');
                    jQuery('#comSecret').addClass('uk-hidden');



                    return true;
                  }
                  break;

                  case 'tab5':
                  if(jQuery('.uk-radio[name="wasyour"]:checked').val() == null || jQuery('.uk-radio[name="wasyour"]:checked').val() == ''){
                    jQuery('#lessMore').show();
                    jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                    jQuery('#switcher-nav li:nth-child(6)').addClass('uk-active');
                    return false;


                  }else if(jQuery('.uk-radio[name="wasyour"]:checked').val() == 'Less than a year ago'){

                    // console.log(jQuery('#dateFirst').val())

                    // console.log(jQuery('#dateValid').val())
                    var dateSet = moment(jQuery('#less').val(),"DD-MM-YYYY");
                    var yearToday = moment();
                    var todayDate = moment();
                    yearToday.subtract(365, 'days');


                    
                    // if(dateSet.isAfter(yearToday)){
                    // 	jQuery('#lessYear').hide();
                    var lessThenYear = dateSet.isAfter(yearToday)
                    var afterToday = dateSet.isAfter(todayDate)
                    console.log(jQuery('#less').val());

                    // 	return true;
                    if((jQuery('#less').val() == jQuery('#lessValid').val()) && lessThenYear == true && afterToday == false) {
                      jQuery('#lessYear').hide();
                      jQuery('#moreToday').hide();
                      jQuery('#chooseDate').hide();
                      return true;
                    }else if (jQuery('#less').val() != jQuery('#lessValid').val()){

                      jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                      jQuery('#switcher-nav li:nth-child(6)').addClass('uk-active');
                      jQuery('#chooseDate').show();
                      jQuery('#lessYear').hide();
                      jQuery('#moreToday').hide();
                      return false;
                    }else if ((jQuery('#less').val() == jQuery('#lessValid').val()) && lessThenYear == false && afterToday == false)
                    {
                      jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                      jQuery('#switcher-nav li:nth-child(6)').addClass('uk-active');
                      jQuery('#lessYear').show();


                      return false;

                    }else if((jQuery('#less').val() == jQuery('#lessValid').val()) && lessThenYear == true && afterToday == true){
                      jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                      jQuery('#switcher-nav li:nth-child(6)').addClass('uk-active');
                      jQuery('#lessYear').hide();
                      jQuery('#moreToday').show();

                      return false;
                    }

                  }else{
                    jQuery('#lessMore').hide();
                  }

                  break;
                  case 'tab6':
                  if(jQuery('.uk-radio[name="comm"]:checked').val() == null || jQuery('.uk-radio[name="comm"]:checked').val() == ''){
                  //If the user doesn't select an element, keep them on this window. 
                  jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                  jQuery('#switcher-nav li:nth-child(6)').addClass('uk-active');
                  jQuery('#commercial h4').removeClass('uk-hidden');
                  console.log('tab4 failed')
                  return false;


                }else if (jQuery('.uk-radio[name="comm"]:checked').val() == 'yes'){
                  console.log(jQuery('.uk-radio[name="comm"]').val());
                  jQuery('#commercial h4').addClass('uk-hidden');
                  console.log('yes event');
                  
                  return true;



                }else if(jQuery('.uk-radio[name="comm"]:checked').val() == 'notsure'){
                  console.log(jQuery('.uk-radio[name="comm"]').val());
                  jQuery('#commercial h4').addClass('uk-hidden');
                  

                }else if(jQuery('.uk-radio[name="comm"]:checked').val() == 'no'){
                  jQuery('#commDisclosure').removeClass('uk-disabled');
                  jQuery('#commercial h4').addClass('uk-hidden');
                  
                  return true;
                }
                break;
                case 'tab7':
                if(jQuery('.uk-radio[name="wasyourcomm"]:checked').val() == null || jQuery('.uk-radio[name="wasyourcomm"]:checked').val() == ''){
                  jQuery('#lessMoreComm').show();
                  jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                  jQuery('#switcher-nav li:nth-child(8)').addClass('uk-active');
                  return false;


                }else if(jQuery('.uk-radio[name="wasyourcomm"]:checked').val() == 'Less than a year ago'){

                    // console.log(jQuery('#dateFirst').val())

                    // console.log(jQuery('#dateValid').val())
                    var dateSet = moment(jQuery('#lessComm').val(),"DD-MM-YYYY");
                    var yearToday = moment();
                    var todayDate = moment();
                    yearToday.subtract(365, 'days');

                    jQuery('#secretNo #default').addClass('uk-hidden');
                    jQuery('#secretNo #saleLess').removeClass('uk-hidden');

                    // if(dateSet.isAfter(yearToday)){
                    //  jQuery('#lessYear').hide();
                    var lessThenYear = dateSet.isAfter(yearToday);
                    var afterToday = dateSet.isAfter(todayDate);
                    console.log(jQuery('#lessComm').val());
                    if((jQuery('#lessComm').val() == jQuery('#lessValidComm').val()) && lessThenYear == true && afterToday == false) {
                      jQuery('#lessYearComm').hide();
                      jQuery('#moreTodayComm').hide();
                      jQuery('#chooseDateComm').hide();
                      return true;
                    }else if (jQuery('#lessComm').val() != jQuery('#lessValidComm').val()){

                      jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                      jQuery('#switcher-nav li:nth-child(8)').addClass('uk-active');
                      jQuery('#chooseDateComm').show();
                      jQuery('#lessYearComm').hide();
                      jQuery('#moreTodayComm').hide();
                      return false;
                    }else if ((jQuery('#lessComm').val() == jQuery('#lessValidComm').val()) && lessThenYear == false && afterToday == false)
                    {
                      jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                      jQuery('#switcher-nav li:nth-child(8)').addClass('uk-active');
                      jQuery('#lessYearComm').show();


                      return false;

                    }else if((jQuery('#lessComm').val() == jQuery('#lessValidComm').val()) && lessThenYear == true && afterToday == true){
                      jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                      jQuery('#switcher-nav li:nth-child(8)').addClass('uk-active');
                      jQuery('#lessYearComm').hide();
                      jQuery('#moreTodayComm').show();

                      return false;
                    }

                  }else{
                    jQuery('#lessMoreComm').hide();
                    jQuery('#secretNo #default').removeClass('uk-hidden');
                    jQuery('#secretNo #saleLess').addClass('uk-hidden');
                    return true;
                  }

                  break;
                  case 'tab8':
                  if(jQuery('.uk-radio[name="team"]:checked').val() == null || jQuery('.uk-radio[name="team"]:checked').val() == ''){
                    jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                    jQuery('#switcher-nav li:nth-child(9)').addClass('uk-active');

                    jQuery('#team h4').removeClass('uk-hidden');
                    // jQuery(el).attr('uk-switcher-item', '');
                    // jQuery(el).addClass('uk-disabled');
                    console.log('validation incorrect');
                    return false;


                  }else{
                    //console.log(jQuery('.uk-radio[name="whatkind"]').val());
                    jQuery('#team h4').addClass('uk-hidden');
                    
                    // jQuery(el).attr('uk-switcher-item', 'next');
                    // jQuery(el).removeClass('uk-disabled');
                    // if(jQuery('.uk-radio[name="team"]:checked').val() == 'Combo'){
                    //   jQuery('typeCheckNav').removeClass('uk-hidden');
                    //   jQuery('typeCheck').removeClass('uk-hidden');
                    //   i=i+1;
                    // }else{

                    //   if(i == 2){
                    //     i = 1;
                    //     jQuery('typeCheckNav').addClass('uk-hidden');
                    //     jQuery('typeCheck').addClass('uk-hidden');
                    //   }
                    // }
                    console.log('Validation correct');
                    return true;
                  }
                  break;
                  case 'tab9':
                  if(jQuery('.uk-radio[name="launch"]:checked').val() == null || jQuery('.uk-radio[name="launch"]:checked').val() == ''){
                    jQuery('#lessMoreLaunch').show();
                    jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                    jQuery('#switcher-nav li:nth-child(10)').addClass('uk-active');
                    return false;


                  }else if(jQuery('.uk-radio[name="launch"]:checked').val() == 'less'){

                    // console.log(jQuery('#dateFirst').val())

                    // console.log(jQuery('#dateValid').val())
                    var dateSet = moment(jQuery('#lessLaunch').val(),"DD-MM-YYYY");
                    var yearToday = moment();
                    yearToday.subtract(365, 'days');

                    // jQuery('#secretNo #default').addClass('uk-hidden');
                    // jQuery('#secretNo #saleLess').removeClass('uk-hidden');

                    // if(dateSet.isAfter(yearToday)){
                    //  jQuery('#lessYear').hide();
                    var lessThenYear = dateSet.isAfter(yearToday)
                    console.log(jQuery('#lessLaunch').val());

                    //  return true;
                    if((jQuery('#lessLaunch').val() == jQuery('#lessValidLaunch').val()) && lessThenYear == true) {
                      jQuery('#lessYearLaunch').hide();
                      jQuery('#chooseDateLaunch').hide();
                      return true;
                    }else if (jQuery('#lessLaunch').val() != jQuery('#lessValidLaunch').val()){

                      jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                      jQuery('#switcher-nav li:nth-child(10)').addClass('uk-active');
                      jQuery('#chooseDateLaunch').show();
                      return false;
                    }
                    else{
                      jQuery('#switcher-nav .uk-active').removeClass('uk-active');
                      jQuery('#switcher-nav li:nth-child(10)').addClass('uk-active');
                      jQuery('#lessYearLaunch').show();


                      return false;

                    }

                  }else{
                    jQuery('#lessMoreLaunch').hide();
                   // jQuery('#secretNo #default').removeClass('uk-hidden');
                   // jQuery('#secretNo #saleLess').addClass('uk-hidden');
                   return true;
                 }

                 break;
                 default: 
                 return false;
                 break;
               }


             }
             
             if (typeof database === 'undefined'){
               var config = {
                 apiKey: "AIzaSyA5rZfAgaCirhIJktpvDpO5MTQKlhZXMrg",
                 authDomain: "patentdepot.firebaseapp.com",
                 databaseURL: "https://patentdepot.firebaseio.com",
                 projectId: "patentdepot",
                 storageBucket: "patentdepot.appspot.com",
                 messagingSenderId: "1085689362352"
               };

               firebase.initializeApp(config);
               var database = firebase.database();
             }
             function submit() {
               var formdata = $("form").serializeArray();
               var data = {};
               $(formdata).each(function(index, obj){
                 data[obj.name] = obj.value;
               });
               
               data['ref'] = '20190608d1';
               writeUserData(data,firebase.auth().currentUser.uid);
             }

             function writeUserData(data, userID){
               firebase.database().ref('user/' + userID + "/reports/").push(data,function(error){
                 if(error){
                   console.log(error);
                 }
                 else{
                 }
               }).then(function(snapshot){
                 window.location.href = '/report?report='+snapshot.key;
                  //window.location.href = "/report/?report=" + data.submission_id;
                  console.log('Submission Completed without Errors');
                });
             }
