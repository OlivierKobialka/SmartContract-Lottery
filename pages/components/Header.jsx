import { useMoralis } from "react-moralis";

export default function Header() {
	const { enableWeb3 } = useMoralis();

	return <div>Header</div>;
}
