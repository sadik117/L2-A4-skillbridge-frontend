import Link from "next/link";

export default function HelpCenterPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh]">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Help Center</h1>
                <p className="text-xl text-muted-foreground">How can we help you today?</p>
                
                <div className="max-w-xl mx-auto mt-8">
                    <input 
                        type="text" 
                        placeholder="Search for articles, guides, or FAQs..." 
                        className="w-full h-12 px-4 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                <Link href="#" className="p-6 border rounded-xl hover:border-primary/50 transition-colors bg-card block">
                    <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
                    <p className="text-muted-foreground">Learn the basics of using SkillBridge for the first time.</p>
                </Link>
                <Link href="#" className="p-6 border rounded-xl hover:border-primary/50 transition-colors bg-card block">
                    <h3 className="text-xl font-semibold mb-2">Account Management</h3>
                    <p className="text-muted-foreground">Manage your profile, settings, and notifications.</p>
                </Link>
                <Link href="#" className="p-6 border rounded-xl hover:border-primary/50 transition-colors bg-card block">
                    <h3 className="text-xl font-semibold mb-2">Payments & Billing</h3>
                    <p className="text-muted-foreground">Everything you need to know about payments, invoices, and refunds.</p>
                </Link>
                <Link href="#" className="p-6 border rounded-xl hover:border-primary/50 transition-colors bg-card block">
                    <h3 className="text-xl font-semibold mb-2">Tutor Guidelines</h3>
                    <p className="text-muted-foreground">Rules, expectations, and best practices for our tutors.</p>
                </Link>
                <Link href="#" className="p-6 border rounded-xl hover:border-primary/50 transition-colors bg-card block">
                    <h3 className="text-xl font-semibold mb-2">Troubleshooting</h3>
                    <p className="text-muted-foreground">Solutions to common technical issues and platform errors.</p>
                </Link>
                <Link href="#" className="p-6 border rounded-xl hover:border-primary/50 transition-colors bg-card block">
                    <h3 className="text-xl font-semibold mb-2">Safety & Security</h3>
                    <p className="text-muted-foreground">How we keep our platform safe and protect your data.</p>
                </Link>
            </div>
        </div>
    );
}
