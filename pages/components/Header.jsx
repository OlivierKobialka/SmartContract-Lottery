import { useMoralis } from "react-moralis";
import { useEffect } from "react";
// import { Moralis } from "moralis";

export default function Header() {
	const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3 } =
		useMoralis();

	useEffect(() => {
		if (isWeb3Enabled) return;
		if (typeof window !== "undefined") {
			if (window.localStorage.getItem("connected")) {
				enableWeb3();
			}
		}
		enableWeb3();
	}, [isWeb3Enabled]);

	useEffect(() => {
		Moralis.onAccountChanged(account => {
			console.log(`Account changed to ${account}`);
			if (account === null) {
				window.localStorage.removeItem("connected");
				deactivateWeb3();
				console.log("Null account found");
			}
		});
	}, []);

	return (
		<div>
			{account ? (
				<div className='bg-blue-500 hover:bg-blue-700 w-44 text-center text-white font-bold py-2 px-4 rounded'>
					Connected to {account.slice(0, 6)}...{account.slice(-4)}
				</div>
			) : (
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={async () => {
						await enableWeb3();
						if (typeof window !== "undefined") {
							window.localStorage.setItem("connected", "injected");
						}
					}}>
					Connect Wallet
				</button>
			)}
		</div>
	);
}
