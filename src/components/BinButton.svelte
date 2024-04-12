<script>
	import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
	import { firestore } from '../firebaseStore';

	export let collectionName;

	async function clearCollection() {
		const querySnapshot = await getDocs(collection(firestore, collectionName));
		const batch = [];

		querySnapshot.forEach((document) => {
			batch.push(deleteDoc(doc(db, collectionName, document.id)));
		});

		await Promise.all(batch);
	}
</script>

<button class="button is-danger" on:click={clearCollection}
	><i class="ri-delete-bin-line"></i></button
>
