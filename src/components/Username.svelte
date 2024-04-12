<script>
	import { onMount } from 'svelte';
	import { getUsername } from '../firebaseStore';
	export let uid;

	let username = 'Loading...';
	let isLoading = true;

	onMount(async () => {
		username = (await getUsername(uid)) || 'Unavailable';
		isLoading = false;
	});
</script>

<p class="subtitle {isLoading ? 'skeleton' : ''}">{isLoading ? '' : username}</p>

<style>
	@keyframes skeleton-loading {
		0% {
			background-color: rgb(124, 124, 124);
		}
		50% {
			background-color: rgb(78, 78, 78);
		}
		100% {
			background-color: rgb(124, 124, 124);
		}
	}

	.skeleton {
		display: inline-block;
		min-width: 100px;
		height: 1rem;
		background-color: rgba(165, 165, 165, 0.1);
		animation: skeleton-loading 1.5s infinite;
		color: transparent !important;
	}
</style>
