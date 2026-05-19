import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Award } from "lucide-react";

export default async function CertificatesPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: certs } = await supabase
    .from("certificates")
    .select("id, certificate_number, issued_at, course_id, courses(title, slug)")
    .eq("participant_id", user?.id ?? "")
    .order("issued_at", { ascending: false });

  const certificates = (certs ?? []).map((cert: any) => ({
    ...cert,
    courses: Array.isArray(cert.courses) ? cert.courses[0] : cert.courses,
  })) as unknown as Array<{
    id: string;
    certificate_number: string;
    issued_at: string;
    course_id: string;
    courses: { title: string; slug: string } | null;
  }>;

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      {/* Header */}
      <div>
        <span className="tm-eyebrow block mb-2">Achievements</span>
        <h1
          className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
        >
          My Certificates
        </h1>
        <p className="tm-body-sm mt-1">
          {certificates.length > 0
            ? `${certificates.length} certificate${certificates.length !== 1 ? "s" : ""} earned.`
            : "Complete a course to earn your first certificate."}
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-12 text-center flex flex-col items-center gap-3">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: "var(--beige-200)" }}
          >
            <Award className="size-6 text-[var(--taupe-400)]" />
          </div>
          <p className="text-sm text-[var(--taupe-400)] max-w-xs">
            No certificates yet. Your admin will issue one when you complete a course.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert) => (
            <Link
              key={cert.id}
              href={`/participant/certificates/${cert.id}`}
              className="group rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-6 flex flex-col gap-4 hover:shadow-md hover:border-[var(--beige-300)] dark:hover:border-white/10 transition-all"
            >
              {/* Icon */}
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgb(125 107 90 / 0.10)" }}
                >
                  <Award className="size-5 text-[var(--clay-500)]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--taupe-400)]">
                  {cert.certificate_number}
                </span>
              </div>

              {/* Course */}
              <div className="flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--taupe-400)] mb-1">
                  {cert.courses?.slug}
                </p>
                <h3 className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground text-base leading-snug">
                  {cert.courses?.title ?? "Course"}
                </h3>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-[var(--beige-200)] dark:border-white/5 flex items-center justify-between text-xs text-[var(--taupe-400)]">
                <span>
                  Issued{" "}
                  {new Date(cert.issued_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="group-hover:underline">View →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
