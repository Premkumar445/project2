import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-display text-4xl md:text-4xl font-bold text-foreground">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our products, bulk orders, or partnerships?
              We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We&apos;re here to help with any questions about our millet cookies,
                  functional nutrition, or wholesale inquiries.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">
                      jothiprasath@harvestbites.in
                    </p>
                    <p className="text-sm text-muted-foreground/70">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-muted-foreground">+91 98865 44997</p>
                    <p className="text-sm text-muted-foreground/70">
                      Mon-Sat, 10am-6pm IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-muted-foreground">Hosur, Tamil Nadu</p>
                    <p className="text-sm text-muted-foreground/70">India</p>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl">
                <h3 className="font-semibold text-foreground mb-3">
                  Bulk & Corporate Orders
                </h3>
                <p className="text-sm text-muted-foreground">
                  Looking for bulk orders for your office, school, or event?
                  We offer special pricing and customized packaging.
                  Email us at{" "}
                  <span className="text-primary">
                    jothiprasath@harvestbites.com
                  </span>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground">
                    Your message has been sent. We&apos;ll get back to you within
                    24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                      Send us a Message
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form below and we&apos;ll respond as soon as
                      possible.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Name
                      </label>
                      <Input placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Phone (Optional)
                    </label>
                    <Input type="tel" placeholder="+91 98765 43210" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <Input placeholder="What's this about?" required />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell us more..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
