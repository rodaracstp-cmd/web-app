import Link from "next/link";

function CheckCircleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-success"
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

interface BookingSuccessPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function BookingSuccessPage({
  searchParams,
}: BookingSuccessPageProps) {
  const { id } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircleIcon />
        </div>

        {id ? (
          <>
            <h1 className="text-3xl font-bold text-primary">
              Booking Confirmed!
            </h1>
            <p className="mt-3 text-text-muted">
              Your reservation has been successfully processed. Please save your
              confirmation ID for your records.
            </p>

            <div className="mt-6 rounded-xl border border-border bg-white p-6 shadow-sm">
              <p className="text-sm text-text-muted">Confirmation ID</p>
              <p className="mt-1 text-2xl font-bold tracking-wide text-primary">
                {id}
              </p>
            </div>

            <p className="mt-4 text-sm text-text-muted">
              A confirmation email will be sent to your email address shortly.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary">
              Thank You!
            </h1>
            <p className="mt-3 text-text-muted">
              Your booking has been received. Please check your email for
              confirmation details.
            </p>
          </>
        )}

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3 text-lg font-semibold text-white transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
