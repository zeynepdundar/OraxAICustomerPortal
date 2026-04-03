import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-10">
      <section className="flex w-full max-w-5xl flex-1 flex-col justify-between gap-16 rounded-[32px] border border-slate-200 bg-white px-8 py-12 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] sm:px-12 sm:py-16">
        <Image
          className="h-auto"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <span className="rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-600">
            Shared layout header is now active
          </span>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-slate-950"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-slate-950"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-white transition-colors hover:bg-slate-800 md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="h-auto invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-slate-200 px-5 text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </section>
    </div>
  );
}
