<script>
	import { addDoc } from 'firebase/firestore';
	import CryptoJS from 'crypto-js';
	const secretKey = '?32Dex&Fgjj*_beTaQZ&;z_i<nCS^Fi/';

	export let chatsRef;
	export let user;
	let message = '';

	const appendMessage = async () => {
		if (!message) return;

		await addDoc(chatsRef, { message: encryptMessage(message), uid: user.uid, date: Date.now() });
		message = '';
	};

	const encryptMessage = (msg) => {
		return CryptoJS.AES.encrypt(msg, secretKey).toString();
	};
</script>

<form on:submit|preventDefault={appendMessage}>
	<div class="field has-addons box">
		<div class="control is-expanded">
			<input type="text" class="input" bind:value={message} placeholder="Type here..." />
		</div>
		<div class="control">
			<input type="submit" class="button is-info" value="Send" />
		</div>
	</div>
</form>
