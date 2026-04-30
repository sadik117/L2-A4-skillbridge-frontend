export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Have questions or feedback? We'd love to hear from you. Fill out the form below 
                and our team will get back to you within 24 hours.
            </p>

            <div className="max-w-xl mx-auto">
                <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">First Name</label>
                            <input type="text" className="w-full h-10 px-3 rounded-md border border-input bg-background" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Last Name</label>
                            <input type="text" className="w-full h-10 px-3 rounded-md border border-input bg-background" placeholder="Doe" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input type="email" className="w-full h-10 px-3 rounded-md border border-input bg-background" placeholder="john@example.com" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Message</label>
                        <textarea className="w-full h-32 px-3 py-2 rounded-md border border-input bg-background resize-none" placeholder="How can we help you?"></textarea>
                    </div>

                    <button className="w-full h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
