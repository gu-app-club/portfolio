import Link from "next/link";

export default ({ children }) => (
  <Link href="/">
    <button>{children}</button>
  </Link>
);
