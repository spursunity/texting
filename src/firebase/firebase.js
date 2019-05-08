import * as firebase from "firebase/app";
import 'firebase/firebase-auth';
import 'firebase/firebase-database';



const config = {
    apiKey: "AIzaSyDwj-AbdZmydrTmGRY7ynn2ljezu-exkTI",
    authDomain: "texting-c6aa6.firebaseapp.com",
    databaseURL: "https://texting-c6aa6.firebaseio.com",
    projectId: "texting-c6aa6",
    storageBucket: "texting-c6aa6.appspot.com",
    messagingSenderId: "62385937036"
};

class Firebase {
    constructor() {
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.db = firebase.database();
        this.usersPath = 'projects/users/';
        this.freeDataPath = 'projects/freeData/';
        this.mainDataPath = 'projects/mainData/';
        this.requestsPath = '/request/';
    }
    
    signIn(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }
    
    async register(name, email, password) {
      await this.auth.createUserWithEmailAndPassword(email, password);

      return this.auth.currentUser.updateProfile({
          displayName: name
      })
    }

    handlerUserAuth() {
        return new Promise ((resolve) => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    async createNewProject(uid, uName, title, description) {
        const { usersPath, freeDataPath, mainDataPath } = this,
            now = new Date(),
            creatingDate = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear(),
            key = await this.db.ref().child('users').push().key
        ;

        this.db.ref(`${usersPath}${key}`).set({
            usersIds: [uid]
        });
        this.db.ref(`${freeDataPath}${key}`).set({
            usersNames: [uName],
            title,
            description,
            creatingDate
        });
        this.db.ref(`${mainDataPath}${key}`).set({
            body: ''
        });

    }

    getUsersIds(projectId = '') {
        const { usersPath } = this;

        return this.db.ref(`${ usersPath }${ projectId }`).once('value');
    }

    getFreeData(projectId = '') {
        const { freeDataPath } = this;

        return this.db.ref(`${ freeDataPath }${ projectId }`).once('value');
    }

    getMainData(projectId) {
        const { mainDataPath } = this;

        return this.db.ref(`${mainDataPath}${projectId}/body`).once('value');
    }

    updateProjectBody(projectId, text) {
        const { mainDataPath } = this;
        const body = {
            body: text
        };
        const updates = {};
        updates[`${mainDataPath}${projectId}`] = body;


        return this.db.ref().update(updates);
    }

    checkExistingRequests(projectId) {
        const { mainDataPath, requestsPath } = this;

        return this.db.ref(`${ mainDataPath }${ projectId }${ requestsPath }`).once('value');
    }

    sendRequest(projectId, requests) {
        const { mainDataPath, requestsPath } = this;

        this.db.ref(`${ mainDataPath }${ projectId }${ requestsPath }`).set(requests);
    }

    updateUsersInProject(projectId, usersIds, projectFreeData) {
        const { usersPath, freeDataPath } = this;
        const updates = {};
        updates[`${usersPath}${projectId}`] = usersIds;
        updates[`${freeDataPath}${projectId}`] = projectFreeData;

        return this.db.ref().update(updates);
    }
}

export default new Firebase();