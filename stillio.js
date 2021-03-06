$(document).on('ready', function() {
	addButtons();
});

var slide,slideTotal,slideCurrent,right,left;

function slideInitial() {
  slide.addClass('proactivede');
  setTimeout(function() {
	slideRight();
  }, 1000);
}

function slideRight() {
  if (slideCurrent < slideTotal) {
	slideCurrent++;
  } else {
	slideCurrent = 0;
  }

  if (slideCurrent > 0) {
	var preactiveSlide = slide.eq(slideCurrent - 1);
  } else {
	var preactiveSlide = slide.eq(slideTotal);
  }
  var activeSlide = slide.eq(slideCurrent);
  if (slideCurrent < slideTotal) {
	var proactiveSlide = slide.eq(slideCurrent + 1);
  } else {
	var proactiveSlide = slide.eq(0);

  }

  slide.each(function() {
	var thisSlide = $(this);
	if (thisSlide.hasClass('preactivede')) {
	  thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
	}
	if (thisSlide.hasClass('preactive')) {
	  thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
	}
  });
  preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
  activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
  proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
}

function slideLeft() {
  if (slideCurrent > 0) {
	slideCurrent--;
  } else {
	slideCurrent = slideTotal;
  }

  if (slideCurrent < slideTotal) {
	var proactiveSlide = slide.eq(slideCurrent + 1);
  } else {
	var proactiveSlide = slide.eq(0);
  }
  var activeSlide = slide.eq(slideCurrent);
  if (slideCurrent > 0) {
	var preactiveSlide = slide.eq(slideCurrent - 1);
  } else {
	var preactiveSlide = slide.eq(slideTotal);
  }
  slide.each(function() {
	var thisSlide = $(this);
	if (thisSlide.hasClass('proactivede')) {
	  thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
	}
	if (thisSlide.hasClass('proactive')) {
	  thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
	}
  });
  preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
  activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
  proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
}

var slider_template = '<div class="slider-single"><a class="slider-single-download" href="javascript:void(0);">Download <i class="fa fa-download"></i></a></div>';

function loadScreenshot(data) {
	var json, screenshots, slider_images;
	
	try{
	 json = JSON.parse(data);
	 screenshots = json.screenshots;
	}catch (error){
	}finally{
		json = data;
		screenshots = json.screenshots;
	}
	var slider_images="";
	
	$('.slider-content').empty();
	
	for(var i = 0; i < screenshots.length; i++){
		slider_images+='<div class="slider-single" id="slider'+(i)+'"><a class="slider-single-likes" href="javascript:void(0);"></a></div>';
	}
	
	$('.slider-content').append(slider_images);
	
	slide = $('.slider-single');
	slideTotal = slide.length - 1;
	slideCurrent = -1;

	for(var i= 0; i < screenshots.length; i++) {	//for loop parses individual screenshots from json object, appends img tags, download with screenshot href, date created
		var imgSrc = screenshots[i].screenshot_image; //sets paresed images to a variable for reuse
		
		console.log(imgSrc);//checking the obj
		
	image = $('<img id="image'+i+'" class="slider-single-image" alt="" />'); //parses screenshot image from JSON object and sets to variable
	image.attr('src', imgSrc); //adds screenshot image to src attr of <img> tag
	$('#slider'+(i)).append(image); //appends <img> tag to page 

	zoomImage = $('<a class="slider-single-title" target="_blank">Zoom In <i class="fa fa-plus-square"></i></a>');
	zoomImage.attr('href', imgSrc);
	$('#slider'+(i)).append(zoomImage);

	download = $('<a class="slider-single-download" href="" download="">Download <i class="fa fa-download"></i></a>'); //parses image URL from JSON object and sets to variable
	download.attr('href', imgSrc);
	download.attr('download', imgSrc); //adds link to screenshot to href attr of <a> tag as a "zoom" feature
	$('#slider'+(i)).append(download); //appends <a> tag to page and adds href attr with each screenshot URL parsed from JSON to allow user to view zoomed-in version of image	

	var created = screenshots[i].created; //parses date from JSON object and sets to variable
	date = $('<div class="slider-single-likes">'+created+'</div>'); //adds date to download div tag
	$('#slider'+(i)).append(date); //appends date from object to the page next to each image in slider
	}
    left = $('.slider-left');
    right = $('.slider-right');
	
		left.off('click');
		right.off('click');

    left.on('click', function() {
      slideLeft();
    });
    right.on('click', function() {
      slideRight();
    });
	slideInitial();
}

