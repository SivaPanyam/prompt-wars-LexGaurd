# LexGuard Design System & Layouts

## Design System (Lexguard Alpha)




## Layouts


### Lex_LandingPage

``html
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>LexGuard | Legal Operations Platform</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        @font-face {
            font-family: 'Geist';
            src: url('https://fonts.cdnfonts.com/css/geist');
        }
        body {
            font-family: 'Geist', sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "primary": "#1f108e",
                      "surface-tint": "#544fc0",
                      "surface-container-low": "#f2f3ff",
                      "surface-bright": "#faf8ff",
                      "secondary-container": "#d0e1fb",
                      "on-error": "#ffffff",
                      "surface-container-high": "#e2e7ff",
                      "surface-container-highest": "#dae2fd",
                      "outline-variant": "#c8c4d5",
                      "secondary-fixed-dim": "#b7c8e1",
                      "inverse-primary": "#c3c0ff",
                      "secondary-fixed": "#d3e4fe",
                      "surface-container": "#eaedff",
                      "primary-container": "#3730a3",
                      "on-primary-container": "#a9a7ff",
                      "on-primary": "#ffffff",
                      "on-tertiary": "#ffffff",
                      "surface-variant": "#dae2fd",
                      "surface-container-lowest": "#ffffff",
                      "tertiary-fixed": "#ffdbcc",
                      "on-background": "#131b2e",
                      "on-primary-fixed-variant": "#3b35a7",
                      "inverse-on-surface": "#eef0ff",
                      "on-secondary-fixed": "#0b1c30",
                      "on-error-container": "#93000a",
                      "on-surface": "#131b2e",
                      "error-container": "#ffdad6",
                      "on-secondary-container": "#54647a",
                      "outline": "#777584",
                      "on-surface-variant": "#464553",
                      "primary-fixed-dim": "#c3c0ff",
                      "on-secondary-fixed-variant": "#38485d",
                      "secondary": "#505f76",
                      "on-tertiary-fixed-variant": "#7a3003",
                      "on-secondary": "#ffffff",
                      "inverse-surface": "#283044",
                      "surface-dim": "#d2d9f4",
                      "on-primary-fixed": "#0f0069",
                      "background": "#faf8ff",
                      "surface": "#faf8ff",
                      "tertiary": "#511c00",
                      "on-tertiary-fixed": "#351000",
                      "tertiary-fixed-dim": "#ffb694",
                      "tertiary-container": "#752c00",
                      "primary-fixed": "#e2dfff",
                      "error": "#ba1a1a"
              },
              "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
              },
              "spacing": {
                      "md": "16px",
                      "margin-mobile": "16px",
                      "gutter": "16px",
                      "xl": "32px",
                      "lg": "24px",
                      "xs": "4px",
                      "unit": "4px",
                      "sm": "8px",
                      "margin-desktop": "32px"
              },
              "fontFamily": {
                      "headline-sm": ["Geist"],
                      "headline-lg": ["Geist"],
                      "body-lg": ["Geist"],
                      "headline-lg-mobile": ["Geist"],
                      "headline-md": ["Geist"],
                      "body-sm": ["Geist"],
                      "body-md": ["Geist"],
                      "label-sm": ["Geist"],
                      "label-md": ["Geist"]
              },
              "fontSize": {
                      "headline-sm": ["18px", {"lineHeight": "24px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                      "headline-lg": ["30px", {"lineHeight": "36px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                      "body-lg": ["16px", {"lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400"}],
                      "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                      "headline-md": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.015em", "fontWeight": "600"}],
                      "body-sm": ["13px", {"lineHeight": "18px", "letterSpacing": "0em", "fontWeight": "400"}],
                      "body-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "400"}],
                      "label-sm": ["11px", {"lineHeight": "14px", "letterSpacing": "0.03em", "fontWeight": "600"}],
                      "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}]
              }
            },
          },
        }
    </script>
</head>
<body class="bg-background text-on-surface">
<!-- Top Navigation Bar (Partial Shell Implementation) -->
<nav class="h-16 fixed top-0 left-0 right-0 bg-surface/80 backdrop-blur-md border-b border-outline-variant z-50 px-lg flex justify-between items-center">
<div class="flex items-center gap-sm">
<span class="text-body-lg font-headline-md font-bold text-primary">LexGuard</span>
</div>
<div class="hidden md:flex items-center gap-xl">
<a class="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Platform</a>
<a class="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Solutions</a>
<a class="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Resources</a>
<a class="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Pricing</a>
</div>
<div class="flex items-center gap-md">
<button class="hidden sm:block text-label-md font-label-md text-on-surface hover:text-primary transition-colors">Sign In</button>
<button class="bg-primary text-on-primary px-lg py-sm rounded-lg text-label-md font-label-md hover:opacity-90 transition-opacity">
                Get Started
            </button>
</div>
</nav>
<!-- Hero Section -->
<header class="pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto text-center">
<div class="inline-flex items-center gap-xs px-sm py-xs bg-surface-container-high rounded-full border border-outline-variant mb-xl">
<span class="text-label-sm font-label-sm text-primary uppercase">New</span>
<span class="text-label-sm font-label-sm text-on-surface-variant">AI-Powered Compliance is here</span>
</div>
<h1 class="text-headline-lg-mobile md:text-headline-lg lg:text-6xl font-headline-lg max-w-4xl mx-auto leading-tight mb-md">
            Legal Operations at the Speed of Light
        </h1>
<p class="text-body-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-xl">
            Modern legal teams use LexGuard to automate document review, centralize matter management, and ensure perfect compliance with AI-driven intelligence.
        </p>
<div class="flex flex-col sm:flex-row items-center justify-center gap-md">
<button class="w-full sm:w-auto bg-primary text-on-primary px-xl py-md rounded-lg text-label-md font-label-md hover:opacity-95 transition-all">
                Get Started
            </button>
<button class="w-full sm:w-auto border border-outline text-on-surface px-xl py-md rounded-lg text-label-md font-label-md hover:bg-surface-container-low transition-all">
                Book a Demo
            </button>
</div>
</header>
<!-- Trust Section (Logo Wall) -->
<section class="py-xl border-y border-outline-variant bg-surface-container-lowest">
<div class="max-w-7xl mx-auto px-margin-mobile">
<p class="text-center text-label-sm font-label-sm text-outline uppercase tracking-widest mb-lg">Trusted by high-growth legal teams</p>
<div class="flex flex-wrap justify-center items-center gap-xl md:gap-32 opacity-60 grayscale">
<span class="font-headline-sm text-outline font-bold">VANGUARD</span>
<span class="font-headline-sm text-outline font-bold">SILICON LAW</span>
<span class="font-headline-sm text-outline font-bold">CYBERNETIC</span>
<span class="font-headline-sm text-outline font-bold">LUMINA LEGAL</span>
<span class="font-headline-sm text-outline font-bold">APEX FIRM</span>
</div>
</div>
</section>
<!-- Feature Section 1: Dashboard -->
<section class="py-24 px-margin-mobile md:px-margin-desktop overflow-hidden">
<div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
<div>
<h2 class="text-headline-lg-mobile md:text-headline-lg font-headline-lg mb-md">Total Visibility</h2>
<p class="text-body-lg text-on-surface-variant mb-xl max-w-md">
                    Centralize every case, document, and deadline in a single, high-fidelity command center. LexGuard provides a unified view of your entire legal department's performance.
                </p>
