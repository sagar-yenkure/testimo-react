

# Testimo React  

A modern, customizable testimonial collection and display component library for SaaS apps, built with **React**, **Tailwind CSS**, and **ShadCN UI**.  
Easily integrate video testimonials, customer feedback, and social proof into your product.  

[![NPM Version](https://img.shields.io/npm/v/testimo-react.svg)](https://www.npmjs.com/package/testimo-react)  
[![License](https://img.shields.io/github/license/sagar-yenkure/testimo-react)](LICENSE)  
[![Issues](https://img.shields.io/github/issues/sagar-yenkure/testimo-react)](https://github.com/sagar-yenkure/testimo-react/issues)  

🔗 **Website**: [testimo-love.vercel.app](https://testimo-love.vercel.app)  

---

## 🚀 Features
- 🎥 Video + text testimonials support  
- 🎨 Styled with **Tailwind CSS** and **ShadCN UI**  
- ⚡ Multiple layouts: Masonry, Scroll, Carousel, List  
- 🧩 Theming support: Light, Dark, Gradient, Minimal  
- 🔗 Fetch testimonials dynamically using a **collection ID**  
- 📱 Responsive and mobile-friendly  

---
---

## ⚠️ Important Notes  

- This package is designed **only for React and Next.js applications**.  
- To use this library:  
  1. Go to [testimo-love.vercel.app](https://testimo-love.vercel.app)  
  2. Create an account  
  3. Go to your **Dashboard**  
  4. Create a **Collection**  
  5. Share that collection with your users and copy its **Collection ID**  
  6. Use this `collectionId` in your project to fetch and display testimonials  

---

##  Installation

```bash
npm install testimo-react@latest
# or
yarn add testimo-react@latest
# or
pnpm add testimo-react@latest
```


##  Usage

```bash
import {testimonials} from "testimo-react"

<testimonials
  collectionId="collectionId"
  theme="light"
  variant="masonry"
/>
```


> ⚠️ **Note**: you wil get  `collectionId`from `https://testimo-love.vercel.app/dashboard`

## ⚙️ Props  

| Prop          | Type                                                                 | Description                                      | Default    |
|---------------|----------------------------------------------------------------------|--------------------------------------------------|------------|
|      |
| `collectionId`| `string`                                                             | Fetch testimonials dynamically from Testimo Cloud | `Required`|
| `theme`       | `"light" \| "dark" \| "gradient" \| "minimal"`                       | UI theme style                                   | `"light"`  |
| `variant`     | `  "masonry" \| "scroll" \| "carousel" \| "list"`            | Layout style for testimonials                    | `"grid"`   |
| `className`   | `string`                                                             | Custom CSS classes for wrapper                   | `-`|
