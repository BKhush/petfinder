var apiKey = '68595054954f0f43bbffdecbac4a614a';

$(document).ready(function(e) {	
	reloadFrontRandomDogs();	
});

function reloadFrontRandomDogs() {
	findRandomDog("petCard1");
	findRandomDog("petCard2");
	findRandomDog("petCard3");
	findRandomDog("petCard4");
	findRandomDog("petCard5");
	findRandomDog("petCard6");
}

function clearFrontRandomDogs() {
	clear("petCard1");
	clear("petCard2");
	clear("petCard3");
	clear("petCard4");
	clear("petCard5");
	clear("petCard6");
}

function clear(dogCard) {
    document.getElementById(dogCard).innerHTML = '';
}

//Function request to get random pet given the right id tag to change on css
var fullString = '';
function findRandomDog(dogCard) {
	$.getJSON('http://api.petfinder.com/pet.getRandom?animal=dog&format=json&output=full&key=' + apiKey + '&callback=?', function(dogData) {
		//test:
		var petsRandom = [];
		petsRandom.push(dogData.petfinder.pet.name.$t);
		petsRandom.push(dogData.petfinder.pet.breeds.breed.$t);
		petsRandom.push(dogData.petfinder.pet.media.photos.photo[2].$t);
		petsRandom.push(dogData.petfinder.pet.age.$t);
		petsRandom.push(dogData.petfinder.pet.sex.$t);
		petsRandom.push(dogData.petfinder.pet.description.$t);
		petsRandom.push(dogData.petfinder.pet.id.$t);
        
				
		//console.log(dogData.petfinder.pet.id.$t);
		
		var newDes = "Breed: " + petsRandom[1] + "<br />Sex: " + petsRandom[4] + "<br />Age: " + petsRandom[3];
				
		fullString = '<div class="col s12 m6"><div class="card small"><div class="card-image waves-effect waves-block waves-light"> <img class="activator" src="' + petsRandom[2] + '"></div><div class="card-content"> <span class="card-title activator grey-text text-darken-4">' + petsRandom[0].substring(0, 15) + '<i class="material-icons right">more_vert</i></span></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">'+ petsRandom[0] +'<i class="material-icons right">close</i></span><p>'+ newDes +'</p><p><a href="#' + petsRandom[6] + '" onclick="getChosenDogData(' + petsRandom[6] + ')">More Info</a></p></div></div></div>';
		document.getElementById(dogCard).innerHTML = fullString;
		
		//Pets(petsRandom[0], petsRandom[1], petsRandom[2], petsRandom[3], petsRandom[4], petsRandom[5]);	
	});
}	
  
  $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .0, // Opacity of modal background original .5
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      ready: function() { 
	  	//alert('Ready');
	  }, // Callback for Modal open
      complete: function() {
		  //alert('Closed');
	  } // Callback for Modal close
    }
  );

  
  function getChosenDogData(dogID) {
	  //lOOK UP DOG ID AND PULL DATA WITH JSON
	  //Test dog id = 34800604 , name is Kaya, pit bull, Female, Adult
	  dogID = '' + dogID;
      
      $('#modal1').openModal();
      
	  $.getJSON('http://api.petfinder.com/pet.get?animal=dog&format=json&output=full&id=' + dogID + '&key=' + apiKey + '&callback=?', function(dogData) {
		//test:
		var petsRandom = [];
		petsRandom.push(dogData.petfinder.pet.name.$t);
		petsRandom.push(dogData.petfinder.pet.breeds.breed.$t);
		petsRandom.push(dogData.petfinder.pet.media.photos.photo[2].$t);
		petsRandom.push(dogData.petfinder.pet.age.$t);
		petsRandom.push(dogData.petfinder.pet.sex.$t);
		petsRandom.push(dogData.petfinder.pet.description.$t);
        
        petsRandom.push(dogData.petfinder.pet.contact.city.$t);
        petsRandom.push(dogData.petfinder.pet.contact.state.$t);
        petsRandom.push(dogData.petfinder.pet.contact.zip.$t);
        petsRandom.push(dogData.petfinder.pet.contact.email.$t);
        petsRandom.push(dogData.petfinder.pet.contact.phone.$t);
		petsRandom.push(dogData.petfinder.pet.id.$t);
	
        
		document.getElementById("chosenDogName").innerHTML = '<b>Name:</b> ' + petsRandom[0];
        document.getElementById("chosenDogBreed").innerHTML = '<b>Breed:</b> ' + petsRandom[1];
        document.getElementById("chosenDogAge").innerHTML = '<b>Age:</b> ' + petsRandom[3];
        document.getElementById("chosenDogSex").innerHTML = '<b>Sex:</b> ' + petsRandom[4];
        document.getElementById("chosenDogAdress").innerHTML = '<b>Address:</b> ' + petsRandom[6] + ' ' + petsRandom[7] + ', ' + petsRandom[8];        
        document.getElementById("chosenDogEmail").innerHTML = '<b>Email:</b> ' + petsRandom[9];
        document.getElementById("chosenDogPhone").innerHTML = '<b>Phone Number:</b> ' + petsRandom[10];        
        document.getElementById("chosenDogInfo").innerHTML = petsRandom[5];
		document.getElementById('chosenDogImg').innerHTML = '<img id="fixDogImg" class="col s12 m4" src="' + petsRandom[2] + '">';
		//Pets(petsRandom[0], petsRandom[1], petsRandom[2], petsRandom[3], petsRandom[4], petsRandom[5]);	
	});
  }

