import firebase from 'firebase';

var config = {
        apiKey: "AIzaSyAkJF6fqzsE8S08LN0iT7izNzZ383ng9Hc",
        authDomain: "meus-trabalhos-3a486.firebaseapp.com",
        databaseURL: "https://meus-trabalhos-3a486.firebaseio.com",
        projectId: "meus-trabalhos-3a486",
        storageBucket: "meus-trabalhos-3a486.appspot.com",
        messagingSenderId: "646326734996",
        appId: "1:646326734996:web:8c55f77725c88cc36d6481",
        measurementId: "G-78V732CWQ7"
}
      // Initialize Firebase
firebase.initializeApp(config);


export default firebase;