import Image from "next/image";
import { useRouter } from "next/router";
// import React from "react";
// import HeaderBanner from "../components/HeaderBanner";
import Head from "next/head";

function TermsAndConditions(props) {
  //   const { faqs } = props;
  const faqs = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const router = useRouter();

  return (
    <div className=" bg-white px-3 sm:px-8 lg:px-[5rem]">
      <Head>
        <title>Terms and Conditions</title>
        <meta
          name="description"
          content="Terms and Conditions of Asheville Garage Sales"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <HeaderBanner text={"FAQ"} /> */}

      <div className="flex  justify-center md:mb-2 font-bold text-xs 320:text-base 350:text-2xl sm:text-2xl md:text-4xl  text-center text-pry-color mt-6">
        Terms & Conditions
      </div>

      <br />
      <h2>
        <strong>1. Introduction</strong>
      </h2>
      <p>
        These Terms of Use govern your access to and use of our platform among
        other things. By using the Asheville Garage Sales platform, you agree to
        these Terms of Use and affirm that you are of legal age to enter into
        these Terms of Use and/or that you have the legal capacity to enter into
        these Terms of Use. If you violate or do not agree to these Terms of
        Use, then your access to and use of Asheville Garage Sales platform is
        unauthorized.
      </p>
      <p>
        By agreeing to these Terms of Use, you agree to submit any disputes
        between you and Asheville Garage Sales exclusively to individual
        arbitration and not to sue in court. This means you are giving up the
        right to sue in court or in class actions of any kind.
      </p>

      <h2>
        <strong>2. Definition of Terms</strong>
      </h2>
      <ul>
        <li>
          <strong>1.1 Company</strong> (referred to as either &apos;the
          Company&apos;, &apos;We&apos;, &apos;Us&apos; or &apos;Our&apos; in
          these Terms of Use) refers to Asheville Garage Sales.
        </li>
        <li>
          <strong>1.2 Content</strong> refers to content such as text, images,
          or other information that can be posted, uploaded, linked to or
          otherwise made available by you, regardless of the form of that
          content.
        </li>
        <li>
          <strong>1.3 Feedback</strong> means feedback or suggestions sent by
          you regarding the attributes, performance or features of our Service.
        </li>
        <li>
          <strong>1.4 Products</strong> refers to the products or items offered
          for sale on our Company&apos;s website.
        </li>
        <li>
          <strong>1.5 Orders</strong> means a request by you to purchase
          Products from Us.
        </li>
        <li>
          <strong>1.6 Promotions</strong> refer to contests or other promotions
          offered through the Service.
        </li>
        <li>
          <strong>1.7 Service</strong> refers to every service offered by
          Asheville Garage Sales.
        </li>
        <li>
          <strong>1.8 Terms of Use</strong> (also referred to as &apos;Terms and
          Conditions&apos;) means these Terms and Conditions that form the
          entire agreement between you and the Company regarding the use of Our
          services.
        </li>
        <li>
          <strong>1.9 Website</strong> (also referred to as “Our Platform”)
          means ashvillegaragesale.com
        </li>
      </ul>

      <h2>
        <strong>3. Modification and Update of Terms of Use</strong>
      </h2>
      <p>
        We may update these Terms of Use, our Privacy Policy and/or the website
        from time to time by notifying you of such changes by any reasonable
        means, including by posting a revised Terms of Use or through the
        Company&apos;s website. Any such changes will not apply to any dispute
        between you and us arising prior to the date on which we posted the
        revised Terms of Use incorporating such changes or otherwise notified
        you of such changes. You agree that it is your responsibility to
        regularly check ashvillegaragesale.com for any updated Terms of Use or
        our Privacy Policy. In addition, by continuing to use or access any of
        Our Services or otherwise engaging with Asheville Garage Sales after we
        post any changes, you accept the updated Terms of Use.
      </p>

      <h2>
        <strong>4. Your Use of the Asheville Garage Sales Platform</strong>
      </h2>
      <p>
        You certify that any information you provide on Our Platform is accurate
        and complete. You are solely responsible for maintaining the
        confidentiality and security of your account, including username,
        password, and PIN. Asheville Garage Sales is not responsible for any
        losses arising out of the unauthorized use of your account. You agree
        that Asheville Garage Sales does not have any responsibility if you lose
        or share access to your device. Any agreement between you and the issuer
        of your credit card, debit card, or other form of payment will continue
        to govern your use of such payment method on the Asheville Garage Sales
        website. Asheville Garage Sales is not a party to any such agreement,
        nor is Asheville Garage Sales responsible for the content, accuracy, or
        unavailability of any method used for payment. Your account may be
        restricted or terminated for any reason, at our sole discretion. Except
        as otherwise provided by law, at any time without notice to you, we may
        (1) change, restrict access to, suspend, or discontinue the Asheville
        Garage Sales website or any portion of the Asheville Garage Sales
        website, and (2) charge, modify, or waive any fees required to use any
        services, functionality or other content available through the Asheville
        Garage Sales website or any portion of the Asheville Garage Sales
        Platform.
      </p>

      <h2>
        <strong>5. Product Orders</strong>
      </h2>
      <p>
        The receipt of an order number or an email order confirmation does not
        constitute the acceptance of an order or a confirmation of an offer to
        sell. Asheville Garage Sales reserves the right, without prior
        notification, to limit the order quantity on any item and/or to refuse
        service to any customer. Verification of information may be required
        prior to the acceptance of an order. However, by confirming your
        purchase at the end of the checkout process, you agree to accept and pay
        for the products as well as the shipping and handling charges and
        applicable taxes. The sales tax is based on the applicable state and
        local tax rates as well as the shipping and/or service location of your
        order. Please consult a tax professional for more information regarding
        the applicable sales tax on your order. Errors will be corrected when
        discovered and Asheville Garage Sales reserves the right to revoke any
        stated offer and to correct any error, inaccuracy, or omission
        (including after an order has been submitted). Asheville Garage Sales
        reserves the right, at its sole discretion, to refuse or cancel any
        order for any reason. Your account may also be restricted or terminated
        for any reason, at Asheville Garage Sales&apos; sole discretion. Items
        purchased pursuant to a quantity discount may be re-priced upon
        cancellation.
      </p>

      <h2>
        <strong>6. Links to Other Websites</strong>
      </h2>
      <p>
        The website may contain links to third-party websites (&apos;Other
        websites&apos;) that are not under our control. Asheville Garage Sales
        makes no claim and accepts no responsibility regarding the quality,
        nature or reliability of the other websites that are accessible by
        hyperlinks from the websites or link to the websites. Asheville Garage
        Sales provides these links to you as a convenience and the inclusion of
        any link does not imply endorsement by Asheville Garage Sales of other
        websites or any association with the operators of such other websites.
        You are responsible for viewing and abiding by the privacy statements
        and terms of use posted at any third-party websites.
      </p>

      <h2>
        <strong>7. Communications with Asheville Garage Sales</strong>
      </h2>
      <p>
        For all communications made to or with Asheville Garage Sales, including
        but not limited to feedback, questions, comments, suggestions and the
        like: (i) you will have no right to confidentiality in your
        communications and Asheville Garage Sales will have no obligation to
        protect your communications from disclosure; (ii) Asheville Garage Sales
        will be free to reproduce, use, disclose and distribute your
        communications to others without limitation; and (iii) Asheville Garage
        Sales will be free to use any ideas, concepts, know-how, content or
        techniques contained in your communications for any purpose whatsoever,
        including, but not limited to, the development, production and marketing
        of products and services that incorporate such information.
      </p>

      <h2>
        <strong>8. Indemnity</strong>
      </h2>
      <p>
        You agree to indemnify and hold Asheville Garage Sales and its agents
        and licensors harmless from any claim or demand, including reasonable
        attorneys’ fees, made by any third party due to or arising out of (i)
        your use of the websites, including any User Content you submit, post to
        or transmit through the websites, (ii) your violation of these Terms of
        Use or (iii) your violation of any rights of another user.
      </p>

      <h2>
        <strong>
          9. Asheville Garage Sales Rights to Use Content and Ideas
        </strong>
      </h2>
      <p>
        You grant to Asheville Garage Sales a royalty-free, perpetual,
        irrevocable, worldwide, unlimited, nonexclusive license to use,
        reproduce, create derivative works from, modify, publish, edit,
        translate, distribute, perform and display (publicly or otherwise) any
        Content that you make available, in any media or medium, and in any
        form, format, or forum now known or hereafter developed. You further
        agree that Asheville Garage Sales is free to use any Ideas for any
        purpose. Asheville Garage Sales may sublicense its rights in Content and
        Ideas through multiple tiers of sublicenses. Asheville Garage Sales is,
        and will be, under no obligation (1) to maintain any Content or Idea in
        confidence; (2) to pay any compensation for any Content or Idea; or (3)
        to respond to any Content or Idea. You grant to Asheville Garage Sales
        the right to use any name associated with any Content or Idea that you
        make available to Asheville Garage Sales, although Asheville Garage
        Sales has no obligation to exercise such right, or to otherwise provide
        any attribution for any Content or Idea.
      </p>

      <h2>
        <strong>10. Merchandise</strong>
      </h2>
      <p>
        The website may make available listings, descriptions, and images of
        goods and services (collectively, “Products”). Such Products may be made
        available by us or by third parties. We make no representations as to
        the completeness, accuracy, reliability, validity, or timeliness of such
        listings, descriptions, or images (including any features,
        specifications, and prices contained on the websites). Such information
        and the availability of any Product are subject to change at any time
        without notice.
      </p>
      <p>
        We have made efforts to accurately display the attributes of Products,
        including the applicable colors. However, as the actual colors you see
        will depend on your monitor, we cannot guarantee that your
        monitor&apos;s display of any color will accurately reflect actual
        product color or finish. In addition, certain weights, measures, and
        similar descriptions are approximate and are for convenience only.
      </p>
      <p>
        Asheville Garage Sales has no liability to you for content on the
        website that you find to be offensive, indecent, or objectionable.
      </p>

      <h2>
        <strong>11. Shipping and Delivery</strong>
      </h2>
      <p>
        Products will be shipped to an address designated by you, if applicable,
        so long as such address is complete and complies with the shipping
        restrictions contained on the Asheville Garage Sales websites. All
        transactions are made pursuant to a shipping contract, and, as a result,
        risk of loss and title for Products pass to you upon delivery of the
        Products to the carrier.
      </p>
      <p>
        Delivery of Products purchased from the Asheville Garage Sales websites
        to addresses outside the United States is limited. Some Products also
        have restricted delivery within the United States. Some Products may be
        available for pick up at physical Asheville Garage Sales store
        locations. Estimated delivery times are determined based on the method
        of shipping chosen when Products are purchased and the destination of
        the Products.
      </p>

      <h2>
        <strong>12. Copyrights</strong>
      </h2>
      <p>
        Asheville Garage Sales reserves all rights to all images and texts on
        the Website. The usage of images and texts shall not be permitted
        without the express consent of Asheville Garage Sales.
      </p>

      <h2>
        <strong>
          13. Final Provisions, Applicable Laws and Place of Jurisdiction
        </strong>
      </h2>
      <p>The laws of the United States shall apply.</p>
      <p>
        As far as legally permissible, the sole place of jurisdiction for all
        disputes in connection with any agreement that has been concluded
        between Asheville Garage Sales and any User shall be Virginia.
      </p>
    </div>
  );
}

export default TermsAndConditions;
