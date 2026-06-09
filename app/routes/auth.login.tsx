import { redirect } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { getUserFromRequest, signJwt, buildAuthCookie } from "~/modules/authentication/authentication.server";
import { AuthService } from "~/modules/authentication/authentication.service";
import { LoginCard } from "~/modules/authentication";
import { useConfigurables } from "~/modules/configurables";

export async function loader({ request }: LoaderFunctionArgs) {
  if (getUserFromRequest(request)) return redirect("/admin/dashboard");
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const user = await AuthService.login({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });
    const token = signJwt({ sub: user.id, role: user.role, username: user.username, email: user.email, email_verified: user.email_verified ?? false });
    return redirect("/admin/dashboard", {
      headers: { "Set-Cookie": buildAuthCookie(token, new URL(request.url).hostname) },
    });
  } catch (error: any) {
    return { error: error.message ?? "Email atau password salah" };
  }
}

export default function LoginRoute() {
  const { config } = useConfigurables();

  return (
    <div className="min-h-screen bg-haifa-offwhite flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="8" fill="#B17457" />
            <text x="18" y="26" textAnchor="middle" fill="white" fontFamily="'DM Serif Display', serif" fontSize="20" fontStyle="italic">H</text>
          </svg>
          <span className="font-display text-3xl italic text-haifa-clay">haifa</span>
        </div>
        <p className="font-body text-sm text-muted-foreground">Admin Panel</p>
      </div>
      <LoginCard />
    </div>
  );
}
