
import { prisma } from "@/app/utils/db";
import EditBankAccountFormComponent from "./EditAccount";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params; // <-- REQUIRED FIX

  const account = await prisma.bankAccount.findUnique({
    where: { id },
  });

  if (!account) return <div>Account not found</div>;

  return (
    <EditBankAccountFormComponent
      account={{
        id: account.id,
        bankName: account.bankName || "",
        iban: account.iban,
        swift: account.swift,
        isMain: account.isMain,
      }}
    />
  );
}
