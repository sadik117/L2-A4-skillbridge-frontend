export default function AboutUsPage() {
    return (
        <div className="container mx-auto px-4 py-16 min-h-[60vh]">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-6">About SkillBridge</h1>
                <p className="text-xl text-muted-foreground mb-12">Empowering learners worldwide through accessible, high-quality education.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mt-8 items-center">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground mb-6">
                        SkillBridge was founded with a simple yet powerful mission: to make quality education accessible to everyone, everywhere. 
                        We believe that the right guidance can unlock incredible potential in every learner.
                    </p>
                    <p className="text-muted-foreground">
                        Our platform connects passionate students with expert tutors, facilitating meaningful learning experiences 
                        that transcend geographical boundaries.
                    </p>
                </div>
                <div className="bg-muted rounded-xl p-8 aspect-video flex items-center justify-center">
                    <span className="text-muted-foreground">About Us Image Placeholder</span>
                </div>
            </div>
        </div>
    );
}
