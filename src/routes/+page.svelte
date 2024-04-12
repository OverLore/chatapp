<script>
	import { SignedIn, SignedOut } from 'sveltefire';
	import AuthForm from '../components/AuthForm.svelte';
	import Chat from '../components/Chat.svelte';
	import BinButton from '../components/BinButton.svelte';
</script>

<main class="container section app">
	<SignedIn let:user let:signOut>
		<Chat {user} />
		<div style="display: flex; flex-direction: row;">
			<button class="button" style="flex-grow: 1;" on:click={signOut}>Sign Out</button>
			<BinButton collectionName="chat" />
		</div>
	</SignedIn>

	<SignedOut let:auth>
		<AuthForm {auth} />
	</SignedOut>
</main>

<style>
	.app {
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		max-height: 100svh;
	}
</style>
