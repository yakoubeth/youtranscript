import Header from '../../components/Header';
import SignupForm from '../../components/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <Header />
      <main className="pt-16">
        <SignupForm />
      </main>
    </div>
  );
}
