/*
 * TODO: Firebase
 *   [x] Authentication
 *   [ ] Realtime Database
 *   [ ] Storage
 *   [ ] Cloud Messaging
 */

 // Third party
import _template from 'lodash-es/template';

// Components
import { layout } from '../../components/layout';
import { fileUpload } from '../../components/file-upload';

// Main
import template from './contact.html';
import style from './contact.css';
import LANGS_EN from './langs/en.json';
import LANGS_ZH from './langs/zh.json';

const contact = () => {
  const signInButton = document.querySelector('#sign-in-button');
  const signOutButton = document.querySelector('#sign-out-button');
  const content = document.querySelector('#content');

  let currentUID;
  const onAuthStateChanged = (user) => {
    if (user && currentUID === user.uid) return;

    if (user) {
      currentUID = user.uid;
      signInButton.style.display = 'none';
      content.style.display = '';
      signOutButton.style.display = '';
      document.querySelector('#username').value = `${user.displayName}`;
    } else {
      currentUID = null;
      signInButton.style.display = '';
    }
  };

  signInButton.onclick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  signOutButton.onclick = () => {
    firebase.auth().signOut();
    content.style.display = 'none';
    signOutButton.style.display = 'none';
    signInButton.style.display = '';
  };

  firebase.auth().onAuthStateChanged(onAuthStateChanged);

  content.style.display = 'none';
  signOutButton.style.display = 'none';
  signInButton.style.display = '';
};

export const CONTACT_EN = () => {
  layout('en', 'contact');
  document.querySelector('#page').innerHTML = _template(template, { 'imports': { style } })(LANGS_EN);
  fileUpload('contact-image', 'Choose a file');
  contact();
	componentHandler.upgradeAllRegistered();
};

export const CONTACT_ZH = () => {
  layout('zh', 'contact');
  document.querySelector('#page').innerHTML = _template(template, { 'imports': { style } })(LANGS_ZH);
  fileUpload('contact-image', '選擇一個檔案');
  contact();
  componentHandler.upgradeAllRegistered();
};