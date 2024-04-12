<script>
	import { Collection } from 'sveltefire';
	import { tick } from 'svelte';
	import AppendMessage from './AppendMessage.svelte';
	import Username from './Username.svelte';
	import CryptoJS from 'crypto-js';
	const secretKey = '?32Dex&Fgjj*_beTaQZ&;z_i<nCS^Fi/';

	export let user;

	let chatsElement;
	const scrollToTheEnd = async () => {
		await tick();
		chatsElement.scrollTo(0, chatsElement.scrollHeight);
	};

	const decryptMessage = (cipherText) => {
		const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
		return bytes.toString(CryptoJS.enc.Utf8);
	};
</script>

<Collection ref={'chat'} let:ref={chatsRef} let:data={messages} on:data={scrollToTheEnd}>
	<div class="box chat-box" bind:this={chatsElement}>
		{#each messages.sort((a, b) => a.date - b.date) as { message, uid }}
			<div class="notification {uid === user.uid ? 'is-info is-sender' : 'is-success is-receiver'}">
				<Username {uid} />
				<p>{decryptMessage(message)}</p>
			</div>
		{/each}
	</div>
	<AppendMessage {chatsRef} {user} />
</Collection>

<style>
	.chat-box {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	.is-sender {
		text-align: right;
		margin-left: 100px;
	}

	.is-receiver {
		text-align: left;
		margin-right: 100px;
	}
</style>
