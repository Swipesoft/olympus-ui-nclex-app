### Page Structure 

| Page Name         | Purpose                                                                 |
|-------------------|-------------------------------------------------------------------------|
| HomePage          | Landing page with overview, features, and call-to-action                |
| LoginPage         | User authentication                                                     |
| RegistrationPage  | New user sign-up                                                        |
| DashboardPage     | Personalized dashboard with progress and stats                          |
| QuestionBankPage  | Browse or filter questions by subject, difficulty, or tags              |
| QuizBuilderPage   | Create custom quizzes from selected topics or question sets             |
| QuizPage          | Take a quiz with timer and answer submission                            |
| ReviewPage        | Review completed quizzes with explanations and stats                    |
| ProfilePage       | User profile settings and preferences                                   |
| SubscriptionPage  | Plans, pricing, and payment integration                                 |


### Component-to-Page Code Organisation
- The components folder is a general directory for all UI elements in the application 
- There is a `Helper` and `Hoc` folder for holding generalised config information/properties 
- Each app route in the `app/` folder has a sub-folder in the components folder 
     - components/Home = components for the homepage 
     - components/Login = components for the loginpage 
- The `outline.tsx` organises/orchestrates the DOM relationships for all components of a page. 

### Resources

### 🚀 [nextjs-starter-repo](https://github.com/nextjs/saas-starter/tree/main) 
A powerful SaaS starter template built with Next.js.

It includes:

- App Router (Next.js 13+)
- Tailwind CSS
- Authentication
- Stripe integration
- Dashboard layout
- TypeScript support

Perfect for launching modern web apps quickly and cleanly.

---

### 🎨 [landing-page-template](https://github.com/mohitdarmal/landing-page-nextjs15-with-tailwindcss-dark-light-theme/tree/main)
A sleek landing page built with Next.js 15 and Tailwind CSS. Features:

- Dark/light theme toggle
- Responsive design
- Clean layout and animations
- Tailwind CSS integration
- Ideal for product or portfolio landing pages


# ToDo for launch 
- [x] Clerk authentication 
- [x] Support for SATA questions 
- [x] API routes for querying question DB (No SQL)
- [ ] API route for saving student logs in SQL 
- [ ] Quiz page mobile display margin/padding
- [ ] Landing page photos, text etc



# Database design principles 
- Logs: NoSQL({sessionID, userID, questionID, score, selectedAnswers})

- Questions: NoSQL({questionID, question, options, rationale...}) # trigger
