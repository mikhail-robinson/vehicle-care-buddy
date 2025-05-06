
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Info } from 'lucide-react';

const Help = () => {
  const faqs = [
    {
      question: "How do I add a new vehicle?",
      answer: "To add a new vehicle, navigate to the dashboard and click on the 'Add Vehicle' button. Fill in the required information such as make, model, year, and license plate number, then save the details."
    },
    {
      question: "How do I record a service?",
      answer: "Select a vehicle from the dashboard, navigate to the Service History tab, and click on 'Add Service'. Enter the service details including type, date, mileage, and any relevant notes."
    },
    {
      question: "What does the AI Assistant do?",
      answer: "The AI Assistant provides maintenance advice and answers questions about your vehicle. You can ask about recommended service intervals, troubleshooting common issues, or general car care tips tailored to your specific vehicle."
    },
    {
      question: "How can I export my service history?",
      answer: "Go to the Service History page, select the vehicle whose records you want to export, and click on the 'Export' button. You can choose to export as PDF or CSV format."
    },
    {
      question: "Can I set reminders for upcoming maintenance?",
      answer: "Yes! Navigate to Settings and enable 'Maintenance Notifications'. You can then set up specific reminders for services like oil changes, tire rotations, and other regular maintenance tasks."
    }
  ];

  return (
    <Layout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Help & Support</h1>
          <p className="text-gray-500">Find answers to common questions</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Info className="h-5 w-5 text-dashboard-accent mr-2" />
                <CardTitle>Frequently Asked Questions</CardTitle>
              </div>
              <CardDescription>
                Common questions and answers about Vehicle Care Buddy
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Can't find what you're looking for?</CardTitle>
              <CardDescription>
                Reach out to our support team or check our documentation
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Button className="flex-1">Contact Support</Button>
                <Button variant="outline" className="flex-1">View Documentation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