<ul class="space-y-md">
<li class="flex items-start gap-sm">
<span class="material-symbols-outlined text-primary" data-icon="check_circle">check_circle</span>
<div>
<span class="text-label-md font-label-md block">Real-time Analytics</span>
<span class="text-body-sm text-on-surface-variant">Monitor outside counsel spend and internal efficiency metrics.</span>
</div>
</li>
<li class="flex items-start gap-sm">
<span class="material-symbols-outlined text-primary" data-icon="check_circle">check_circle</span>
<div>
<span class="text-label-md font-label-md block">Automated Reporting</span>
<span class="text-body-sm text-on-surface-variant">Generate board-ready reports with one click.</span>
</div>
</li>
</ul>
</div>
<div class="relative">
<div class="rounded-xl border border-outline-variant bg-surface-container p-xs shadow-2xl">
<img alt="LexGuard Dashboard" class="rounded-lg w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHqwSxFaRGg6asOLWmS3sDEP8sW_K2dOudQ5GkMfUz1oQCHanAyNzw2LaVVH08nyzVblGhKNzucVlOVip6Aiysa5qqD2cpk7aQIkUQ5Si3Bw3diLsApgH3PpiGz6sy3UgtlRf3E06_HG7WjTAEUHliS4YTsIcs9ivm_dP77GVPyoEJu2ldKrdpUWR-_TdJIygQdClX8Uvs3q1jX5U1pHmYQSVikkn4Wint9fl-vTMkIJRTb4-IhvIDZE0xLnptlAT3DW17v2TZfBI"/>
</div>
</div>
</div>
</section>
<!-- Feature Section 2: Document Review -->
<section class="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low">
<div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
<div class="order-2 lg:order-1 relative">
<div class="rounded-xl border border-outline-variant bg-white p-xs shadow-2xl">
<img alt="LexGuard Document Workspace" class="rounded-lg w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwXI49qQgPVWPZVllVLAb9qG32T4vduEKO7vpxxKhrgCBrFC1RsjZEptAm9cuH6E-aRYE4bHOuhFMt5SNEJc-1I72TPsoI6JAX0d6dj4JjKbfAOFBCTJgbto5yq6uex_-NXKSQHEmFMToJ9hpVXucECLtC459DKY5YkGHd_SEH2cBwXP7IvV2e458E8QYH7oCAMn0cSwoo3Md_W3M5VLQJU48GTq0sDcvcoJbbv35AryOI4FmJHfNEf9mWiofWaobtZHfjta8HAnE"/>
</div>
</div>
<div class="order-1 lg:order-2 lg:pl-xl">
<h2 class="text-headline-lg-mobile md:text-headline-lg font-headline-lg mb-md">Intelligent Review</h2>
<p class="text-body-lg text-on-surface-variant mb-xl max-w-md">
                    Review contracts 10x faster with AI that understands legal context. Identify risks, extract clauses, and maintain version control effortlessly.
                </p>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-md">
<div class="p-md bg-surface rounded-lg border border-outline-variant">
<span class="material-symbols-outlined text-primary mb-sm" data-icon="description">description</span>
<h3 class="text-label-md font-label-md mb-xs">NLP Extraction</h3>
<p class="text-body-sm text-on-surface-variant">Automatically identify non-standard clauses and high-risk terms.</p>
</div>
<div class="p-md bg-surface rounded-lg border border-outline-variant">
<span class="material-symbols-outlined text-primary mb-sm" data-icon="sync_alt">sync_alt</span>
<h3 class="text-label-md font-label-md mb-xs">Diff Tracking</h3>
<p class="text-body-sm text-on-surface-variant">Compare versions instantly and see exactly what changed.</p>
</div>
</div>
</div>
</div>
</section>
<!-- Social Proof -->
<section class="py-24 px-margin-mobile">
<div class="max-w-3xl mx-auto text-center">
<div class="mb-lg flex justify-center">
<div class="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
<img class="w-full h-full object-cover" data-alt="A professional portrait of a confident woman in business attire, looking directly at the camera with a slight smile. The background is a blurred, high-end office environment with soft, natural morning light. The overall aesthetic is professional, modern, and credible, fitting a senior executive in the tech and legal sector." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9PVSkhjrYP5MDw4y8zX5cbOKSEGhJGYB8LlM-UvqpNj8BH1niYrXtmblIp3jGsKCLhS7VQnFPbwnpcTw0LetMwT869GPiw10B5NO9XoTkjmHr58XV2shLPwpYuBcOHLj8KJq8rP1Ty3yKWNgi2RDz5s1ST1zUKo2KdIp9iNi_34sbMif-Los62PnUzRXYUThH8BBmD8G6ltEXq2m2NYq_dx2dFZlA1vdRfnJ4C9XUXhfJg6LUul2OUjEY8e3N4rGNkyIfr7y6doE"/>
</div>
</div>
<p class="text-headline-md font-headline-md italic mb-lg">
                "LexGuard has transformed our legal operations from a cost center into a strategic advantage. The speed at which we can now process M&amp;A documents is unprecedented for a team our size."
            </p>
<div>
<span class="text-label-md font-label-md block">Sarah Jenkins</span>
<span class="text-body-sm text-on-surface-variant">General Counsel at a Series D Startup</span>
</div>
</div>
</section>
<!-- Footer -->
<footer class="bg-surface-container-lowest border-t border-outline-variant py-24 px-margin-mobile md:px-margin-desktop">
<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl">
<div class="col-span-1 lg:col-span-1">
<span class="text-headline-sm font-bold text-primary mb-md block">LexGuard</span>
<p class="text-body-sm text-on-surface-variant max-w-xs">
                    The intelligence layer for the modern legal department. Built for speed, precision, and compliance.
                </p>
</div>
<div>
<h4 class="text-label-md font-label-md mb-lg text-on-surface">Product</h4>
<ul class="space-y-sm">
<li><a class="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Features</a></li>
<li><a class="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Security</a></li>
<li><a class="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">API Docs</a></li>
<li><a class="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Integrations</a></li>
</ul>
</div>
<div>
<h4 class="text-label-md font-label-md mb-lg text-on-surface">Company</h4>
<ul class="space-y-sm">
<li><a class="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">About</a></li>
<li><a class="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Careers</a></li>
<li><a class="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a></li>
<li><a class="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Press</a></li>
</ul>
</div>
<div>
<h4 class="text-label-md font-label-md mb-lg text-on-surface">Legal</h4>
<ul class="space-y-sm">
<li><a class="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
<li><a class="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a></li>
<li><a class="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Cookie Policy</a></li>
<li><a class="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Security Audit</a></li>
</ul>
</div>
</div>
<div class="max-w-7xl mx-auto mt-24 pt-md border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-md">
<span class="text-label-sm font-label-sm text-outline">Â© 2024 LexGuard Technologies Inc. All rights reserved.</span>
<div class="flex items-center gap-md">
<a class="text-outline hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="language">language</span>
</a>
<a class="text-outline hover:text-primary transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="share">share</span>
</a>
</div>
</div>
</footer>
</body></html>
``

### Lex_Dashboard

