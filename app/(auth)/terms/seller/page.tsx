// components/BuyerTermsConditions.tsx
import React from "react";

type Props = {
  className?: string;
};

export default function BuyerTermsConditions({ className = "" }: Props) {
  return (
    <section
      className={`max-w-7xl bg-white border shadow-sm p-6
              m-4 sm:mx-6 md:mx-8 lg:mx-auto ${className}`}
    >
      <header>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          TERMS AND CONDITIONS OF THE BILVIO PLATFORM FOR BUYERS
        </h1>
      </header>

      {/* Table of contents */}
      <nav aria-label="Table of contents" className="border-y py-4">
        <ol className="grid gap-2 md:grid-cols-1 list-decimal list-inside text-sm md:text-base">
          <li>
            <a
              className="text-black hover:text-black/75 font-bold underline"
              href="#article-1"
            >
              Article 1. General provisions
            </a>
          </li>
          <li>
            <a
              className="text-black hover:text-black/75 font-bold underline"
              href="#article-2"
            >
              Article 2. Account registration
            </a>
          </li>
          <li>
            <a
              className="text-black hover:text-black/75 font-bold underline"
              href="#article-3"
            >
              Article 3. Publication of the Order and Product Information
            </a>
          </li>
          <li>
            <a
              className="text-black hover:text-black/75 font-bold underline"
              href="#article-4"
            >
              Article 4. Transactions
            </a>
          </li>
          <li>
            <a
              className="text-black hover:text-black/75 font-bold underline"
              href="#article-5"
            >
              Article 5. Deposit and Payment Transaction
            </a>
          </li>
          <li>
            <a
              className="text-black hover:text-black/75 font-bold underline"
              href="#article-6"
            >
              Article 6. Delivery of Products
            </a>
          </li>
          <li>
            <a
              className="text-black hover:text-black/75 font-bold underline"
              href="#article-7"
            >
              Article 7. Protection of personal data
            </a>
          </li>
          <li>
            <a
              className="text-black hover:text-black/75 font-bold underline"
              href="#article-8"
            >
              Article 8. Complaints procedure
            </a>
          </li>
          <li>
            <a
              className="text-black hover:text-black/75 font-bold underline"
              href="#article-9"
            >
              Article 9. Disclaimer
            </a>
          </li>
          <li>
            <a
              className="text-black hover:text-black/75 font-bold underline"
              href="#article-10"
            >
              Article 10. Final provisions
            </a>
          </li>
          <li>
            <a
              className="text-black hover:text-black/75 font-bold underline"
              href="#annexes"
            >
              Annexes
            </a>
          </li>
        </ol>
      </nav>

      {/* Article 1 */}
      <article id="article-1" className="space-y-3 text-justify">
        <h2 className="text-xl font-bold">Article 1. General provisions</h2>
        <p>
          These Terms and Conditions of the Bilvio Platform for Buyers
          (hereinafter the &quot;Terms and Conditions&quot;) set out the rules
          for using the transaction platform operated on the Bilvio domain
          (hereinafter the &quot;Bilvio Platform&quot;), including submitting
          bids and completing purchases.
        </p>
        <p>
          The operator of the Bilvio Platform is Bilvio Europe OÜ, a company
          under Estonian law with its registered office in Tallinn, registered
          address: Lõõtsa 2b, 11415 Tallinn, Estonia, entered in the register
          kept by the Harju County Court under number 16624843, with a share
          capital of 1,000,000 euros, tax identification number: EE102562446
          (hereinafter the &quot;Operator&quot; or &quot;Seller&quot;).
        </p>
        <p>
          The Operator provides services to users of the Bilvio Platform
          (hereinafter &quot;Users&quot; or &quot;Buyers&quot;) in electronic
          form, including the paid services listed in Appendix No. 1 of these
          Terms and Conditions.
        </p>
        <p>
          The Bilvio Platform can only be used via a device with Internet access
          and a standard browser (Internet Explorer, Microsoft Edge, Google
          Chrome, Mozilla Firefox, Opera or Safari) in their current versions.
          To use some functionalities, including registration and submitting
          offers, the User must have an active e-mail account.
        </p>
      </article>

      {/* Article 2 */}
      <article id="article-2" className="space-y-3 text-justify">
        <h2 className="text-xl font-bold">Article 2. Account registration</h2>
        <p>
          Only persons who carry out business activities may become Users. An
          entrepreneur is any natural or legal person who, in contracts to which
          these Terms and Conditions apply, acts for purposes related to their
          business or professional activities. All actions on behalf of Users
          may be performed exclusively by duly authorized representatives.
        </p>
        <p>
          To use the functionalities of the Bilvio Platform and make purchases,
          the User must be registered (have an Account) by completing an
          electronic form on the Platform. If the User is also a
          &quot;Seller&quot; under the seller terms, Buyer and Seller
          functionalities are combined within one account; the role depends on
          the objective nature of the action at a given moment.
        </p>
        <p>
          When registering and using the Platform, the User must provide
          required, truthful data and statements. After submitting the form, the
          User will receive an e-mail describing how to confirm registration and
          other required information. After confirmation, the User can log in
          with the e-mail and password provided during registration.
        </p>
        <p>
          Using automated solutions to access the Account or making the Account
          available to other persons is at the User’s own risk.
        </p>
        <p>
          The contract for electronic services (Account creation) is concluded
          when the User gains access to the Account. The Account contains data
          provided in the registration form. The User must immediately update
          any changes via the appropriate form and is responsible for
          incomplete, outdated, or false data.
        </p>
        <p>
          The User must keep the password secret and promptly notify the
          Operator of unauthorized access and circumstances. If the User
          violates the Terms and Conditions, law, or good practices (e.g.,
          provides false/incomplete data or uses Platform materials without
          consent), the Operator may terminate or suspend the contract.
        </p>
        <p>
          It is prohibited to collect/process data from the Platform for
          transfer elsewhere, or to use the names &quot;Bilvio&quot; or the
          Operator’s distinctive graphics without consent.
        </p>
        <p>
          The Operator may verify User data for identification or to confirm
          declarations of will, including by requesting documents or a bank
          transfer. For documents in languages other than Polish or English, an
          officially certified translation into Polish or English may be
          requested.
        </p>
        <p>
          If the Operator has legitimate concerns about Account security or
          transactions (e.g., takeover, complaints, violations, or unpaid fees),
          the Operator may:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            condition Account use on proving credibility/entrepreneur status or
            fulfilling an obligation,
          </li>
          <li>temporarily restrict access to certain functionalities,</li>
          <li>
            suspend (deactivate) an Account for a fixed or indefinite period.
          </li>
        </ul>
        <p>
          The Account is maintained for an indefinite period. The User may
          request cancellation at any time (via form or other verifiable
          method). The User may not terminate if the User:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>has submitted/received an offer on the Platform,</li>
          <li>is completing a transaction,</li>
          <li>
            has receivables/liabilities to the Operator from Platform use.
          </li>
        </ul>
      </article>

      {/* Article 3 */}
      <article id="article-3" className="space-y-3 text-justify">
        <h2 className="text-xl font-bold">
          Article 3. Publication of the Order and Product Information
        </h2>
        <p>
          The Platform publishes information about motor vehicles (the
          &quot;Products&quot;) and their sale/delivery terms. Selecting
          Products and confirming willingness to purchase is an offer to
          conclude a purchase contract (the &quot;Order&quot;).
        </p>
        <p>
          The Buyer selects Products by adding them to a wish list and may
          search using filters. Inclusion in the wish list is not a reservation.
          If availability is exhausted before confirmation, the Order will not
          be accepted.
        </p>
        <p>
          The Buyer must provide a complete, correct delivery address and a
          phone number that remains unchanged until delivery. The delivery
          address cannot be changed after placing the Order.
        </p>
      </article>

      {/* Article 4 */}
      <article id="article-4" className="space-y-3 text-justify">
        <h2 className="text-xl font-bold">Article 4. Transactions</h2>
        <p>
          Purchases under the Account must be related to the Buyer’s business
          activity. By accepting the Product terms, the Buyer submits an offer
          to purchase.
        </p>
        <p>
          After placing an Order, the Buyer receives an e-mail confirmation.
          Acceptance or rejection will be communicated no later than the end of
          the next business day (considering supplier or Operator holidays). The
          Order is binding on the Buyer unless rejected by the Seller. Upon
          Seller confirmation, a purchase contract (the &quot;Transaction&quot;)
          is concluded.
        </p>
        <p>
          If the Seller cannot fulfill the contract due to unavailability,
          nondelivery, damage, or loss, the Seller will immediately inform the
          Buyer, withdraw, and return payments. The Buyer will be informed of
          progress via the Platform.
        </p>
      </article>

      {/* Article 5 */}
      <article id="article-5" className="space-y-3 text-justify">
        <h2 className="text-xl font-bold">
          Article 5. Deposit and Payment Transaction
        </h2>
        <p>
          Payments are made to the Operator’s bank account specified in the
          Order confirmation. The Buyer must pay the deposit immediately after
          generation, but no later than within 2 business days, based on the
          invoice in the User Account. The deposit is a percentage of the Order
          value (at least the value of one car). Failure to pay cancels the
          Order.
        </p>
        <p>
          After deposit payment, the Operator issues a deposit invoice for the
          full Order amount. The Buyer must pay amounts in that invoice no later
          than 2 working days (payments may be divided by availability if all
          vehicles are not available simultaneously).
        </p>
        <p>
          Purchases are documented by invoice. The Buyer consents to tax
          documents being made available in the Account and notified via e-mail.
          All payments/billing must use the bank accounts specified at
          registration and the payment title specified by the Operator.
        </p>
        <p>
          If the Buyer unjustifiably withdraws or refuses to accept the Product,
          a contractual penalty applies per Appendix No. 1.
        </p>
      </article>

      {/* Article 6 */}
      <article id="article-6" className="space-y-3 text-justify">
        <h2 className="text-xl font-bold">Article 6. Delivery of Products</h2>
        <p>
          The Operator organizes transport to the warehouse specified in the
          Order and prepares documents necessary to use the Product. The place
          of performance is where the Product will be collected (or should be
          collected per the Buyer’s decision).
        </p>
        <p>
          The Buyer must provide via the Platform a copy of the CMR consignment
          note confirming delivery and acceptance protocols. Delivery time is
          stated in the Order summary with a tolerance of up to 30 business
          days, provided timely payment.
        </p>
        <p>
          Products are delivered exclusively to addresses in countries/locations
          specified by the Seller. The Operator informs the Buyer of delivery
          details (date, transport, carrier).
        </p>
        <p>
          Delivered at Place (DAP – Incoterms 2020) applies: the Operator is
          responsible for transport to the place designated by the Buyer and
          pays costs except customs and border fees in the destination country.
        </p>
        <p>
          The Buyer must check Products on collection/delivery. For damage
          likely during transport, the Buyer must issue a damage report, enter
          remarks on the CMR, provide photo documentation, and immediately
          inform the Operator.
        </p>
        <p>
          Claims for transport damage must be reported via the Platform no later
          than 2 business days from receipt and include:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>a scanned CMR with damage note, signed by the carrier,</li>
          <li>photo documentation,</li>
          <li>repair cost calculation.</li>
        </ul>
        <p>
          The Operator responds within 5 working days. If userConcentd, the Buyer will
          be asked to send an accounting document for reimbursement. If not
          userConcentd, the Operator may request a revised calculation or prepare one
          based on documentation.
        </p>
        <p>
          The Seller is not liable for failure to accept the Product due to
          reasons attributable to the Buyer (e.g., incorrect/incomplete
          address). The Operator provides tools to manage the transaction;
          failure to use them may result in a contractual penalty (Appendix No.
          1).
        </p>
      </article>

      {/* Article 7 */}
      <article id="article-7" className="space-y-3 text-justify">
        <h2 className="text-xl font-bold">
          Article 7. Protection of personal data
        </h2>
        <p>
          The Operator is the administrator of personal data of Users and
          persons designated by Users and processes data in accordance with
          European law solely for purposes related to activities within the
          Platform (including concluding/fulfilling purchase contracts,
          communication, complaints) and archiving transactions.
        </p>
        <p>
          Personal data is processed to: (a) conclude a contract with the
          Operator; (b) fulfill the contract for the User; (c) fulfill the
          Operator’s legitimate interests (e.g., protection against claims or
          providing delivery addresses of third parties provided by Users).
          Providing data is voluntary, but failure to provide certain data may
          prevent proper service.
        </p>
        <p>
          Data may be provided to third countries only if they meet European law
          requirements. Data is stored for the period necessary to fulfill
          orders or maintain the Account, and may be processed thereafter due to
          legal obligations or legitimate interests.
        </p>
        <p>
          Data subjects have rights (access, rectification, deletion,
          portability, restriction, objection, withdrawal of consent). The
          Operator protects personal data against disclosure, loss, or
          unauthorized change using appropriate technical/organizational
          measures.
        </p>
        <p>
          For matters not covered, the Personal Data Protection and Cookies
          Policy (Annex No. 2) applies. The User must fulfill the information
          obligation toward persons whose data the User provided to the
          Operator.
        </p>
      </article>

      {/* Article 8 */}
      <article id="article-8" className="space-y-3 text-justify">
        <h2 className="text-xl font-bold">Article 8. Complaints procedure</h2>
        <p>
          The User may file a complaint if the Operator or Seller fails to
          fulfill or improperly fulfills obligations under these Terms and
          Conditions, or if the Operator’s actions conflict with them.
        </p>
        <p>
          Complaints can be submitted via the Platform contact form, by e-mail
          to contact@Bilvio, or in writing to: EDP, ul. Krzemowa 1, 62-002
          Złotniki, Poland.
        </p>
        <p>
          The complaint must include contact details (as on the Platform), a
          description of the relevant Transaction, other pertinent
          circumstances, and a specific claim. If additions are needed, the
          Operator will request them. Properly notified complaints will be
          handled within 30 days, with the method of resolution communicated as
          requested by the User. If rejected, reasons will be provided.
        </p>
      </article>

      {/* Article 9 */}
      <article id="article-9" className="space-y-3 text-justify">
        <h2 className="text-xl font-bold">
          Article 9. Disclaimer (accessibility of the Bilvio Platform)
        </h2>
        <p>
          The Operator may cancel/stop publication of Product information if it
          conflicts with the Terms and Conditions (concluded Transactions remain
          valid). If the User violates the Terms, the Operator may:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>warn the User via e-mail,</li>
          <li>give the User a warning via e-mail,</li>
          <li>
            temporarily restrict access to services (including partial/complete
            restriction of Account functionality),
          </li>
          <li>
            condition use on confirming certain facts or proper completion of a
            Transaction,
          </li>
          <li>
            suspend one, several, or all Accounts for a fixed/indefinite period,
          </li>
          <li>
            impose a contractual penalty in accordance with Appendix No. 1.
          </li>
        </ul>
        <p>
          The User must immediately comply with restrictions or obligations
          imposed. In accordance with Annex No. 1, compensation may be awarded
          to Buyers who suffer damage due to Sellers’ dishonest actions (e.g.,
          unjustified non-fulfillment, missed deadlines, missing required
          documents). The Operator’s liability for defects is excluded.
        </p>
      </article>

      {/* Article 10 */}
      <article id="article-10" className="space-y-3 text-justify">
        <h2 className="text-xl font-bold">Article 10. Final provisions</h2>
        <p>
          The Operator will inform the User within the Platform about changes to
          these Terms and Conditions. Changes take effect on the date specified,
          not earlier than 7 days from issue, except technical/informational
          changes or those not worsening Users’ situation may take effect
          sooner. Users who accepted Orders before changes are governed by the
          current version. Changed Terms apply to a registered User who does not
          terminate the Account userConcentment before the effective date.
        </p>
        <p>
          For statistical/quality reasons, the Operator uses information
          (cookies) stored on the User’s device; details are in Annex No. 2.
          Users decide cookie settings via their browser.
        </p>
        <p>
          Users may not use graphic elements (including the &quot;Bilvio&quot;
          logo), layout, or other IP without explicit written consent.
        </p>
        <p>
          If any provision is invalid, the remainder remains in force. The
          parties will replace it with a new provision of similar purpose.
        </p>
        <p>
          The Terms are created in Polish, English, Czech, French, German, and
          Hungarian. In case of discrepancies, the Polish version prevails.
        </p>
        <p>
          The parties are not liable for consequences of force majeure (fire,
          flood, terrorist attack, natural disasters, epidemics, etc.). The
          affected party must immediately notify the other; failure or delay in
          notification may preclude invoking force majeure.
        </p>
        <p>
          Purchase contracts between the User and the Operator are governed by
          these Terms and Conditions and Polish law. The UN CISG (Vienna
          Convention, April 11, 1980) does not apply. Disputes are finally
          resolved per the Arbitration Rules of the Arbitration Court at the
          State Chamber of Commerce in Warsaw, by arbitrator(s) appointed under
          those Rules.
        </p>
      </article>

      {/* Annexes */}
      <article id="annexes" className="space-y-3 text-justify">
        <h2 className="text-xl font-bold">ANNEXES</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Appendix No. 1 – Fees and commissions</li>
          <li>Appendix No. 2 – Privacy and Cookie Policy</li>
        </ul>
        <h3 className="text-lg font-semibold">
          Appendix No. 1 – Fees and commissions
        </h3>
        <p>
          The Operator receives a fee for completing the transaction in the form
          of a &quot;success fee&quot;, which is included in the price of the
          vehicle.
        </p>
      </article>
    </section>
  );
}
