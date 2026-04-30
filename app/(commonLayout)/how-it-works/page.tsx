export default function HowItWorksPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-8">How It Works</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground">Learn how SkillBridge connects you with the perfect tutor.</p>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    <div className="p-6 border rounded-lg bg-card">
                        <div className="text-4xl mb-4">1</div>
                        <h3 className="text-xl font-semibold mb-2">Search for Tutors</h3>
                        <p className="text-muted-foreground">Browse through our extensive list of qualified tutors in various subjects.</p>
                    </div>
                    <div className="p-6 border rounded-lg bg-card">
                        <div className="text-4xl mb-4">2</div>
                        <h3 className="text-xl font-semibold mb-2">Book a Session</h3>
                        <p className="text-muted-foreground">Choose a time that works for you and schedule your learning session.</p>
                    </div>
                    <div className="p-6 border rounded-lg bg-card">
                        <div className="text-4xl mb-4">3</div>
                        <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
                        <p className="text-muted-foreground">Connect with your tutor online and achieve your learning goals.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
