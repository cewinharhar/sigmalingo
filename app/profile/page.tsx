import { ProfileQuestions } from "@/components/profile-questions";
import { ProfileAnswers } from "@/components/profile-answers";

const ProfilePage = () => {
  return (
    <div className="flex h-full flex-col gap-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Profile</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProfileQuestions />
        <ProfileAnswers />
      </div>
    </div>
  );
};

export default ProfilePage; 