``html
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://cdn.jsdelivr.net/npm/geist@1.3.0/dist/fonts/geist.css" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary": "#1f108e",
                        "tertiary": "#511c00",
                        "on-surface-variant": "#464553",
                        "primary-fixed": "#e2dfff",
                        "inverse-primary": "#c3c0ff",
                        "on-primary-fixed-variant": "#3b35a7",
                        "on-secondary-fixed-variant": "#38485d",
                        "error": "#ba1a1a",
                        "on-error-container": "#93000a",
                        "inverse-on-surface": "#eef0ff",
                        "inverse-surface": "#283044",
                        "error-container": "#ffdad6",
                        "surface-container": "#eaedff",
                        "on-primary-fixed": "#0f0069",
                        "on-tertiary": "#ffffff",
                        "primary-fixed-dim": "#c3c0ff",
                        "background": "#faf8ff",
                        "tertiary-fixed": "#ffdbcc",
                        "secondary-container": "#d0e1fb",
                        "surface-dim": "#d2d9f4",
                        "outline-variant": "#c8c4d5",
                        "surface-container-high": "#e2e7ff",
                        "on-tertiary-fixed-variant": "#7a3003",
                        "surface": "#faf8ff",
                        "on-error": "#ffffff",
                        "on-tertiary-container": "#fe9562",
                        "on-primary": "#ffffff",
                        "outline": "#777584",
                        "surface-container-highest": "#dae2fd",
                        "on-secondary-fixed": "#0b1c30",
                        "tertiary-container": "#752c00",
                        "secondary-fixed-dim": "#b7c8e1",
                        "on-secondary-container": "#54647a",
                        "surface-variant": "#dae2fd",
                        "on-tertiary-fixed": "#351000",
                        "primary-container": "#3730a3",
                        "surface-container-low": "#f2f3ff",
                        "on-surface": "#131b2e",
                        "secondary": "#505f76",
                        "on-primary-container": "#a9a7ff",
                        "on-secondary": "#ffffff",
                        "surface-tint": "#544fc0",
                        "surface-bright": "#faf8ff",
                        "on-background": "#131b2e",
                        "secondary-fixed": "#d3e4fe",
                        "surface-container-lowest": "#ffffff",
                        "tertiary-fixed-dim": "#ffb694"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "sm": "8px",
                        "xs": "4px",
                        "margin-desktop": "32px",
                        "xl": "32px",
                        "md": "16px",
                        "margin-mobile": "16px",
                        "lg": "24px",
                        "gutter": "16px",
                        "unit": "4px"
                    },
                    "fontFamily": {
                        "body-md": ["Geist"],
                        "label-sm": ["Geist"],
                        "label-md": ["Geist"],
                        "headline-lg-mobile": ["Geist"],
                        "body-lg": ["Geist"],
                        "headline-lg": ["Geist"],
                        "headline-md": ["Geist"],
                        "headline-sm": ["Geist"],
                        "body-sm": ["Geist"]
                    },
                    "fontSize": {
                        "body-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "400"}],
                        "label-sm": ["11px", {"lineHeight": "14px", "letterSpacing": "0.03em", "fontWeight": "600"}],
                        "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}],
                        "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "body-lg": ["16px", {"lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400"}],
                        "headline-lg": ["30px", {"lineHeight": "36px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                        "headline-md": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.015em", "fontWeight": "600"}],
                        "headline-sm": ["18px", {"lineHeight": "24px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "body-sm": ["13px", {"lineHeight": "18px", "letterSpacing": "0em", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
<style>
        body { font-family: 'Geist', sans-serif; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="bg-background text-on-surface">
<!-- SideNavBar Shell -->
<aside class="w-[240px] h-screen fixed left-0 top-0 border-r border-outline-variant bg-surface-container-low flex flex-col p-md z-50">
<div class="flex items-center gap-3 mb-8 px-2">
<div class="w-8 h-8 bg-primary rounded flex items-center justify-center">
<span class="material-symbols-outlined text-on-primary text-[20px]" data-icon="gavel">gavel</span>
</div>
<div class="flex flex-col">
<span class="text-body-lg font-headline-md font-bold text-on-surface">LexGuard</span>
<span class="text-label-md font-label-md text-on-surface-variant">Legal Operations</span>
</div>
</div>
<nav class="flex-1 space-y-1">
<a class="flex items-center gap-3 px-3 py-2 bg-secondary-container text-on-secondary-container rounded-lg font-medium transition-all duration-200 ease-in-out active:scale-95" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="text-label-md font-label-md">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors transition-all duration-200 ease-in-out active:scale-95" href="#">
<span class="material-symbols-outlined" data-icon="folder_open">folder_open</span>
<span class="text-label-md font-label-md">Cases</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors transition-all duration-200 ease-in-out active:scale-95" href="#">
<span class="material-symbols-outlined" data-icon="description">description</span>
<span class="text-label-md font-label-md">Documents</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors transition-all duration-200 ease-in-out active:scale-95" href="#">
<span class="material-symbols-outlined" data-icon="analytics">analytics</span>
<span class="text-label-md font-label-md">Analytics</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors transition-all duration-200 ease-in-out active:scale-95" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="text-label-md font-label-md">Settings</span>
</a>
</nav>
<button class="mt-4 mb-8 w-full py-2 bg-primary text-on-primary rounded-lg font-medium text-label-md hover:opacity-90 transition-opacity">
            New Case
        </button>
<div class="mt-auto border-t border-outline-variant pt-4 space-y-1">
<a class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors transition-all duration-200 ease-in-out active:scale-95" href="#">
<span class="material-symbols-outlined" data-icon="help">help</span>
<span class="text-label-md font-label-md">Help</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors transition-all duration-200 ease-in-out active:scale-95" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span class="text-label-md font-label-md">Logout</span>
</a>
</div>
</aside>
<!-- TopNavBar Shell -->
<header class="h-16 fixed top-0 right-0 left-[240px] border-b border-outline-variant bg-surface flex justify-between items-center px-lg z-40">
<div class="flex items-center gap-6">
<div class="relative flex items-center">
<span class="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]" data-icon="search">search</span>
<input class="pl-10 pr-4 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-body-sm w-80 focus:ring-1 focus:ring-primary focus:border-primary" placeholder="Search cases, documents..." type="text"/>
</div>
<nav class="flex gap-4">
<a class="text-primary font-semibold border-b-2 border-primary pb-1 text-label-md" href="#">Recent</a>
<a class="text-on-surface-variant hover:text-on-surface text-label-md transition-opacity" href="#">Pinned</a>
</nav>
</div>
<div class="flex items-center gap-4">
<div class="flex items-center gap-2 mr-4">
<button class="p-2 text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="p-2 text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="help">help</span>
</button>
</div>
<button class="px-4 py-1.5 border border-outline-variant rounded-lg text-label-md font-medium hover:bg-surface-container transition-colors">
                Quick Action
            </button>
<div class="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
<img alt="User Profile" class="w-full h-full object-cover" data-alt="A professional headshot of a corporate lawyer in a sharp dark suit against a neutral, high-key studio background. The lighting is crisp and even, reflecting a modern fintech aesthetic. The individual has a confident yet approachable expression. The overall image quality is high-resolution, maintaining a clean and authoritative visual tone consistent with a premium legal operations platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcECOJcC4uyvC150ochGsQp-yz4MyzOs06WIoZSQpFdtGjHjTb8OYSZN42QVoUEiPj3MwycrdOmZgn8KeBejfvxuWDJbQxNGJMSN-GPSyBH9xD-ORg8p3hxOwIa_fgt08YWoxyqYDi944SV7Nz3D-VjqmVxBe4BD8faBcqI-apEVGTrAIsR9RPG_QSrpq9-OEMjJqH16r14JlCY9wJXB8_ZIGi8r1nUQdYYh9syVMvKsl07Om4yVrgwl_drZ64mWO9AO8Uy3HKF3A"/>
</div>
</div>
</header>
<!-- Main Content Canvas -->
<main class="ml-[240px] pt-16 min-h-screen p-margin-desktop">
<!-- Header Section -->
<header class="mb-lg flex justify-between items-end">
<div>
<h1 class="text-headline-lg font-headline-lg text-on-surface mb-xs">Operations Dashboard</h1>
<p class="text-body-md font-body-md text-on-surface-variant">Global performance and matter status overview.</p>
</div>
<div class="flex gap-sm">
<button class="flex items-center gap-2 px-3 py-1.5 bg-surface-container-highest border border-outline-variant rounded-lg text-label-md font-medium">
<span class="material-symbols-outlined text-[18px]" data-icon="filter_list">filter_list</span>
                    Filter
                </button>
<button class="flex items-center gap-2 px-3 py-1.5 bg-surface-container-highest border border-outline-variant rounded-lg text-label-md font-medium">
<span class="material-symbols-outlined text-[18px]" data-icon="download">download</span>
                    Export PDF
                </button>
</div>
</header>
<!-- Metrics Bento Grid -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
<div class="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col justify-between transition-all hover:border-primary">
<div class="flex justify-between items-start">
<span class="text-label-md font-label-md text-on-surface-variant">Active Matters</span>
<span class="material-symbols-outlined text-primary" data-icon="gavel">gavel</span>
</div>
<div class="mt-4">
<span class="text-headline-md font-headline-md block">142</span>
<span class="text-label-sm font-label-sm text-green-600 flex items-center gap-1 mt-1">
<span class="material-symbols-outlined text-[14px]" data-icon="trending_up">trending_up</span>
                        +12% from last month
                    </span>
</div>
</div>
<div class="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col justify-between transition-all hover:border-primary">
<div class="flex justify-between items-start">
<span class="text-label-md font-label-md text-on-surface-variant">Document Velocity</span>
<span class="material-symbols-outlined text-primary" data-icon="speed">speed</span>
</div>
<div class="mt-4">
<span class="text-headline-md font-headline-md block">4.2<small class="text-body-sm font-body-sm text-on-surface-variant ml-1">days/sign</small></span>
<span class="text-label-sm font-label-sm text-green-600 flex items-center gap-1 mt-1">
<span class="material-symbols-outlined text-[14px]" data-icon="arrow_downward">arrow_downward</span>
                        -18h improvement
                    </span>
</div>
</div>
<div class="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col justify-between transition-all hover:border-primary">
<div class="flex justify-between items-start">
<span class="text-label-md font-label-md text-on-surface-variant">Compliance Score</span>
<span class="material-symbols-outlined text-primary" data-icon="verified_user">verified_user</span>
</div>
<div class="mt-4">
<span class="text-headline-md font-headline-md block">98.4%</span>
<div class="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
<div class="bg-primary h-full w-[98.4%]"></div>
</div>
</div>
</div>
</section>
<!-- Main Dashboard Content Grid -->
<div class="grid grid-cols-12 gap-xl">
<!-- Recent Cases Table -->
<section class="col-span-12 lg:col-span-8">
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
<div class="p-md border-b border-outline-variant flex justify-between items-center">
<h2 class="text-headline-sm font-headline-sm">Recent Cases</h2>
<a class="text-primary text-label-md hover:underline" href="#">View all</a>
</div>
<table class="w-full text-left">
<thead class="bg-surface-container-low">
<tr>
<th class="px-md py-sm text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Matter Name</th>
<th class="px-md py-sm text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
<th class="px-md py-sm text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Lead Counsel</th>
<th class="px-md py-sm text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Last Updated</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container">
<tr class="hover:bg-surface-container-low transition-colors">
<td class="px-md py-md">
<span class="text-body-md font-medium block">Alpha vs. Delta Acquisition</span>
<span class="text-label-sm text-on-surface-variant">#2024-0012</span>
</td>
<td class="px-md py-md">
<span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-label-sm font-medium">Discovery</span>
</td>
<td class="px-md py-md text-body-sm">Elena Rodriguez</td>
<td class="px-md py-md text-body-sm">2h ago</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors">
<td class="px-md py-md">
<span class="text-body-md font-medium block">TechCorp IP Litigation</span>
<span class="text-label-sm text-on-surface-variant">#2023-4482</span>
</td>
<td class="px-md py-md">
<span class="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-label-sm font-medium">In Review</span>
</td>
<td class="px-md py-md text-body-sm">Marcus Chen</td>
<td class="px-md py-md text-body-sm">5h ago</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors">
<td class="px-md py-md">
<span class="text-body-md font-medium block">Q4 Compliance Audit</span>
<span class="text-label-sm text-on-surface-variant">#2024-9001</span>
</td>
<td class="px-md py-md">
<span class="px-2 py-0.5 bg-green-100 text-green-700 rounded text-label-sm font-medium">Filed</span>
</td>
<td class="px-md py-md text-body-sm">Sarah Jenkins</td>
<td class="px-md py-md text-body-sm">Yesterday</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors">
<td class="px-md py-md">
<span class="text-body-md font-medium block">Estate of J. Smith Probate</span>
<span class="text-label-sm text-on-surface-variant">#2024-1102</span>
</td>
<td class="px-md py-md">
<span class="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-label-sm font-medium">Draft</span>
</td>
<td class="px-md py-md text-body-sm">David Miller</td>
<td class="px-md py-md text-body-sm">2 days ago</td>
</tr>
</tbody>
</table>
</div>
</section>
<!-- Upcoming Deadlines Sidebar Content -->
<section class="col-span-12 lg:col-span-4">
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
<div class="flex justify-between items-center mb-md">
<h2 class="text-headline-sm font-headline-sm">Deadlines</h2>
<button class="p-1 hover:bg-surface-container-high rounded transition-colors">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="more_horiz">more_horiz</span>
</button>
</div>
<div class="space-y-4">
<div class="flex gap-md group">
<div class="flex flex-col items-center justify-start pt-1">
<div class="w-2 h-2 rounded-full bg-error mt-1.5"></div>
<div class="w-px flex-1 bg-outline-variant group-last:bg-transparent mt-2"></div>
</div>
<div class="flex-1 pb-4">
<span class="text-label-sm font-semibold text-error block mb-0.5 uppercase tracking-tight">Today â€¢ 5:00 PM</span>
<span class="text-body-md font-medium block">Filing Deadline: SEC Form 8-K</span>
<span class="text-label-md text-on-surface-variant">Project Phoenix Acquisition</span>
</div>
</div>
<div class="flex gap-md group">
<div class="flex flex-col items-center justify-start pt-1">
<div class="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
<div class="w-px flex-1 bg-outline-variant group-last:bg-transparent mt-2"></div>
</div>
<div class="flex-1 pb-4">
<span class="text-label-sm font-semibold text-primary block mb-0.5 uppercase tracking-tight">Tomorrow</span>
<span class="text-body-md font-medium block">Witness Deposition: Alpha vs Delta</span>
<span class="text-label-md text-on-surface-variant">Conference Room 4B</span>
</div>
</div>
<div class="flex gap-md group">
<div class="flex flex-col items-center justify-start pt-1">
<div class="w-2 h-2 rounded-full bg-outline mt-1.5"></div>
<div class="w-px flex-1 bg-outline-variant group-last:bg-transparent mt-2"></div>
</div>
<div class="flex-1 pb-4">
<span class="text-label-sm font-semibold text-on-surface-variant block mb-0.5 uppercase tracking-tight">Feb 24, 2024</span>
<span class="text-body-md font-medium block">Draft Review: Patent Filing #412</span>
<span class="text-label-md text-on-surface-variant">Internal Review Board</span>
</div>
</div>
<div class="flex gap-md group">
<div class="flex flex-col items-center justify-start pt-1">
<div class="w-2 h-2 rounded-full bg-outline mt-1.5"></div>
<div class="w-px flex-1 bg-outline-variant group-last:bg-transparent mt-2"></div>
</div>
<div class="flex-1">
<span class="text-label-sm font-semibold text-on-surface-variant block mb-0.5 uppercase tracking-tight">Feb 26, 2024</span>
<span class="text-body-md font-medium block">Contract Renewal: CloudServices LLC</span>
<span class="text-label-md text-on-surface-variant">Procurement Legal</span>
</div>
</div>
</div>
<button class="w-full mt-6 py-2 border-2 border-dashed border-outline-variant rounded-lg text-label-md font-medium text-on-surface-variant hover:border-primary hover:text-primary transition-all">
                        + Add Custom Reminder
                    </button>
</div>
<!-- Secondary Metric / Chart Area -->
<div class="mt-xl bg-primary-container p-lg rounded-xl text-on-primary-container relative overflow-hidden">
<div class="relative z-10">
<span class="text-label-md font-medium opacity-80">Operational Health</span>
<h3 class="text-headline-md font-headline-md mt-1">Excellent</h3>
<p class="text-body-sm mt-2 opacity-90 max-w-[200px]">You have completed 94% of priority tasks for this week.</p>
<button class="mt-4 px-4 py-1.5 bg-on-primary text-primary rounded-lg text-label-md font-semibold hover:bg-opacity-90 transition-all">
                            Review Health Report
                        </button>
</div>
<!-- Abstract Background Decorative Element -->
<div class="absolute -right-8 -bottom-8 w-40 h-40 bg-on-primary opacity-10 rounded-full blur-2xl"></div>
<div class="absolute right-4 top-4 opacity-20">
<span class="material-symbols-outlined text-[64px]" data-icon="check_circle">check_circle</span>
</div>
</div>
</section>
</div>
</main>
</body></html>
``

### Lex_DocumentReview

``html
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary": "#1f108e",
                        "tertiary": "#511c00",
                        "on-surface-variant": "#464553",
                        "primary-fixed": "#e2dfff",
                        "inverse-primary": "#c3c0ff",
                        "on-primary-fixed-variant": "#3b35a7",
                        "on-secondary-fixed-variant": "#38485d",
                        "error": "#ba1a1a",
                        "on-error-container": "#93000a",
                        "inverse-on-surface": "#eef0ff",
                        "inverse-surface": "#283044",
                        "error-container": "#ffdad6",
                        "surface-container": "#eaedff",
                        "on-primary-fixed": "#0f0069",
                        "on-tertiary": "#ffffff",
                        "primary-fixed-dim": "#c3c0ff",
                        "background": "#faf8ff",
                        "tertiary-fixed": "#ffdbcc",
                        "secondary-container": "#d0e1fb",
                        "surface-dim": "#d2d9f4",
                        "outline-variant": "#c8c4d5",
                        "surface-container-high": "#e2e7ff",
                        "on-tertiary-fixed-variant": "#7a3003",
                        "surface": "#faf8ff",
                        "on-error": "#ffffff",
                        "on-tertiary-container": "#fe9562",
                        "on-primary": "#ffffff",
                        "outline": "#777584",
                        "surface-container-highest": "#dae2fd",
                        "on-secondary-fixed": "#0b1c30",
                        "tertiary-container": "#752c00",
                        "secondary-fixed-dim": "#b7c8e1",
                        "on-secondary-container": "#54647a",
                        "surface-variant": "#dae2fd",
                        "on-tertiary-fixed": "#351000",
                        "primary-container": "#3730a3",
                        "surface-container-low": "#f2f3ff",
                        "on-surface": "#131b2e",
                        "secondary": "#505f76",
                        "on-primary-container": "#a9a7ff",
                        "on-secondary": "#ffffff",
                        "surface-tint": "#544fc0",
                        "surface-bright": "#faf8ff",
                        "on-background": "#131b2e",
                        "secondary-fixed": "#d3e4fe",
                        "surface-container-lowest": "#ffffff",
                        "tertiary-fixed-dim": "#ffb694"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "sm": "8px",
                        "xs": "4px",
                        "margin-desktop": "32px",
                        "xl": "32px",
                        "md": "16px",
                        "margin-mobile": "16px",
                        "lg": "24px",
                        "gutter": "16px",
                        "unit": "4px"
                    },
                    "fontFamily": {
                        "body-md": ["Geist"],
                        "label-sm": ["Geist"],
                        "label-md": ["Geist"],
                        "headline-lg-mobile": ["Geist"],
                        "body-lg": ["Geist"],
                        "headline-lg": ["Geist"],
                        "headline-md": ["Geist"],
                        "headline-sm": ["Geist"],
                        "body-sm": ["Geist"]
                    },
                    "fontSize": {
                        "body-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "400"}],
                        "label-sm": ["11px", {"lineHeight": "14px", "letterSpacing": "0.03em", "fontWeight": "600"}],
                        "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}],
                        "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "body-lg": ["16px", {"lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400"}],
                        "headline-lg": ["30px", {"lineHeight": "36px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                        "headline-md": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.015em", "fontWeight": "600"}],
                        "headline-sm": ["18px", {"lineHeight": "24px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "body-sm": ["13px", {"lineHeight": "18px", "letterSpacing": "0em", "fontWeight": "400"}]
                    }
                }
            }
        }
    </script>
<style>
        body { font-family: 'Geist', sans-serif; background-color: #faf8ff; color: #131b2e; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c8c4d5; border-radius: 10px; }
    </style>
</head>
<body class="flex h-screen overflow-hidden">
<!-- SideNavBar Component (Global Navigation suppressed as this is a Task-Focused Page) -->
<!-- Implementing a focused version of the layout described -->
<!-- Sidebar: Document Outline -->
<aside class="w-[240px] flex-shrink-0 bg-surface-container-low border-r border-outline-variant flex flex-col h-screen">
<div class="p-md h-16 flex items-center border-b border-outline-variant">
<span class="text-body-lg font-headline-md font-bold text-on-surface">LexGuard</span>
</div>
<div class="p-md flex-1 overflow-y-auto custom-scrollbar">
<div class="mb-lg">
<p class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-sm">Document Pages</p>
<div class="space-y-sm">
<!-- Page Thumbnails -->
<div class="p-xs bg-secondary-container rounded-lg border-2 border-primary group cursor-pointer transition-all duration-200">
<img class="w-full aspect-[3/4] object-cover rounded shadow-sm mb-xs" data-alt="A clean high-resolution photograph of a legal document page featuring structured text and signatures. The setting is a bright, professional law office with soft natural light. The aesthetic is corporate and modern, using a palette of crisp whites and subtle blues to match a professional legal software interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsY3I3C7GPBVYpCP2qlBcwJvi5pbODwwHJDk0NkI911JDLUTeON8Kxv0swU-Aezg16tAMH4SBzJUP4veJh_1LR1FoHQG15LHgtO2pGGe5jd1tpXGFulDEP_WdFNNj9T7V6xq_j4269KCZlXqY8yxzkqvxNmWtNNL6-UFug0SR_z5FLNOESwhsrkNrbF6Pany5RmC5l4Wmr2x5dWxhgpMWKNmziqcZNFGvovuX3n-KK4h_oVW-9lOLOq7CwgIdzT0S_Mg5WW3AhfbY"/>
<span class="text-label-md font-label-md text-primary block text-center">Page 1</span>
</div>
<div class="p-xs bg-surface-container-highest rounded-lg border-2 border-transparent hover:border-outline-variant group cursor-pointer transition-all duration-200">
<img class="w-full aspect-[3/4] object-cover rounded shadow-sm mb-xs opacity-80 group-hover:opacity-100" data-alt="A high-contrast macro photograph of typed legal clauses on premium off-white paper. The lighting is focused and clear, highlighting the texture of the paper and the precision of the typography. The mood is authoritative and serious, fitting for a sophisticated document analysis platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH2gQOVv3txXiutZa0fA7tX4j9iFOnhlEvhm3T8LnlG9F85vE3ZF-I6NG832jaDdR4h1oK7QK-fGfhEq6keBhqVbwQZPnrF_2b9t5H5a48WkpsHoDWW50W9w__Cxq-QaLMrHvrA4It1Ykw4jTYAoCeh4A3Touy7SOQg46dcUa9OVQswRmv2Hb4fbryW7LJUHW6buktD427JWLkMfJPwpN7mI8O9hBRo9O7FS8xgYPtLyjVv5iEUMlMUYZzX7LmZCutd6ABLcLiAgQ"/>
<span class="text-label-md font-label-md text-on-surface-variant block text-center">Page 2</span>
</div>
<div class="p-xs bg-surface-container-highest rounded-lg border-2 border-transparent hover:border-outline-variant group cursor-pointer transition-all duration-200">
<img class="w-full aspect-[3/4] object-cover rounded shadow-sm mb-xs opacity-80 group-hover:opacity-100" data-alt="A close-up shot of a legal contract showing complex terms and a blue ink signature. The lighting is bright and even, conveying a high-tech legal environment. The colors are muted and professional, emphasizing a clean and efficient workspace for data extraction." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJJRhqgX8m7ALrJuqED6u9LcDDQoM8vs2QeXil32_HvzrmrUc3cIUxfpxYBQfHzVtLICMhSYY6ZWUUJ2bjivBQaw23AFarrIKYUvChNdr05pUpXhQ6bqnWfWSqDTJIKoXhUXNUMThNx5jcEOvwEIL0kOgFlx8bqy7oMK4X4Ym5b_VOl-BnWV6kvnFU5MDOpZhpgIoNQKpWRTbsc_l4agveqwJZcAeDuNWVoTm3E0rrFUefpIFgsphhwAivdx8IbdlXDULm0s4HRoE"/>
<span class="text-label-md font-label-md text-on-surface-variant block text-center">Page 3</span>
</div>
</div>
</div>
</div>
<div class="p-md border-t border-outline-variant bg-surface-container-lowest">
<button class="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors w-full rounded-lg">
<span class="material-symbols-outlined text-[20px]">help</span>
<span class="text-label-md font-label-md">Help Center</span>
</button>
</div>
</aside>
<!-- Main Content: Document Viewer -->
<main class="flex-1 flex flex-col h-screen bg-surface-dim/30">
<!-- TopNavBar for Document Controls -->
<header class="h-16 flex items-center justify-between px-lg border-b border-outline-variant bg-surface/80 backdrop-blur-md">
<div class="flex items-center gap-md">
<button class="p-xs hover:bg-surface-container-high rounded transition-colors">
<span class="material-symbols-outlined text-on-surface">arrow_back</span>
</button>
<div class="flex flex-col">
<h1 class="text-headline-sm font-headline-sm text-on-surface leading-tight">Master_Service_Agreement_v4.pdf</h1>
<span class="text-label-sm font-label-sm text-on-surface-variant">Modified 2 hours ago â€¢ Project Alpha</span>
</div>
</div>
<div class="flex items-center gap-md">
<div class="flex bg-surface-container-high rounded-lg p-1">
<button class="px-sm py-1 rounded text-label-sm font-label-sm bg-surface shadow-sm text-on-surface">Viewer</button>
<button class="px-sm py-1 rounded text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface">Editor</button>
</div>
<div class="h-6 w-[1px] bg-outline-variant mx-xs"></div>
<button class="flex items-center gap-2 bg-primary text-on-primary px-md py-sm rounded-lg hover:opacity-90 transition-opacity">
<span class="material-symbols-outlined text-[18px]">cloud_download</span>
<span class="text-label-md font-label-md">Export</span>
</button>
</div>
</header>
<!-- PDF Styled Content Canvas -->
<div class="flex-1 overflow-y-auto p-xl flex justify-center custom-scrollbar">
<div class="w-full max-w-[850px] bg-white shadow-sm border border-outline-variant p-margin-desktop min-h-[1100px] relative">
<!-- Watermark or Header -->
<div class="flex justify-between items-start mb-xl border-b border-outline-variant pb-md">
<div class="text-label-sm font-label-sm text-outline uppercase tracking-[0.2em]">Confidential</div>
<div class="text-label-sm font-label-sm text-outline">Page 1 of 42</div>
</div>
<!-- Legal Text Content -->
<article class="space-y-lg">
<h2 class="text-headline-md font-headline-md text-on-surface border-b border-surface-container-highest pb-sm">MASTER SERVICE AGREEMENT</h2>
<p class="text-body-md font-body-md text-on-surface leading-relaxed">
                        This Master Service Agreement ("Agreement") is entered into as of October 24, 2023 ("Effective Date") by and between LexGuard Operations Ltd. ("Provider") and Global Nexus Corp. ("Client").
                    </p>
<div class="space-y-sm">
<h3 class="text-label-md font-label-md text-on-surface-variant uppercase tracking-wide">1. DEFINITIONS</h3>
<p class="text-body-md font-body-md text-on-surface leading-relaxed">
                            "Services" shall mean the professional legal operation services, including but not limited to document review, metadata extraction, and compliance reporting as specified in the applicable Statement of Work.
                        </p>
</div>
<div class="p-md bg-primary-fixed/30 border-l-4 border-primary rounded-r-lg relative group">
<div class="absolute -right-12 top-0 flex flex-col gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-xs bg-surface shadow border border-outline-variant rounded-full text-primary hover:bg-primary-fixed">
<span class="material-symbols-outlined text-[16px]">chat_bubble</span>
</button>
</div>
<h3 class="text-label-md font-label-md text-primary mb-xs">2. TERM AND TERMINATION</h3>
<p class="text-body-md font-body-md text-on-surface leading-relaxed">
                            The initial term of this Agreement shall be for a period of <span class="bg-secondary-container px-1 font-medium">twenty-four (24) months</span> from the Effective Date, unless earlier terminated in accordance with the provisions herein. Either party may terminate this Agreement for convenience upon sixty (60) days written notice.
                        </p>
</div>
<div class="space-y-sm">
<h3 class="text-label-md font-label-md text-on-surface-variant uppercase tracking-wide">3. PAYMENT TERMS</h3>
<p class="text-body-md font-body-md text-on-surface leading-relaxed">
                            Client shall pay Provider the fees set forth in the SOW. All invoices are payable <span class="bg-error-container px-1 text-on-error-container font-medium">Net 15</span>. Late payments shall accrue interest at a rate of 1.5% per month.
                        </p>
</div>
<div class="space-y-sm">
<h3 class="text-label-md font-label-md text-on-surface-variant uppercase tracking-wide">4. LIMITATION OF LIABILITY</h3>
<p class="text-body-md font-body-md text-on-surface leading-relaxed italic">
                            [AI Insight: This clause deviates from the standard 2023 Corporate Compliance Guidelines. Suggesting review for liability caps.]
                        </p>
<p class="text-body-md font-body-md text-on-surface leading-relaxed">
                            In no event shall either party's aggregate liability arising out of or related to this agreement, whether in contract, tort or under any other theory of liability, exceed the total amount paid by client hereunder in the twelve months preceding the incident.
                        </p>
</div>
<!-- Visual Placeholder for signature area -->
<div class="mt-xl pt-xl border-t border-outline-variant grid grid-cols-2 gap-xl">
<div class="space-y-xl">
<div class="h-10 border-b border-on-surface"></div>
<span class="text-label-sm font-label-sm text-on-surface-variant">Authorized Signatory - Provider</span>
</div>
<div class="space-y-xl">
<div class="h-10 border-b border-on-surface"></div>
<span class="text-label-sm font-label-sm text-on-surface-variant">Authorized Signatory - Client</span>
</div>
</div>
</article>
</div>
</div>
</main>
<!-- Right Sidebar: AI Extraction & Compliance -->
<aside class="w-[320px] flex-shrink-0 bg-surface border-l border-outline-variant flex flex-col h-screen">
<div class="p-md h-16 flex items-center border-b border-outline-variant gap-sm">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
<h2 class="text-headline-sm font-headline-sm text-on-surface">AI Extraction</h2>
</div>
<div class="flex-1 overflow-y-auto custom-scrollbar">
<!-- Metadata Cards -->
<div class="p-md space-y-md">
<section>
<p class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-sm">Key Metadata</p>
<div class="space-y-sm">
<div class="p-md bg-surface-container-lowest border border-outline-variant rounded-lg">
<label class="text-label-sm font-label-sm text-on-surface-variant block mb-1">Contract Type</label>
<div class="flex justify-between items-center">
<span class="text-body-md font-body-md text-on-surface font-semibold">Master Service Agreement</span>
<span class="material-symbols-outlined text-primary text-[18px]">verified</span>
</div>
</div>
<div class="p-md bg-surface-container-lowest border border-outline-variant rounded-lg">
<label class="text-label-sm font-label-sm text-on-surface-variant block mb-1">Effective Date</label>
<span class="text-body-md font-body-md text-on-surface font-semibold">October 24, 2023</span>
</div>
<div class="p-md bg-surface-container-lowest border border-outline-variant rounded-lg">
<label class="text-label-sm font-label-sm text-on-surface-variant block mb-1">Termination Notice</label>
<div class="flex justify-between items-center">
<span class="text-body-md font-body-md text-on-surface font-semibold">60 Days</span>
<span class="px-xs py-[2px] bg-secondary-fixed text-on-secondary-fixed rounded text-label-sm">Standard</span>
</div>
</div>
</div>
</section>
<section>
<p class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-sm">Compliance Checks</p>
<div class="space-y-xs">
<div class="flex items-start gap-3 p-sm bg-surface-container-low rounded-lg border border-transparent hover:border-outline-variant cursor-help">
<span class="material-symbols-outlined text-[#22c55e] text-[20px]">check_circle</span>
<div class="flex-1">
<p class="text-body-sm font-body-sm text-on-surface font-medium">Governing Law</p>
<p class="text-label-sm font-label-sm text-on-surface-variant">New York, USA (Compliant)</p>
</div>
</div>
<div class="flex items-start gap-3 p-sm bg-error-container/20 rounded-lg border border-error/20">
<span class="material-symbols-outlined text-error text-[20px]">warning</span>
<div class="flex-1">
<p class="text-body-sm font-body-sm text-error font-medium">Payment Terms Risk</p>
<p class="text-label-sm font-label-sm text-on-error-container">Net 15 is aggressive. Market standard is Net 30.</p>
</div>
</div>
<div class="flex items-start gap-3 p-sm bg-surface-container-low rounded-lg border border-transparent hover:border-outline-variant">
<span class="material-symbols-outlined text-on-tertiary-container text-[20px]">info</span>
<div class="flex-1">
<p class="text-body-sm font-body-sm text-on-surface font-medium">Force Majeure</p>
<p class="text-label-sm font-label-sm text-on-surface-variant">Contains epidemic exclusion clause.</p>
</div>
</div>
</div>
</section>
</div>
</div>
<div class="p-md bg-surface-container-high/50 border-t border-outline-variant">
<div class="flex flex-col gap-sm">
<button class="w-full bg-white border border-outline-variant text-on-surface text-label-md font-label-md py-sm rounded-lg hover:bg-surface transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]">add_task</span>
                    Create Compliance Task
                </button>
<button class="w-full bg-primary text-on-primary text-label-md font-label-md py-sm rounded-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]">send</span>
                    Send for Approval
                </button>
</div>
</div>
</aside>
</body></html>
``

### Lex_ContractAnalysis

``html
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-secondary-fixed-variant": "#38485d",
                        "background": "#faf8ff",
                        "on-secondary": "#ffffff",
                        "secondary": "#505f76",
                        "on-error": "#ffffff",
                        "primary-fixed-dim": "#c3c0ff",
                        "primary-container": "#3730a3",
                        "on-primary": "#ffffff",
                        "surface-tint": "#544fc0",
                        "on-surface-variant": "#464553",
                        "outline-variant": "#c8c4d5",
                        "primary-fixed": "#e2dfff",
                        "on-error-container": "#93000a",
                        "surface-container-highest": "#dae2fd",
                        "surface-container-lowest": "#ffffff",
                        "surface-container-high": "#e2e7ff",
                        "inverse-on-surface": "#eef0ff",
                        "on-tertiary-fixed-variant": "#7a3003",
                        "surface-variant": "#dae2fd",
                        "secondary-fixed-dim": "#b7c8e1",
                        "surface-container-low": "#f2f3ff",
                        "surface-container": "#eaedff",
                        "on-secondary-container": "#54647a",
                        "on-tertiary-container": "#fe9562",
                        "on-primary-fixed": "#0f0069",
                        "on-background": "#131b2e",
                        "inverse-surface": "#283044",
                        "on-primary-fixed-variant": "#3b35a7",
                        "primary": "#1f108e",
                        "secondary-fixed": "#d3e4fe",
                        "on-secondary-fixed": "#0b1c30",
                        "tertiary-fixed-dim": "#ffb694",
                        "error": "#ba1a1a",
                        "on-tertiary-fixed": "#351000",
                        "on-primary-container": "#a9a7ff",
                        "surface-bright": "#faf8ff",
                        "on-surface": "#131b2e",
                        "surface": "#faf8ff",
                        "secondary-container": "#d0e1fb",
                        "tertiary": "#511c00",
                        "on-tertiary": "#ffffff",
                        "tertiary-fixed": "#ffdbcc",
                        "inverse-primary": "#c3c0ff",
                        "error-container": "#ffdad6",
                        "tertiary-container": "#752c00",
                        "surface-dim": "#d2d9f4",
                        "outline": "#777584"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "xl": "32px",
                        "xs": "4px",
                        "lg": "24px",
                        "margin-mobile": "16px",
                        "gutter": "16px",
                        "margin-desktop": "32px",
                        "unit": "4px",
                        "sm": "8px",
                        "md": "16px"
                    },
                    "fontFamily": {
                        "label-md": ["Geist"],
                        "headline-lg": ["Geist"],
                        "body-sm": ["Geist"],
                        "body-md": ["Geist"],
                        "body-lg": ["Geist"],
                        "headline-md": ["Geist"],
                        "label-sm": ["Geist"],
                        "headline-sm": ["Geist"],
                        "headline-lg-mobile": ["Geist"]
                    },
                    "fontSize": {
                        "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}],
                        "headline-lg": ["30px", {"lineHeight": "36px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                        "body-sm": ["13px", {"lineHeight": "18px", "letterSpacing": "0em", "fontWeight": "400"}],
                        "body-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0em", "fontWeight": "400"}],
                        "body-lg": ["16px", {"lineHeight": "24px", "letterSpacing": "0em", "fontWeight": "400"}],
                        "headline-md": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.015em", "fontWeight": "600"}],
                        "label-sm": ["11px", {"lineHeight": "14px", "letterSpacing": "0.03em", "fontWeight": "600"}],
                        "headline-sm": ["18px", {"lineHeight": "24px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}]
                    }
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;
        }
        body { font-family: 'Geist', sans-serif; }
    </style>
</head>
<body class="bg-background text-on-background selection:bg-secondary-container">
<!-- SideNavBar (Persistent) -->
<aside class="fixed left-0 top-0 h-screen w-[280px] flex flex-col bg-surface-container-low dark:bg-surface-container-lowest border-r border-outline-variant dark:border-outline z-50">
<div class="flex flex-col h-full py-lg px-md">
<!-- Brand Identity -->
<div class="mb-xl px-sm">
<h1 class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">LexGuard</h1>
<p class="font-label-md text-label-md text-on-surface-variant">Legal Intelligence</p>
</div>
<!-- Navigation Links -->
<nav class="flex-1 space-y-xs">
<a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-outline-variant hover:text-primary hover:bg-surface-container-high dark:hover:bg-surface-container transition-colors duration-200 scale-100 active:scale-95 transition-transform duration-100" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="font-label-md text-label-md">Dashboard</span>
</a>
<a class="flex items-center gap-md px-md py-sm rounded-lg text-primary dark:text-primary-fixed-dim font-bold border-r-2 border-primary bg-surface-container-high dark:bg-surface-container transition-colors duration-200 scale-100 active:scale-95 transition-transform duration-100" href="#">
<span class="material-symbols-outlined" data-icon="description">description</span>
<span class="font-label-md text-label-md">Documents</span>
</a>
<a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-outline-variant hover:text-primary hover:bg-surface-container-high dark:hover:bg-surface-container transition-colors duration-200 scale-100 active:scale-95 transition-transform duration-100" href="#">
<span class="material-symbols-outlined" data-icon="search">search</span>
<span class="font-label-md text-label-md">Search</span>
</a>
<a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-outline-variant hover:text-primary hover:bg-surface-container-high dark:hover:bg-surface-container transition-colors duration-200 scale-100 active:scale-95 transition-transform duration-100" href="#">
<span class="material-symbols-outlined" data-icon="analytics">analytics</span>
<span class="font-label-md text-label-md">Analytics</span>
</a>
<a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-outline-variant hover:text-primary hover:bg-surface-container-high dark:hover:bg-surface-container transition-colors duration-200 scale-100 active:scale-95 transition-transform duration-100" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-label-md text-label-md">Settings</span>
</a>
</nav>
<!-- Footer Navigation -->
<div class="mt-auto pt-lg space-y-xs border-t border-outline-variant">
<a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-outline-variant hover:text-primary hover:bg-surface-container-high dark:hover:bg-surface-container transition-colors duration-200" href="#">
<span class="material-symbols-outlined" data-icon="help">help</span>
<span class="font-label-md text-label-md">Help Center</span>
</a>
<div class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-outline-variant hover:text-primary hover:bg-surface-container-high dark:hover:bg-surface-container transition-colors duration-200">
<div class="w-8 h-8 rounded-full overflow-hidden bg-outline-variant">
<img alt="User Avatar" class="w-full h-full object-cover" data-alt="A professional headshot of a legal expert in a corporate setting, with soft lighting and a neutral background. The subject is wearing a tailored suit, conveying authority and technical precision. The image follows a high-density, professional aesthetic suited for a fintech or legal platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtHsCyVkXIAYpaTDlDXBpifzsuqKu3q_v68FnMWmPQJqeEIbp-5DBkDsuToF_0Zw_LF0iyA32_K8Y4c3RknVVjafK6InTEJlq0JF8NKkfdbalo23VTTtA5Wx2SL3GKJdWztmkghXGLLWfUkvXNAhhRn4oxE9hZxXH8CtSz059BheNWQkKIixaDUlutAKHfc1H3FOgS089ICoMdnCpV09SwT9jJ7Cw33LntdV1xtoex8qqtuIZ_pgqFY7HG6qes2FlbX38nEOIcE_c"/>
</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md font-bold">Account</span>
<span class="text-[10px] opacity-70">Pro Member</span>
</div>
</div>
</div>
</div>
</aside>
<!-- Main Workspace -->
<main class="ml-[280px] min-h-screen flex flex-col">
<!-- TopAppBar -->
<header class="fixed top-0 right-0 w-[calc(100%-280px)] h-16 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline z-40">
<div class="flex items-center justify-between px-lg w-full h-full">
<!-- Left: Breadcrumbs & Title -->
<div class="flex flex-col">
<nav class="flex items-center gap-xs font-label-sm text-label-sm text-on-surface-variant mb-xs">
<span class="hover:text-primary cursor-pointer">Cases</span>
<span class="material-symbols-outlined text-[12px]">chevron_right</span>
<span class="hover:text-primary cursor-pointer">Project Alpha</span>
</nav>
<h2 class="font-headline-sm text-headline-sm font-bold text-primary dark:text-primary-fixed-dim">Master_Service_Agreement_v4.pdf</h2>
</div>
<!-- Center: Navigation Cluster (Simulated) -->
<div class="hidden lg:flex items-center gap-lg">
<button class="font-label-sm text-label-sm text-primary dark:text-primary-fixed-dim border-b-2 border-primary pb-1 cursor-pointer">Review</button>
<button class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">History</button>
<button class="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Compare</button>
</div>
<!-- Right: Actions -->
<div class="flex items-center gap-md">
<button class="flex items-center gap-sm px-md py-sm bg-white border border-outline-variant rounded-lg text-on-surface-variant font-label-sm text-label-sm hover:border-primary hover:text-primary transition-colors active:opacity-80">
<span class="material-symbols-outlined text-[18px]" data-icon="share">share</span>
                        Share
                    </button>
<button class="flex items-center gap-sm px-md py-sm bg-primary text-white rounded-lg font-label-sm text-label-sm hover:opacity-90 transition-colors active:opacity-80">
<span class="material-symbols-outlined text-[18px]" data-icon="file_download">file_download</span>
                        Export
                    </button>
<div class="w-px h-6 bg-outline-variant mx-xs"></div>
<button class="material-symbols-outlined text-on-surface-variant cursor-pointer active:opacity-80" data-icon="notifications">notifications</button>
<button class="material-symbols-outlined text-on-surface-variant cursor-pointer active:opacity-80" data-icon="more_vert">more_vert</button>
</div>
</div>
</header>
<!-- Main Content Area: Side-by-Side Split -->
<div class="mt-16 flex flex-1 overflow-hidden">
<!-- Left Pane: Document Viewer -->
<section class="flex-1 overflow-y-auto bg-surface-container-low p-xl">
<div class="max-w-[800px] mx-auto bg-white border border-outline-variant shadow-sm min-h-[1100px] p-xl rounded-sm">
<header class="mb-lg border-b border-outline-variant pb-lg">
<h3 class="font-headline-md text-headline-md mb-xs">MASTER SERVICE AGREEMENT</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant">Document ID: LXG-2024-ALPHA-04</p>
</header>
<article class="space-y-lg text-on-background font-body-md text-body-md leading-relaxed">
<p>This Master Service Agreement ("Agreement") is entered into as of October 24, 2024, by and between LexCorp Industries ("Client") and Alpha Systems Group ("Service Provider").</p>
<div class="space-y-md">
<h4 class="font-label-md text-label-md font-bold uppercase tracking-wider text-primary">1. SERVICES AND PERFORMANCE</h4>
<p>Service Provider shall perform the services described in each Statement of Work ("SOW"). Time is of the essence for all performance milestones defined in the project roadmap.</p>
</div>
<div class="space-y-md">
<h4 class="font-label-md text-label-md font-bold uppercase tracking-wider text-primary">2. PAYMENT TERMS</h4>
<div class="bg-amber-50 border-l-4 border-amber-400 -mx-xl px-xl py-sm">
<p>Client shall pay all undisputed amounts within <span class="font-bold underline">sixty (60) days</span> from the date of receipt of a valid invoice ("Net 60"). Late payments shall accrue interest at a rate of 1.5% per month.</p>
</div>
</div>
<div class="space-y-md">
<h4 class="font-label-md text-label-md font-bold uppercase tracking-wider text-primary">3. LIMITATION OF LIABILITY</h4>
<div class="bg-error-container/30 border-l-4 border-error -mx-xl px-xl py-sm">
<p>IN NO EVENT SHALL EITHER PARTY'S AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT EXCEED <span class="font-bold underline">TWENTY-FIVE PERCENT (25%)</span> OF THE TOTAL FEES PAID BY CLIENT DURING THE TWELVE MONTHS PRECEDING THE CLAIM.</p>
</div>
</div>
<div class="space-y-md">
<h4 class="font-label-md text-label-md font-bold uppercase tracking-wider text-primary">4. TERMINATION</h4>
<div class="bg-surface-container border-l-4 border-primary -mx-xl px-xl py-sm">
<p>Either party may terminate this Agreement for convenience upon providing <span class="font-bold underline">ninety (90) days</span> prior written notice to the other party.</p>
</div>
</div>
<div class="space-y-md">
<h4 class="font-label-md text-label-md font-bold uppercase tracking-wider text-primary">5. CONFIDENTIALITY</h4>
<p>The parties acknowledge that during the term of this Agreement, they may share sensitive technical and business information. Both parties agree to maintain strict confidentiality of such data using the same degree of care as they use for their own confidential information.</p>
</div>
</article>
</div>
</section>
<!-- Right Pane: AI Analysis -->
<section class="w-[400px] border-l border-outline-variant bg-surface flex flex-col">
<div class="p-lg border-b border-outline-variant flex items-center justify-between">
<h3 class="font-headline-sm text-headline-sm font-bold flex items-center gap-sm">
<span class="material-symbols-outlined text-primary" data-icon="psychology">psychology</span>
                        AI Analysis &amp; Risks
                    </h3>
<span class="bg-primary-container text-on-primary-container px-sm py-xs rounded font-label-sm text-label-sm">3 Findings</span>
</div>
<div class="flex-1 overflow-y-auto p-md space-y-md">
<!-- Finding Card 1: High Risk -->
<div class="bg-white border border-outline-variant rounded-lg overflow-hidden transition-all hover:border-error">
<div class="bg-error-container/10 px-md py-sm flex items-center justify-between border-b border-error/10">
<span class="font-label-sm text-label-sm text-error font-bold flex items-center gap-xs">
<span class="material-symbols-outlined text-[16px]" data-icon="report">report</span>
                                HIGH RISK
                            </span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Section 3. Liability</span>
</div>
<div class="p-md">
<h5 class="font-label-md text-label-md font-bold text-on-surface mb-xs">Liability Caps</h5>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-md">This clause deviates from standard compliance guidelines by 15%. Market standard for MSA liability is usually 100% of fees or a fixed $1M cap.</p>
<div class="flex items-center justify-between">
<button class="text-primary font-label-sm text-label-sm hover:underline">View Policy</button>
<button class="px-sm py-xs bg-surface-container hover:bg-surface-container-high rounded text-on-surface font-label-sm text-label-sm transition-colors">Suggest Edit</button>
</div>
</div>
</div>
<!-- Finding Card 2: Medium Risk -->
<div class="bg-white border border-outline-variant rounded-lg overflow-hidden transition-all hover:border-tertiary">
<div class="bg-tertiary-fixed/10 px-md py-sm flex items-center justify-between border-b border-tertiary/10">
<span class="font-label-sm text-label-sm text-tertiary-container font-bold flex items-center gap-xs">
<span class="material-symbols-outlined text-[16px]" data-icon="warning">warning</span>
                                MEDIUM RISK
                            </span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Section 2. Payment</span>
</div>
<div class="p-md">
<h5 class="font-label-md text-label-md font-bold text-on-surface mb-xs">Payment Terms</h5>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-md">Net 60 terms detected; market standard for your industry is Net 30. This may negatively impact cash flow forecasts for Q4.</p>
<div class="flex items-center gap-sm">
<span class="px-sm py-xs bg-secondary-container text-on-secondary-container rounded font-label-sm text-label-sm">Financial Impact</span>
</div>
</div>
</div>
<!-- Finding Card 3: Metadata -->
<div class="bg-white border border-outline-variant rounded-lg overflow-hidden transition-all hover:border-primary">
<div class="bg-primary-container/10 px-md py-sm flex items-center justify-between border-b border-primary/10">
<span class="font-label-sm text-label-sm text-primary font-bold flex items-center gap-xs">
<span class="material-symbols-outlined text-[16px]" data-icon="info">info</span>
                                DATA EXTRACTION
                            </span>
<span class="font-label-sm text-label-sm text-on-surface-variant">Section 4. Termination</span>
</div>
<div class="p-md">
<div class="flex items-center justify-between mb-xs">
<span class="font-label-md text-label-md text-on-surface-variant">Termination Notice:</span>
<span class="font-label-md text-label-md font-bold text-on-surface">90 days</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-md">The extracted notice period is longer than the standard 30-60 day range found in historical templates.</p>
<button class="w-full py-xs border border-outline-variant rounded font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container transition-colors">Confirm Extraction</button>
</div>
</div>
</div>
<!-- Analysis Controls -->
<div class="p-lg border-t border-outline-variant bg-surface-container-lowest">
<div class="flex flex-col gap-sm">
<button class="w-full py-md bg-primary text-white rounded-lg font-label-md text-label-md font-bold hover:opacity-90 transition-all flex items-center justify-center gap-sm">
<span class="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
                            Generate Summary
                        </button>
<button class="w-full py-md bg-white border border-outline-variant text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-container transition-all">
                            Request Manual Review
                        </button>
</div>
</div>
</section>
</div>
</main>
<!-- Contextual FAB (Search/AI Chat) -->
<button class="fixed bottom-lg right-[424px] w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50">
<span class="material-symbols-outlined text-[24px]" data-icon="chat_bubble" style="font-variation-settings: 'FILL' 1;">chat_bubble</span>
</button>
</body></html>
``
