/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};

export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "tagline",
      type: "string",
      required: false,
      label: "Tagline",
    },
    {
      fieldName: "subTaglineArabic",
      type: "string",
      required: false,
      label: "Sub-Tagline (Arabic)",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "heroImage",
      type: "file",
      required: false,
      label: "Hero Background Image",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary (Clay Brown)",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary (Charcoal Grey)",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent (Peach)",
        },
        {
          fieldName: "background",
          type: "color",
          required: false,
          label: "Background (Off White)",
        },
        {
          fieldName: "surface",
          type: "color",
          required: false,
          label: "Surface Cream",
        },
        {
          fieldName: "accentDark",
          type: "color",
          required: false,
          label: "Accent Dark (Peach Dark)",
        },
      ],
    },
    {
      fieldName: "heroHeading",
      type: "string",
      required: false,
      label: "Hero Heading",
    },
    {
      fieldName: "heroSubheading",
      type: "string",
      required: false,
      label: "Hero Subheading",
    },
    {
      fieldName: "heroCTAPrimary",
      type: "string",
      required: false,
      label: "Hero CTA Primary Button",
    },
    {
      fieldName: "heroCTASecondary",
      type: "string",
      required: false,
      label: "Hero CTA Secondary Button",
    },
    {
      fieldName: "whatsappNumber",
      type: "string",
      required: false,
      label: "WhatsApp Business Number",
    },
    {
      fieldName: "instagramHandle",
      type: "string",
      required: false,
      label: "Instagram Handle",
    },
    {
      fieldName: "tiktokHandle",
      type: "string",
      required: false,
      label: "TikTok Handle",
    },
    {
      fieldName: "email",
      type: "string",
      required: false,
      label: "Contact Email",
    },
    {
      fieldName: "palestineDonationPercent",
      type: "number",
      required: false,
      label: "Palestine Donation Percentage",
      min: 0,
      max: 100,
    },
    {
      fieldName: "newsletterDiscount",
      type: "number",
      required: false,
      label: "Newsletter Signup Discount (%)",
      min: 0,
      max: 100,
    },
    {
      fieldName: "showFlashSaleBanner",
      type: "boolean",
      required: false,
      label: "Show Flash Sale Banner",
    },
    {
      fieldName: "flashSaleEndDate",
      type: "datetime",
      required: false,
      label: "Flash Sale End Date",
    },
    {
      fieldName: "statsCustomers",
      type: "string",
      required: false,
      label: "Stats: Customers Count",
    },
    {
      fieldName: "statsProducts",
      type: "string",
      required: false,
      label: "Stats: Products Count",
    },
    {
      fieldName: "statsPremium",
      type: "string",
      required: false,
      label: "Stats: Premium Label",
    },
    {
      fieldName: "bankAccountName",
      type: "string",
      required: false,
      label: "Bank Account Name",
    },
    {
      fieldName: "bankAccountNumber",
      type: "string",
      required: false,
      label: "Bank Account Number",
    },
    {
      fieldName: "bankName",
      type: "string",
      required: false,
      label: "Bank Name",
    },
    {
      fieldName: "address",
      type: "string",
      required: false,
      label: "Store Address",
    },
    {
      fieldName: "aboutStory",
      type: "string",
      required: false,
      label: "Brand Story (About Page)",
    },
    {
      fieldName: "navLinks",
      type: "array",
      required: false,
      label: "Navigation Links",
      item: {
        type: "object",
        fields: [
          { fieldName: "label", type: "string", required: true, label: "Label" },
          { fieldName: "href", type: "string", required: true, label: "URL" },
        ],
      },
    },
    {
      fieldName: "featuredCollections",
      type: "array",
      required: false,
      label: "Featured Collections",
      item: {
        type: "object",
        fields: [
          { fieldName: "name", type: "string", required: true, label: "Collection Name" },
          { fieldName: "count", type: "string", required: false, label: "Product Count" },
          { fieldName: "image", type: "url", required: false, label: "Collection Image URL" },
          { fieldName: "slug", type: "string", required: false, label: "Slug" },
        ],
      },
    },
  ],
};
