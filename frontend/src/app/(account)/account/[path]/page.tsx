import { accountViewPaths } from "@daveyplate/better-auth-ui/server";
import AccountPageClient from "./view";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((path) => ({ path }));
}

export default function AccountPage({ params }: { params: { path: string } }) {
  return <AccountPageClient path={params.path} />;
}
