export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                    We collect information you provide directly to us when you create an account, update your profile, 
                    use our services, or communicate with us.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                    We use the information we collect to provide, maintain, and improve our services, 
                    to process your transactions, and to communicate with you.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
                <p className="text-muted-foreground mb-4">
                    We implement appropriate security measures to protect your personal information 
                    against unauthorized access, alteration, disclosure, or destruction.
                </p>
            </div>
        </div>
    );
}
