import RegisterForm from "@/components/authentication/registrationForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "SkillBridge | Sign Up",
  description: "Sign up to SkillBridge and start learning",
};

export default function SignUpPage() {
    return (
        <div>
            <RegisterForm></RegisterForm>
        </div>
    );
}