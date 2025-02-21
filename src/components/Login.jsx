import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../config/authService";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
    first_name: "",
    last_name: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await authService.login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.password2) {
          setError("Passwords do not match");
          return;
        }
        await  authService.register({
          email: formData.email,
          password2: formData.password2,
          password: formData.password,
          username: formData.username,
          first_name: formData.first_name,
          last_name: formData.last_name,
        });

        await authService.login(formData.email, formData.password);
      }
      navigate("/questions");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-red-50 via-white to-red-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,0,0,0.1),rgba(255,255,255,0)_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,0,0,0.05),rgba(255,255,255,0)_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="backdrop-blur-md bg-white/80 p-8 rounded-2xl shadow-xl border border-white/20">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-red-600 to-red-800 text-transparent bg-clip-text mb-8">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>

            {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                    <>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                          placeholder="Enter your username"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </>
                    )}

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    {!isLogin && (
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                      Confirm Password
                      </label>
                      <input
                      type="password"
                      name="password2"
                      value={formData.password2}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                      placeholder="Confirm your password"
                      required
                      />
                    </div>
                    )}

                    {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-semibold text-lg
                  bg-gradient-to-r from-red-600/90 to-red-800/90 
                  hover:from-red-700/90 hover:to-red-900/90
                  text-white shadow-lg shadow-red-200/50
                  transform transition-all duration-300
                  hover:scale-105 hover:shadow-xl
                  backdrop-blur-md border border-white/20"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* Toggle between Login and Register */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-600 hover:text-red-800 font-medium transition-colors"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}