import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../Common/Input";
import { Button } from "../Common/Button";
import { Alert } from "../Common/Alert";

export const LoginForm = ({ onLogin, onToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await onLogin({ email, password });

    setLoading(false);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <Alert type="error" message={error} />}

      <Input
        label="Email or Phone Number"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email or phone"
        required
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-11 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      <Button type="submit" variant="primary" fullWidth disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onToggleForm}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Don't have an account? Register
        </button>
      </div>
    </form>
  );
};
