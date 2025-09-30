export const metadata = { title: "Profile • Bilvio" };

export default function Profile() {
  const userRows: Array<{ label: string; value: string }> = [
    { label: "First name", value: "First name" },
    { label: "Last name", value: "Last name" },
    { label: "Email", value: "email@example.com" },
    { label: "Phone number", value: "0738752087" },
  ];

  const companyRows: Array<{ label: string; value: string }> = [
    { label: "Company name", value: "Company Name" },
    { label: "Tax number", value: "123456789" },
    { label: "Street", value: "Street" },
    { label: "Post code", value: "60219" },
    { label: "City", value: "Norrköping" },
    { label: "Country", value: "Sweden" },
    { label: "Currency", value: "SEK" },
    { label: "Company site URL", value: "https://example.com" },
  ];

  return (
    <section className="max-w-7xl mx-auto w-full">
      {/* Title outside tables */}
      <h1 className="text-2xl md:text-3xl font-extrabold m-4">Profile</h1>

      {/* Responsive gutter so borders remain visible beside collapsed drawer */}
      <div className="mx-2 sm:mx-4 md:mx-6">
        <div className="bg-white border border-gray-200 shadow-sm isolate">
          {/* USER DATA */}
          <h2 className="bg-white px-4 py-3 text-xl font-bold">
            User Data
          </h2>

          <div className="overflow-x-auto p-4">
            <table className="w-full table-fixed">
              <tbody>
                {userRows.map((row, idx) => (
                  <tr key={row.label} className={idx % 2 ? "bg-white" : "bg-gray-50"}>
                    <td className="w-1/2 px-4 py-0 h-10 border-y border-gray-100 align-middle whitespace-nowrap">
                      {row.label}
                    </td>
                    <td className="w-1/2 px-4 py-0 h-10 border-y border-gray-100 align-middle truncate">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* COMPANY DATA */}
          <h2 className="bg-white px-4 py-3 text-xl font-bold">
            Company Data
          </h2>

          <div className="overflow-x-auto p-4">
            <table className="w-full table-fixed">
               <tbody>
                {companyRows.map((row, idx) => (
                  <tr key={row.label} className={idx % 2 ? "bg-white" : "bg-gray-50"}>
                    <td className="w-1/2 px-4 py-0 h-10 border-y border-gray-100 align-middle whitespace-nowrap">
                      {row.label}
                    </td>
                    <td className="w-1/2 px-4 py-0 h-10 border-y border-gray-100 align-middle truncate">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
