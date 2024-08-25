import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../utils/api";

export function useDeleteAccount() {
  const router = useRouter();
  const session = useSession();
  const deleteAccountMutation = api.user.deleteAccount.useMutation();

  return {
    deleteAccount: async () => {
      if (!session.data) return;
      const expectedEmail = session.data.user.email;
      if (!expectedEmail) return;
      const typedEmail = prompt(
        `Please type your email ${expectedEmail} to delete your account.  After deleting, all your data will become unrecoverable.`
      );
      if (typedEmail === null) return;
      if (typedEmail !== expectedEmail) return;
      await deleteAccountMutation.mutateAsync();
      await signOut().catch(console.error);
      await router.push("/").catch(console.error);
    },
  };
}
