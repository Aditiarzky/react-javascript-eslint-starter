import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, LogIn } from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (formData.email && formData.password) {
        localStorage.setItem(
          "parentPortalAuth",
          JSON.stringify({
            email: formData.email,
            loginTime: new Date().toISOString(),
          }),
        );
        window.location.href = "/dashboard";
      } else {
        setError("Email dan password harus diisi");
      }
    } catch (err) {
      setError(`Terjadi kesalahan saat login : ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Email */}
      <div className="relative">
        <Input
          id="username"
          type="text"
          placeholder=" "
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
          className="peer placeholder-transparent"
        />
        <Label
          htmlFor="username"
          className="
            absolute left-3 top-2.5 px-1
            bg-background
            text-muted-foreground transition-all
            peer-placeholder-shown:top-2.5 
            peer-placeholder-shown:text-sm 
            peer-placeholder-shown:text-gray-400
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary
            peer-[&:not(:placeholder-shown)]:-top-2 
            peer-[&:not(:placeholder-shown)]:text-xs
          "
        >
          Username
        </Label>
      </div>

      {/* Password */}
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder=" "
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          required
          className="peer placeholder-transparent"
        />
        <Label
          htmlFor="password"
          className="
            absolute left-3 top-2.5 px-1
            bg-background
            text-muted-foreground transition-all
            peer-placeholder-shown:top-2.5 
            peer-placeholder-shown:text-sm 
            peer-placeholder-shown:text-gray-400
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary
            peer-[&:not(:placeholder-shown)]:-top-2 
            peer-[&:not(:placeholder-shown)]:text-xs
          "
        >
          Password
        </Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Memproses...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Masuk
          </div>
        )}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        <p>Lupa password? Hubungi admin kampus</p>
      </div>
    </form>
  );
}

export default LoginForm;
