$(document).ready(function(){
    $('.sidenav').sidenav();
});

//Variables
const CLIENTID = '411935064391-qk5dtoo1qqs7jhaf6gggcr4orb0329p2.apps.googleusercontent.com';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];

const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly'
const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const channelData = document.querySelector('channel-data');
const videoContainer = document.querySelector('video-container');
const content = document.querySelector('content');
const defaultChannel = 'Matias Nicolas';

//Cargar la libreria que utilizaremos para autorizar al usuario
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

//Init para la API client library y el seteo de los listeners que tendra
function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENTID,
        scope: SCOPES
    }).then(() => {
        //Listen for sign in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

//Actualizar la información de la cuenta
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        content.style.display = 'block';
        videoContainer.style.display = 'block';
        getCannel(defaultChannel);
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        content.style.display = 'none';
        videoContainer.style.display = 'none';
    }
}

//Función para el bonton log in
function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
}

function getCannel(channel) {
    console.log(channel);
}