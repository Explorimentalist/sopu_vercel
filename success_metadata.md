
##Retrieving Metadata

When fetching the session details on the success page, you need to use the expand parameter to access the nested metadata. Here's how you can modify your retrieval code:

###Javascript
const session = await stripe.checkout.sessions.retrieve(sessionId, {
  expand: ['line_items.data.price.product']
});


This expansion is crucial because it allows you to access the product-level metadata, which is where your custom fields are stored.

##Best Practices for Metadata Persistence
- Use payment_intent_data.metadata for Session-Level Metadata: If you need to attach metadata to the entire session, use the payment_intent_data.metadata field when creating the session5.
- Expand Line Items and Products: Always use the expand parameter when retrieving session details to access nested metadata.
- Consistent Metadata Structure: Maintain a consistent structure for your metadata across different levels (session, line item, product) to ease retrieval and processing.
- Webhook Integration: Implement Stripe webhooks to capture checkout.session.completed events. This can provide more reliable access to session data, including metadata2.

##Known Limitations and Workarounds
- Metadata Copying: Stripe doesn't automatically copy metadata between related objects. For instance, metadata set on a Subscription won't automatically appear on its Invoices or Charges4.
- Character Limits: Stripe imposes a limit on the total number of characters in metadata fields. Ensure your metadata stays within these limits.
- Sensitive Data: Avoid storing sensitive information in metadata as it's not encrypted.

##Code Example for Retrieving Metadata
Here's an example of how to retrieve and process the metadata on your success page:

###Javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function getSessionWithMetadata(sessionId) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items.data.price.product']
  });

  const lineItems = session.line_items.data.map(item => ({
    ...item,
    product_metadata: item.price.product.metadata
  }));

  return {
    session,
    lineItems
  };
}

This function retrieves the session with expanded line items and extracts the product metadata for each item.