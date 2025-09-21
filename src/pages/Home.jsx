import LoginForm from "@/components/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import gedungUmk from "@/images/gedung-umk.webp"
import logoApp from "@/images/logoParentKanal.webp"


export default function HomePage() {
  return (
    <div 
    style={{ backgroundImage: `url(${gedungUmk})` }}
    className="
      min-h-screen bg-background flex items-center justify-center bg-no-repeat bg-cover"
    >
    <div className="flex items-center bg-primary/30 justify-center w-full min-h-screen p-4 backdrop-blur-md">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex w-full justify-center">
            <img src={logoApp} className="w-64 invert brightness-0" alt="" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Masuk ke Akun Anda</CardTitle>
            <CardDescription>Gunakan kredensial yang telah diberikan oleh pihak kampus</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  )
}
