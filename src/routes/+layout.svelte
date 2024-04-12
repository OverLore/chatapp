<script>
	import { FirebaseApp } from 'sveltefire';
	import { auth, firestore } from '../firebaseStore.js';
</script>

<FirebaseApp {auth} {firestore}>
	<slot />
</FirebaseApp>
