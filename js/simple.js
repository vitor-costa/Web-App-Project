function hello() {
	window.alert("Hello World!");
}

function showHome() {
  $('#home-section').show();
  $('#hide-section').hide();
  $('#seek-section').hide();
  toggleMenu();
}

function showHide() {
  $('#home-section').hide();
  $('#hide-section').show();
  $('#seek-section').hide();
  toggleMenu();

  // Set image as default
  setTimeout(function() {
    var c = $('#canvas1')[0].getContext('2d');
    loadNoImageCanvas(c);
  }, 500);
}

function toggleMenu() {
  var e = $('#sidr');
  e.toggle();
}

function showSeek() {
  $('#home-section').hide();
  $('#hide-section').hide();
  $('#seek-section').show();
  toggleMenu();
}

$(document).ready(function() {
  // $('#simple-menu').sidr();
});

var manifest_url = location.href + 'manifest.webapp';

function install(ev) {
  ev.preventDefault();
  // define the manifest URL
  // install the app
  var installLocFind = navigator.mozApps.install(manifest_url);
  installLocFind.onsuccess = function(data) {
    // App is installed, do something
  };
  installLocFind.onerror = function() {
    // App wasn't installed, info is in
    // installapp.error.name
    alert(installLocFind.error.name);
  };
};

// get a reference to the button and call install() on click if the app isn't already installed. If it is, hide the button.
var button = document.getElementById('install-btn');

var installCheck = navigator.mozApps.checkInstalled(manifest_url);

installCheck.onsuccess = function() {
  if(installCheck.result) {
    button.style.display = "none";
  } else {
    button.addEventListener('click', install, false);
  };
};