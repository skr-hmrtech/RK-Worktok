import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/hooks/useLanguage";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { content } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot' | 'reset' | 'otp'>('login');

  const renderLoginForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-worktok-dark">{content.auth.login.title}</h2>
        <p className="text-gray-600 mt-2">{content.auth.login.subtitle}</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {content.auth.login.email}
          </label>
          <Input type="email" className="w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {content.auth.login.password}
          </label>
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"} 
              className="w-full pr-10" 
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button className="w-full bg-worktok-primary hover:bg-green-600 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          {content.auth.login.submit}
        </Button>
      </form>

      <div className="text-center space-y-2">
        <button
          type="button"
          className="text-worktok-primary hover:underline text-sm"
          onClick={() => setAuthMode('forgot')}
        >
          {content.auth.login.forgotPassword}
        </button>
        <p className="text-gray-600 text-sm">
          {content.auth.login.noAccount}{' '}
          <button
            type="button"
            className="text-worktok-primary hover:underline font-medium"
            onClick={() => setAuthMode('register')}
          >
            {content.auth.login.signUp}
          </button>
        </p>
      </div>
    </div>
  );

  const renderRegisterForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-worktok-dark">{content.auth.register.title}</h2>
        <p className="text-gray-600 mt-2">{content.auth.register.subtitle}</p>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {content.auth.register.firstName}
            </label>
            <Input className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {content.auth.register.lastName}
            </label>
            <Input className="w-full" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {content.auth.register.email}
          </label>
          <Input type="email" className="w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {content.auth.register.phone}
          </label>
          <Input type="tel" className="w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {content.auth.register.password}
          </label>
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"} 
              className="w-full pr-10" 
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {content.auth.register.confirmPassword}
          </label>
          <div className="relative">
            <Input 
              type={showConfirmPassword ? "text" : "password"} 
              className="w-full pr-10" 
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button className="w-full bg-worktok-primary hover:bg-green-600 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          {content.auth.register.submit}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-gray-600 text-sm">
          {content.auth.register.hasAccount}{' '}
          <button
            type="button"
            className="text-worktok-primary hover:underline font-medium"
            onClick={() => setAuthMode('login')}
          >
            {content.auth.register.signIn}
          </button>
        </p>
      </div>
    </div>
  );

  const renderForgotPasswordForm = () => (
    <div className="space-y-6">
      <button
        type="button"
        className="flex items-center text-worktok-primary hover:underline text-sm"
        onClick={() => setAuthMode('login')}
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        {content.auth.forgotPassword.backToLogin}
      </button>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-worktok-dark">{content.auth.forgotPassword.title}</h2>
        <p className="text-gray-600 mt-2">{content.auth.forgotPassword.subtitle}</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {content.auth.forgotPassword.email}
          </label>
          <Input type="email" className="w-full" />
        </div>

        <Button className="w-full bg-worktok-primary hover:bg-green-600 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          {content.auth.forgotPassword.submit}
        </Button>
      </form>
    </div>
  );

  const renderOTPForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-worktok-dark">{content.auth.otpVerify.title}</h2>
        <p className="text-gray-600 mt-2">{content.auth.otpVerify.subtitle}</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {content.auth.otpVerify.code}
          </label>
          <Input className="w-full text-center text-lg tracking-widest" maxLength={6} />
        </div>

        <Button className="w-full bg-worktok-primary hover:bg-green-600 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          {content.auth.otpVerify.submit}
        </Button>
      </form>

      <div className="text-center">
        <button
          type="button"
          className="text-worktok-primary hover:underline text-sm"
        >
          {content.auth.otpVerify.resend}
        </button>
      </div>
    </div>
  );

  const renderResetPasswordForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-worktok-dark">{content.auth.resetPassword.title}</h2>
        <p className="text-gray-600 mt-2">{content.auth.resetPassword.subtitle}</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {content.auth.resetPassword.password}
          </label>
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"} 
              className="w-full pr-10" 
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {content.auth.resetPassword.confirmPassword}
          </label>
          <div className="relative">
            <Input 
              type={showConfirmPassword ? "text" : "password"} 
              className="w-full pr-10" 
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button className="w-full bg-worktok-primary hover:bg-green-600 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          {content.auth.resetPassword.submit}
        </Button>
      </form>
    </div>
  );

  const renderCurrentForm = () => {
    switch (authMode) {
      case 'login':
        return renderLoginForm();
      case 'register':
        return renderRegisterForm();
      case 'forgot':
        return renderForgotPasswordForm();
      case 'otp':
        return renderOTPForm();
      case 'reset':
        return renderResetPasswordForm();
      default:
        return renderLoginForm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6">
          {renderCurrentForm()}
        </div>
      </DialogContent>
    </Dialog>
  );
}