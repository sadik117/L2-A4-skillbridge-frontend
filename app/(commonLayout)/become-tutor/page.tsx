import { Metadata } from "next";
import BecomeTutorClient from "./BecomeTutorClient";

export const metadata: Metadata = {
  title: "SkillBridge | Become Tutor",
  description: "Join our global community of expert educators.",
};

export default function BecomeTutorPage() {
  return <BecomeTutorClient />;
}