var fullOutput = '';
function findDogBreed(breed) {
    clearFrontRandomDogs();
    console.log("Dog we are looking for is: " + breed);
    //Request to get pet by location and breed:
    $.getJSON('http://api.petfinder.com/pet.find?animal=dog&format=json&output=full&location=95340&breed=' + breed + '&key=' + apiKey + '&callback=?', function(dogData) {		
               
		for(var i = 0; i < dogData.petfinder.pets.pet.length; i++) {
            
            try {       
                //petsRandom.push(dogData.petfinder.pets.pet[i].description.$t);

                var newDes = "Breed: " + dogData.petfinder.pets.pet[i].breeds.breed.$t + "<br />Sex: " + dogData.petfinder.pets.pet[i].sex.$t + "<br />Age: " + dogData.petfinder.pets.pet[i].age.$t;

                fullOutput += '<div class="col s12 m6"><div class="card small"><div class="card-image waves-effect waves-block waves-light"> <img class="activator" src="' + dogData.petfinder.pets.pet[i].media.photos.photo[2].$t + '"></div><div class="card-content"> <span class="card-title activator grey-text text-darken-4">' + dogData.petfinder.pets.pet[i].name.$t + '<i class="material-icons right">more_vert</i></span></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">'+ dogData.petfinder.pets.pet[i].name.$t +'<i class="material-icons right">close</i></span><p>'+ newDes +'</p><p><a href="#' + dogData.petfinder.pets.pet[i].id.$t + '" onclick="getChosenDogData(' + dogData.petfinder.pets.pet[i].id.$t + ')">More Info</a></p></div></div></div>';
            }
            catch(e) {
                console.log("Bug found: " + e);
                i++;
            }
		}
        //This replaces only the first card and creates many but does not hide the first 6 from the starting point
        //To fix this we will need to only have one petcard and just load 6 or how ever many we want
        //this also makes better looking code
        document.getElementById("petCard1").innerHTML = fullOutput;
		fullOutput = '';
	});
}

function findDogBreedWithLocation(breed, location) {
    
    clearFrontRandomDogs();
    
    console.log("Dog we are looking for is: " + breed + " in location: " + location);
    //Request to get pet by location and breed:
    $.getJSON('http://api.petfinder.com/pet.find?animal=dog&format=json&output=full&location='+ location + '&breed=' + breed + '&key=' + apiKey + '&callback=?', function(dogData) {		
               
		for(var i = 0; i < dogData.petfinder.pets.pet.length; i++) {
            
            try {         
                //petsRandom.push(dogData.petfinder.pets.pet[i].description.$t);

                var newDes = "Breed: " + dogData.petfinder.pets.pet[i].breeds.breed.$t + "<br />Sex: " + dogData.petfinder.pets.pet[i].sex.$t + "<br />Age: " + dogData.petfinder.pets.pet[i].age.$t;

                fullOutput += '<div class="col s12 m6"><div class="card small"><div class="card-image waves-effect waves-block waves-light"> <img class="activator" src="' + dogData.petfinder.pets.pet[i].media.photos.photo[2].$t + '"></div><div class="card-content"> <span class="card-title activator grey-text text-darken-4">' + dogData.petfinder.pets.pet[i].name.$t + '<i class="material-icons right">more_vert</i></span></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">'+ dogData.petfinder.pets.pet[i].name.$t +'<i class="material-icons right">close</i></span><p>'+ newDes +'</p><p><a href="#' + dogData.petfinder.pets.pet[i].id.$t + '" onclick="getChosenDogData(' + dogData.petfinder.pets.pet[i].id.$t + ')">More Info</a></p></div></div></div>';
            }
            catch(e) {
                console.log("Bug found: " + e);
                i++;
            }
		}
        document.getElementById("petCard1").innerHTML = fullOutput;
		fullOutput = '';
	});
}
//To close the modal with a button 
function closeModal() {
     $('#modal1').closeModal();
}

//-----------All the fallowing still need to be worked on
//This is just for fixing the title of each card, so only the first letter is uppercase
function toTitleCase(str) {
    //Not working bro
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


      