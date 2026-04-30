export default function FAQPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
            <div className="max-w-3xl space-y-6">
                <div className="border-b pb-4">
                    <h3 className="text-xl font-semibold mb-2">How do I pay for a session?</h3>
                    <p className="text-muted-foreground">We accept all major credit cards and PayPal. Payment is securely processed before your session starts.</p>
                </div>
                <div className="border-b pb-4">
                    <h3 className="text-xl font-semibold mb-2">Can I cancel or reschedule a session?</h3>
                    <p className="text-muted-foreground">Yes, you can cancel or reschedule up to 24 hours before the session without any penalty.</p>
                </div>
                <div className="border-b pb-4">
                    <h3 className="text-xl font-semibold mb-2">How are tutors vetted?</h3>
                    <p className="text-muted-foreground">All our tutors go through a rigorous screening process, including background checks and qualification verification.</p>
                </div>
            </div>
        </div>
    );
}
