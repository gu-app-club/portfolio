import Link from "next/link";

export default ({ children }) => (
  <Link href="/">
    <button className="button button-clear">{children}</button>
  </Link>
);
