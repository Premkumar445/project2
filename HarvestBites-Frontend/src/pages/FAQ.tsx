import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const faqCategories = [
  {
    category: "Product & Ingredients",
    questions: [
      {
        question: "What are millets, and why are they good for health?",
        answer:
          "Millets are ancient grains that have been cultivated in India for thousands of years. They are rich in fibre, iron, calcium, and other micronutrients. Unlike refined grains, millets release energy slowly, helping maintain steady blood sugar levels and supporting gut health.",
      },
      {
        question: "Do your cookies contain maida or refined sugar?",
        answer:
          "Absolutely not. Our cookies are made with 100% millet flour—no maida, no all-purpose flour. We use natural sweeteners like jaggery and dates instead of refined sugar. This is core to our philosophy of functional food.",
      },
      {
        question: "Are your products suitable for diabetics?",
        answer:
          "Our millet cookies have a lower glycemic index compared to regular cookies made with maida. However, we always recommend consulting with your healthcare provider for personalized dietary advice. Our products support healthy eating habits but are not intended as medical treatment.",
      },
      {
        question: "Are there any allergens in your products?",
        answer:
          "Our cookies may contain nuts and are processed in a facility that handles nuts and seeds. Please check individual product labels for specific allergen information. Our products are gluten-free (millets are naturally gluten-free), but are not suitable for those with severe gluten allergies due to potential cross-contamination.",
      },
    ],
  },
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer:
          "We ship across India. Orders are typically processed within 1-2 business days. Delivery takes 3-7 business days depending on your location. Metro cities usually receive orders within 3-4 days.",
      },
      {
        question: "What is your return/refund policy?",
        answer:
          "Due to the perishable nature of food products, we cannot accept returns. However, if you receive damaged products or if there's a quality issue, please contact us within 48 hours of delivery with photos, and we'll arrange a replacement or refund.",
      },
      {
        question: "Do you offer bulk or corporate orders?",
        answer:
          "Yes! We offer special pricing for bulk orders (50+ packs) and corporate gifting. Please email bulk@harvestbites.in for customized quotes and packaging options.",
      },
    ],
  },
  {
    category: "Storage & Shelf Life",
    questions: [
      {
        question: "What is the shelf life of your cookies?",
        answer:
          "Our cookies stay fresh for 60 days from the date of manufacture when stored properly. Because we don't use preservatives, proper storage is important for maintaining freshness.",
      },
      {
        question: "How should I store the cookies?",
        answer:
          "Store in a cool, dry place away from direct sunlight. Once opened, seal the pack tightly or transfer to an airtight container. In humid conditions, you may refrigerate the cookies.",
      },
    ],
  },
  {
    category: "Health & Nutrition",
    questions: [
      {
        question: "Can children eat these cookies daily?",
        answer:
          "Yes! Our cookies are designed to be safe and nutritious for daily consumption by children (typically ages 3+). They make a great alternative to sugary snacks and provide sustained energy for active kids. However, portion control is always recommended.",
      },
      {
        question: "Are your cookies suitable for pregnant women?",
        answer:
          "Our millet cookies can be a nutritious snack option during pregnancy, as millets are rich in iron and folate. However, we always recommend checking with your healthcare provider about your specific dietary needs during pregnancy.",
      },
      {
        question: "Can these cookies help with PCOD/PCOS?",
        answer:
          "While our cookies cannot cure or treat any medical condition, they are low-GI, fibre-rich, and made without refined sugars—qualities that align with dietary recommendations often given for PCOD/PCOS management. Please work with your healthcare provider for a comprehensive approach.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-display text-4xl md:text-3xl font-bold text-foreground">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our products, ingredients, and
              ordering process.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            {faqCategories.map((category) => (
              <div key={category.category} className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.category}-${index}`}
                      className="bg-card rounded-xl px-6 border-none shadow-sm"
                    >
                      <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? We&apos;re here to
              help.
            </p>
            <Button variant="secondary" asChild>
              <Link to="/contact">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
