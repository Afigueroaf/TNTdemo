/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";
    const csp = isDev
      ? "default-src 'self' data: blob:; img-src 'self' data: blob: https://flagcdn.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' ws: wss: http: https:; worker-src 'self' blob:; media-src 'self' data: blob:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'"
      : "default-src 'self'; img-src 'self' data: blob: https://flagcdn.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https:; worker-src 'self' blob:; media-src 'self' data: blob:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'";

    const baseHeaders = [
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      {
        key: "Content-Security-Policy",
        value: csp,
      },
    ];

    const prodOnlyHeaders = isDev
      ? []
      : [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
        ];

    return [
      {
        source: "/:path*",
        headers: [...baseHeaders, ...prodOnlyHeaders],
      },
    ];
  },
};

export default nextConfig;