var urlIds = []; //empty array for later use in function
function addButtons(){  //adds buttons to page  //button tags in array with unique ids, CSS class and names
	var buttons = ['<button id="amazon" class="buttons">Amazon</button>',
	'<button id="walmart" class="buttons">Walmart</button>',
	'<button id="ebates" class="buttons">Ebates</button>',
	'<button id="rmn" class="buttons ">RetailMeNot</button>', 
	'<button id="groupon" class="buttons">Groupon</button>',
	'<button id="buybuy" class="buttons space">BuyBuyBaby</button>',
	'<button id="walmart_ebates" class="buttons">Ebates Walmart</button>',
	'<button id="amazon_ebates" class="buttons">Ebates Amazon</button>',
	'<button id="target_ebates" class="buttons">Ebates Target</button>',
	'<button id="toysrus_ebates" class="buttons">Ebates ToysRUs</button>',
	'<button id="babiesrus_ebates" class="buttons">Ebates BabiesRUs</button>',
	'<button id="buybuy_ebates" class="buttons space">Ebates BuyBuyBaby</button>',
	'<button id="walmart_rmn" class="buttons">RetailMeNot Walmart</button>', 
	'<button id="amazon_rmn" class="buttons">RetailMeNot Amazon</button>', 
	'<button id="target_rmn" class="buttons">RetailMeNot Target</button>',
	'<button id="toysrus_rmn" class="buttons">RetailMeNot ToysRUs</button>',
	'<button id="babiesrus_rmn" class="buttons">RetailMeNot BabiesRus</button>',
	'<button id="buybuy_rmn" class="buttons space">RetailMeNot BuyBuyBaby</button>',
	'<button id="walmart_groupon" class="buttons">Groupon Walmart</button>',
	'<button id="amazon_groupon" class="buttons">Groupon Amazon</button>',
	'<button id="target_groupon" class="buttons">Groupon Target</button>',
	'<button id="toysrus_groupon" class="buttons">Groupon ToysRUs</button>',
	'<button id="babiesrus_groupon" class="buttons">Groupon BabiesRUs</button>'];
	for(i = 0; i < buttons.length-22; i++){//iterates through all <button> tags in buttons array
		$('.buttons-container').append(buttons)//appends each button in array to page
	}
	
	urlIds =[ //key value pair array includes url id's for unique id of each API call
	{url:'a29d2d9c-a087-4d27-8e22-251f525ecff6', id:'walmart'},
	{url:'146eeac3-4ab2-48db-80d7-df0f1c75c2e0', id:'walmart_ebates'},
	{url: '212e608a-3929-4e65-810e-26fafe796f05', id:'amazon'},
	{url: 'fabd06ba-7ead-4978-b3bd-f33f88b8bbfa', id: 'ebates'},
	{url: '54c8d21d-442e-4e8f-a079-597d7980e749', id: 'buybuy'},
	{url: '5b6c4169-a89b-4c03-8321-b77a56282a45', id: 'buybuy_ebates'},
	{url: '6cb55bc4-6dbe-4459-8607-2ca3a6848b33', id: 'buybuy_rmn'},
	{url: '3c809f22-13f6-49db-bfd8-63d3df847bb9', id:'babiesrus_ebates'},
	{url: 'f3072ad1-0153-4d15-af6f-e5a0edc24646', id:'toysrus_ebates'},
	{url:'8b1c84a8-3dea-4e05-8f1b-d9aaa0abebeb', id:'amazon_ebates'},
	{url:'26140e33-c0cc-44ca-bb96-cc6dd9bf5eeb', id:'target_ebates'},
	{url: '981313b7-2d2a-47d4-8cdd-54f51ef20e06', id: 'walmart_rmn'},
	{url: 'b73abc94-d8d0-492d-a12c-0a429b1ab8c8', id: 'target_rmn'},
	{url: 'db310167-d49f-449c-9910-43b08ec6e6d6', id: 'amazon_rmn'},
	{url: 'ee645e0b-4db7-4b33-8100-41de95acf106', id: 'toysrus_rmn'},
	{url: 'b232e17e-d054-4788-b7cc-9df4c42dd9ef', id: 'babiesrus_rmn'},
	{url: 'f3f1efae-7710-4bf5-97d4-1d686f840da0', id: 'rmn'},
	{url: 'e131279e-b2c5-4134-90d9-15a10f13a24d', id: 'groupon'},
	{url: '36de5be3-941e-44d1-b7ef-26f37b5c104e', id: 'walmart_groupon'},
	{url: '38d5bd9f-57bc-42a7-9945-f50c3b7529f4', id: 'amazon_groupon'},
	{url: 'd1c32fd9-7f6c-4cd4-9aec-ac75e65d587c', id: 'target_groupon'},
	{url: '040d0d57-f6a4-4ae6-83b6-06059b0cf412', id: 'toysrus_groupon'},
	{url: '35fb3f03-f553-4210-b378-06c7199d0c4f', id: 'babiesrus_groupon'}];
	
	for(var i=0; i < urlIds.length; i++) {//loop to append data-api-urlid to buttons
		$('#'+urlIds[i].id).attr('data-api-urlid', urlIds[i].url);//calls url value from each key value pair in array and appends to each button as attr
	}

	$('.buttons-container button').on('click', function(e) {getJsonText($(this).attr('data-api-urlid'));});//Apply button listener to all buttons in the button container
}

