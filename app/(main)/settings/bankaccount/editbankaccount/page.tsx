import EditBankAccountFormComponent from "./EditAccount";

export default function Page() {
  return (
    <EditBankAccountFormComponent
      defaultValues={{
        iban: "SE45 5000 0000 0583 9825 7466",
        swift: "SWEDSESS",
        main: "Yes",
      }}
    />
  );
}
