import { accountViewPaths } from "@daveyplate/better-auth-ui/server";
import AccountPageClient from "./view";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((path) => ({ path }));
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
   const { path } = await params;

  return <AccountPageClient path={path} />;
}
