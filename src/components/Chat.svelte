<script>
	import { Collection } from 'sveltefire';
	import { tick } from 'svelte';
	import AppendMessage from './AppendMessage.svelte';
	import Username from './Username.svelte';
	export let user;

	let chatsElement;
	const scrollToTheEnd = async () => {
		await tick();
		chatsElement.scrollTo(0, chatsElement.scrollHeight);
	};
</script>

<Collection ref={'chat'} let:ref={chatsRef} let:data={messages} on:data={scrollToTheEnd}>
	<div class="box chat-box" bind:this={chatsElement}>
		{#each messages.sort((a, b) => a.date - b.date) as { message, uid }}
			<div class="notification {uid === user.uid ? 'is-info is-sender' : 'is-success is-receiver'}">
				<Username {uid} />
				<p>{message}</p>
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
