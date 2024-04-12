import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyATkJSKXwJBWya8gtlFsfGIsLqY26iM6hQ',
	authDomain: 'sveltechat-577ee.firebaseapp.com',
	projectId: 'sveltechat-577ee',
	storageBucket: 'sveltechat-577ee.appspot.com',
	messagingSenderId: '882743616793',
	appId: '1:882743616793:web:73cd56b98e9d14758e1188'
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

const getUsername = async (uid) => {
	const docRef = doc(firestore, 'users', uid);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data().username;
	} else {
		return null;
	}
};

export { firestore, auth, getUsername };
