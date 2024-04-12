<script>
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { doc, setDoc, getDocs, query, where, collection } from 'firebase/firestore';
	import { firestore } from '../firebaseStore';

	export let auth;
	let mode = 'signIn';
	let email = '';
	let password = '';
	let username = '';
	let errorMessage = '';

	const handleSubmit = async () => {
		try {
			if (mode === 'signIn') {
				await signInWithEmailAndPassword(auth, email, password);
				errorMessage = '';
			} else {
				if (await isUsernameTaken(username)) {
					errorMessage = 'This username is already taken. Please choose another one.';
					return;
				}

				const userCredential = await createUserWithEmailAndPassword(auth, email, password);
				const user = userCredential.user;
				await setDoc(doc(firestore, 'users', user.uid), {
					username: username,
					email: user.email,
					createdAt: new Date()
				});
				errorMessage = '';
			}
		} catch (error) {
			if (error.code === 'auth/invalid-login-credentials') {
				errorMessage = 'Invalid email or password.';
				password = '';
			} else if (error.code === 'auth/email-already-in-use') {
				errorMessage = 'Email is already in use.';
				email = '';
				password = '';
			} else {
				errorMessage = error.message;
			}
		}
	};

	const isUsernameTaken = async (username) => {
		try {
			const usersRef = collection(firestore, 'users');
			const q = query(usersRef, where('username', '==', username));
			const querySnapshot = await getDocs(q);
			return !querySnapshot.empty;
		} catch (error) {
			username = '';
			password = '';
			throw error;
		}
	};

	const changeMode = (_mode) => {
		mode = _mode;
		errorMessage = '';
	};
</script>

<h1 class="title has-text-info has-text-centered">Chat App</h1>
<h2 class="title">{mode === 'signIn' ? 'Sign In' : 'Sign Up'}</h2>
<form on:submit|preventDefault={handleSubmit}>
	<div class="field">
		<label for="" class="label">Email</label>
		<input type="email" class="input" required bind:value={email} />
	</div>
	<div class="field">
		<label for="" class="label">Password</label>
		<input type="password" class="input" required bind:value={password} />
	</div>
	{#if mode === 'signUp'}
		<div class="field">
			<label for="" class="label">Username</label>
			<input type="text" class="input" required bind:value={username} />
		</div>
	{/if}
	<div class="field">
		<input
			type="submit"
			class="button is-fullwidth"
			value={mode === 'signIn' ? 'Sign In' : 'Sign Up'}
		/>
		<p style="color: crimson;">{errorMessage}</p>
	</div>
</form>
<hr />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if mode === 'signIn'}
	<p>
		Do not have an account ? <span
			class="has-text-link link"
			on:click|preventDefault={() => changeMode('signUp')}>SignUp</span
		>
	</p>
{:else}
	<p>
		You already have an account ? <span
			class="has-text-link link"
			on:click|preventDefault={() => changeMode('signIn')}>SignUp</span
		>
	</p>
{/if}

<style>
	.link {
		cursor: pointer;
	}
</style>
