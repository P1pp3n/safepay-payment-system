import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../Common/Input";
import { Button } from "../Common/Button";
import { Alert } from "../Common/Alert";

export const RegisterForm = ({ onRegister, onToggleForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const result = await onRegister(formData);

    setLoading(false);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <Alert type="error" message={error} />}

      <Input
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your full name"
        required
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />

      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+254712345678"
      />

      <div className="relative">
        <Input
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
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

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your password"
        required
      />

      <Button type="submit" variant="primary" fullWidth disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onToggleForm}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Already have an account? Sign in
        </button>
      </div>
    </form>
  );
};
