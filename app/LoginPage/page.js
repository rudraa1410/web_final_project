
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Github } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc';
import { useUserAuth } from "../_utils/auth-context";



export default function LoginPageWithBg({ layoutStyle = 'full' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false); // default to sign-in

 

  const { user, gitHubSignIn, googleSignIn,firebaseSignOut,emailSignUp, emailSignIn,} = useUserAuth();

  
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Call emailSignUp for registration
      await emailSignUp(email, password);
      router.push('/MainPage'); // Redirect to dashboard after successful sign-up
    } catch (err) {
      setError('Failed to sign up. Please try again.');
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Call emailSignIn for login
      await emailSignIn(email, password);
      router.push('/MainPage'); // ReMAindirect to dashboard after successful login
    } catch (err) {
      setError('Invalid email or password');
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      router.push("/MainPage"); // Redirect to dashboard after sign-in
    } catch (error) {
      console.error("Google Sign-In Failed:", error);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await gitHubSignIn();
      router.push("/MainPage"); // Redirect to dashboard after sign-in
    } catch (error) {
      console.error("GitHub Sign-In Failed:", error);
    }
  };
 

  const LoginForm = () => (
    <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSignIn} >
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <Label htmlFor="email-address">
              Email address
            </Label>
            <Input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          

          <div className="text-sm">
            <Link href="/MainPage" className="font-medium text-primary hover:text-primary/80">
              Forgot your password?
            </Link>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div>
          <Button
            type="submit"
            
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign in
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full" onClick={ handleGitHubSignIn}>
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </Button>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
          <FcGoogle className="w-5 h-5 mr-2" />
          Google
          </Button>
          
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Do not have an account?{' '}
          <Link href="/MainPage" className="font-medium text-primary hover:text-primary/80" onClick={handleSignUp}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center relative">
    <Image
  src="/Netflix-Background (1).jpg"
  alt="Netflix Background"
  fill
  style={{ objectFit: 'cover' }}
  quality={100}
  priority
/>

      {layoutStyle === 'full' ? (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <LoginForm />
        </div>
      ) : (
        <div className="absolute inset-0 flex">
          <div className="w-1/2 relative">
           
          </div>
          <div className="w-1/2 bg-white flex items-center justify-center">
            <LoginForm />
          </div>
        </div>
      )}
    </div>
  )
}