function getJsonText(url_id) { //makes API call, param feeds unique IDs to be appeneded to each button on click and call that unique API
	var api_token = 'api_token=qi4P5981S1I0JAB3VWJp5KNKviEopedx8Z4HWINjv7LbdNaTbqX5PzE6RSJM&url_id='; //api token
	var url = 'getURL.php?' + api_token + url_id;
	$.ajax({
	  url: url,
	  type: 'POST',
	 	success: function() {
	console.log(url_id);//checking to make sure data-api-urlid is being passed properly
	//console.log(datatype);
	let options = { //options for API call
		method: 'GET',
		headers: { //headers for API call
			'Access-Control-Allow-Origin': '*',
		}
	}

	fetch(url,options) //fetch method calls API
	  .then(handleResponse) 
	  .then(data => { loadScreenshot(data);console.log(data); })
	  .catch(error => console.log(error))
	
	//handles possible response from API
	function handleResponse(response) {
	  let contentType = response.headers.get('content-type')
	  if (contentType.includes('application/json')) {
		return handleJSONResponse(response)
	  } else if (contentType.includes('text/html')) {
		return handleTextResponse(response)
	  } else {
		// Other response types as necessary. I haven't found a need for them yet though.
		throw new Error(`Sorry, content-type ${contentType} not supported`)
	  }
	}
	function handleJSONResponse (response) {
	  return response.json()
		.then(json => {
		  if (response.ok) {
			return json
		  } else {
			return Promise.reject(Object.assign({}, json, {
			  status: response.status,
			  statusText: response.statusText
			}))
		  }
		})
	}
	function handleTextResponse (response) {
	  return response.text()
		.then(text => {
		  if (response.ok) {
			return text
		  } else {
			return Promise.reject({
			  status: response.status,
			  statusText: response.statusText,
				err: text
						})
					}
				})
			}
		}//end success function
	})//end ajax
 }//end getJSON

//}
// function addClass(url_id){
// if(url_id == 'fabd06ba-7ead-4978-b3bd-f33f88b8bbfa'){ 
// 		$('.slider-content').removeAttr('id', 'walmart_images' )
// 		$('.slider-content').attr('id', 'ebates_images')
// 	}
// else if(url_id == 'a29d2d9c-a087-4d27-8e22-251f525ecff6'){ //walmart id
// 	$('.slider-content').removeAttr('id', 'ebates_images')
// 	$('.slider-content').attr('id', 'walmart_images')
// 	}
// 	else{
// 		$('.slider-content').removeAttr('ebates_images groupon_images walmart_images')
// 		}
// }
