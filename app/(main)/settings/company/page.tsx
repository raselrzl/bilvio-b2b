import { getCompanySettingsAction } from "@/app/actions";
import CompanySettingsClient from "./CompanySettingsClient";


export default async function CompanySettingsPage() {
  const settings = await getCompanySettingsAction();

  // If no existing settings → pass empty object
  const initialValues = settings ?? {
    onlyCarsWithPDI: "",
    iAcceptRegistration: "",
    iAcceptWarranty: "",
    cocNewCars: "",
    cocUsedCars: "",
    documentAddress: "",
  };

  return <CompanySettingsClient initial={initialValues} />;
}
